import { Request, Response } from 'express';
import { AppDataSource } from '../database/typeorm';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { Product } from '../entities/Produto';
import { Merchant } from '../entities/Merchant';

function guardCustomer(req: Request, res: Response): boolean {
    if (!req.user) {
        res.status(401).json({ error: 'Não autenticado.' });
        return false;
    }
    if (req.user.role !== 'customer') {
        res.status(403).json({ error: 'Acesso negado.' });
        return false;
    }
    return true;
}

interface CheckoutItem {
    productId: string;
    quantity: number;
}

export async function checkout(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    const { customerId } = req.params;

    if (req.user!.id !== customerId) {
        res.status(403).json({ error: 'Acesso negado.' });
        return;
    }

    const { merchantId, items } = req.body as { merchantId: string; items: CheckoutItem[] };

    if (!merchantId) {
        res.status(400).json({ error: 'merchantId é obrigatório.' });
        return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'items deve ser um array não vazio.' });
        return;
    }

    for (const item of items) {
        if (!item.productId || !item.quantity || item.quantity < 1) {
            res.status(400).json({ error: 'Cada item deve ter productId e quantity >= 1.' });
            return;
        }
    }

    try {
        const merchantRepo = AppDataSource.getRepository(Merchant);
        const merchant = await merchantRepo.findOne({ where: { id: merchantId } });

        if (!merchant || merchant.deletedAt) {
            res.status(404).json({ error: 'Lojista não encontrado.' });
            return;
        }

        const productRepo = AppDataSource.getRepository(Product);
        const productIds = items.map((i) => i.productId);

        const products = await productRepo
            .createQueryBuilder('product')
            .where('product.id IN (:...ids)', { ids: productIds })
            .andWhere('product.deletedAt IS NULL')
            .getMany();

        if (products.length !== productIds.length) {
            res.status(404).json({ error: 'Um ou mais produtos não foram encontrados.' });
            return;
        }

        const invalidProduct = products.find((p) => p.merchantId !== merchantId);
        if (invalidProduct) {
            res.status(422).json({
                error: `O produto "${invalidProduct.name}" não pertence ao lojista informado.`,
            });
            return;
        }

        const productMap = new Map(products.map((p) => [p.id, p]));
        let totalAmount = 0;

        const orderItems: Partial<OrderItem>[] = items.map((item) => {
            const product = productMap.get(item.productId)!;
            const unitPrice = Number(product.currentPrice);
            totalAmount += unitPrice * item.quantity;
            return {
                productId: item.productId,
                quantity: item.quantity,
                unitPrice,
            };
        });

        const orderRepo = AppDataSource.getRepository(Order);

        const order = await AppDataSource.transaction(async (manager) => {
            const newOrder = manager.create(Order, {
                customerId,
                status: 'Pending',
                totalAmount: Number(totalAmount.toFixed(2)),
            });
            const savedOrder = await manager.save(Order, newOrder);

            const savedItems = orderItems.map((item) =>
                manager.create(OrderItem, { ...item, orderId: savedOrder.id }),
            );
            await manager.save(OrderItem, savedItems);

            return manager.findOne(Order, {
                where: { id: savedOrder.id },
                relations: ['items', 'items.product'],
            });
        });

        res.status(201).json({
            order,
            merchant: {
                id: merchant.id,
                tradeName: merchant.tradeName,
                document: merchant.document,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function listOrders(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    const { customerId } = req.params;

    if (req.user!.id !== customerId) {
        res.status(403).json({ error: 'Acesso negado.' });
        return;
    }

    try {
        const orderRepo = AppDataSource.getRepository(Order);
        const orders = await orderRepo.find({
            where: { customerId },
            relations: ['items', 'items.product'],
            order: { orderedAt: 'DESC' },
        });

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
