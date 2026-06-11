import { Request, Response } from 'express';
import { AppDataSource } from '../database/typeorm';
import { Product } from '../entities/Produto';

function guardMerchant(req: Request, res: Response): boolean {
    if (!req.user) {
        res.status(401).json({ error: 'Não autenticado.' });
        return false;
    }
    if (req.user.role !== 'merchant') {
        res.status(403).json({ error: 'Acesso negado.' });
        return false;
    }
    return true;
}

export async function listProducts(req: Request, res: Response): Promise<void> {
    const { category, name, minPrice, maxPrice, merchantId, sortBy, order } = req.query;

    try {
        const qb = AppDataSource.getRepository(Product)
            .createQueryBuilder('product')
            .where('product.deletedAt IS NULL');

        if (merchantId) {
            qb.andWhere('product.merchantId = :merchantId', { merchantId: String(merchantId) });
        }

        if (category) {
            qb.andWhere('product.categoryId = :category', { category: Number(category) });
        }

        if (name) {
            qb.andWhere('product.name LIKE :name', { name: `%${name}%` });
        }

        if (minPrice) {
            qb.andWhere('product.currentPrice >= :minPrice', { minPrice: Number(minPrice) });
        }

        if (maxPrice) {
            qb.andWhere('product.currentPrice <= :maxPrice', { maxPrice: Number(maxPrice) });
        }

        const direction = String(order).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        if (sortBy === 'price') {
            qb.orderBy('product.currentPrice', direction);
        } else if (sortBy === 'name') {
            qb.orderBy('product.name', direction);
        }

        const products = await qb.getMany();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function getProduct(req: Request, res: Response): Promise<void> {
    try {
        const repo = AppDataSource.getRepository(Product);
        const product = await repo.findOne({ where: { id: req.params.id as string } });

        if (!product) {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function createProduct(req: Request, res: Response): Promise<void> {
    if (!guardMerchant(req, res)) return;

    const { categoryId, name, description, currentPrice, stockQuantity } = req.body;

    if (!categoryId || !name || !description || currentPrice === undefined || stockQuantity === undefined) {
        res.status(400).json({ error: 'categoryId, name, description, currentPrice e stockQuantity são obrigatórios.' });
        return;
    }

    try {
        const repo = AppDataSource.getRepository(Product);
        const product = repo.create({
            merchantId: req.user!.id,
            categoryId: Number(categoryId),
            name,
            description,
            currentPrice: Number(currentPrice),
            stockQuantity: Number(stockQuantity),
        });

        const saved = await repo.save(product);
        res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
    if (!guardMerchant(req, res)) return;

    try {
        const repo = AppDataSource.getRepository(Product);
        const product = await repo.findOne({ where: { id: req.params.id as string } });

        if (!product) {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        }

        if (product.merchantId !== req.user!.id) {
            res.status(403).json({ error: 'Você só pode editar seus próprios produtos.' });
            return;
        }

        const { categoryId, name, description, currentPrice, stockQuantity } = req.body;

        if (categoryId !== undefined) product.categoryId = Number(categoryId);
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (currentPrice !== undefined) product.currentPrice = Number(currentPrice);
        if (stockQuantity !== undefined) product.stockQuantity = Number(stockQuantity);

        const updated = await repo.save(product);
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
    if (!guardMerchant(req, res)) return;

    try {
        const repo = AppDataSource.getRepository(Product);
        const product = await repo.findOne({ where: { id: req.params.id as string } });

        if (!product) {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        }

        if (product.merchantId !== req.user!.id) {
            res.status(403).json({ error: 'Você só pode excluir seus próprios produtos.' });
            return;
        }

        await repo.softDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
