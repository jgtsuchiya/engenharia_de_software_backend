import { Request, Response } from 'express';
import { AppDataSource } from '../database/typeorm';
import { Favorito } from '../entities/Favorito';
import { Product } from '../entities/Produto';

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

export async function listFavorites(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    const { customerId } = req.params;

    if (req.user!.id !== customerId) {
        res.status(403).json({ error: 'Acesso negado.' });
        return;
    }

    try {
        const repo = AppDataSource.getRepository(Favorito);
        const favorites = await repo.find({
            where: { customerId },
            relations: ['product'],
        });

        const products = favorites
            .filter((f) => f.product && !f.product.deletedAt)
            .map((f) => f.product);

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function addFavorite(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    const { customerId } = req.params;
    const { productId } = req.body;

    if (req.user!.id !== customerId) {
        res.status(403).json({ error: 'Acesso negado.' });
        return;
    }

    if (!productId) {
        res.status(400).json({ error: 'productId é obrigatório.' });
        return;
    }

    try {
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOne({ where: { id: String(productId) } });

        if (!product || product.deletedAt) {
            res.status(404).json({ error: 'Produto não encontrado.' });
            return;
        }

        const repo = AppDataSource.getRepository(Favorito);
        const existing = await repo.findOne({
            where: { customerId, productId: String(productId) },
        });

        if (existing) {
            res.status(409).json({ error: 'Produto já está nos favoritos.' });
            return;
        }

        const favorito = repo.create({ customerId, productId: String(productId) });
        await repo.save(favorito);

        res.status(201).json({ message: 'Produto adicionado aos favoritos.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function removeFavorite(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    const { customerId, productId } = req.params;

    if (req.user!.id !== customerId) {
        res.status(403).json({ error: 'Acesso negado.' });
        return;
    }

    try {
        const repo = AppDataSource.getRepository(Favorito);
        const favorito = await repo.findOne({ where: { customerId, productId } });

        if (!favorito) {
            res.status(404).json({ error: 'Favorito não encontrado.' });
            return;
        }

        await repo.remove(favorito);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
