import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../database/typeorm';
import { Merchant } from '../entities/Merchant';

const SALT_ROUNDS = 10;

function guardMerchant(req: Request, res: Response): boolean {
    if (!req.user) {
        res.status(401).json({ error: 'Não autenticado.' });
        return false;
    }
    if (req.user.role !== 'merchant') {
        res.status(403).json({ error: 'Acesso negado.' });
        return false;
    }
    if (req.user.id !== req.params.id) {
        res.status(403).json({ error: 'Você só pode gerenciar seu próprio cadastro.' });
        return false;
    }
    return true;
}

export async function getProfile(req: Request, res: Response): Promise<void> {
    if (!guardMerchant(req, res)) return;

    try {
        const repo = AppDataSource.getRepository(Merchant);
        const merchant = await repo.findOne({ where: { id: req.params.id } });

        if (!merchant) {
            res.status(404).json({ error: 'Lojista não encontrado.' });
            return;
        }

        const { password: _, ...profile } = merchant;
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
    if (!guardMerchant(req, res)) return;

    const { trade_name, email, password } = req.body;

    try {
        const repo = AppDataSource.getRepository(Merchant);
        const merchant = await repo.findOne({ where: { id: req.params.id } });

        if (!merchant) {
            res.status(404).json({ error: 'Lojista não encontrado.' });
            return;
        }

        if (trade_name !== undefined) merchant.tradeName = trade_name;
        if (email !== undefined) merchant.email = email;
        if (password !== undefined) merchant.password = await bcrypt.hash(password, SALT_ROUNDS);

        const updated = await repo.save(merchant);
        const { password: _, ...profile } = updated;
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function deleteAccount(req: Request, res: Response): Promise<void> {
    if (!guardMerchant(req, res)) return;

    try {
        const repo = AppDataSource.getRepository(Merchant);
        const result = await repo.softDelete(req.params.id);

        if (result.affected === 0) {
            res.status(404).json({ error: 'Lojista não encontrado.' });
            return;
        }

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
