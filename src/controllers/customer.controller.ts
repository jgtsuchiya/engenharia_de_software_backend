import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../database/typeorm';
import { Customer } from '../entities/Cliente';

const SALT_ROUNDS = 10;

function guardCustomer(req: Request, res: Response): boolean {
    if (!req.user) {
        res.status(401).json({ error: 'Não autenticado.' });
        return false;
    }
    if (req.user.role !== 'customer') {
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
    if (!guardCustomer(req, res)) return;

    try {
        const repo = AppDataSource.getRepository(Customer);
        const customer = await repo.findOne({ where: { id: req.params.id as string } });

        if (!customer) {
            res.status(404).json({ error: 'Cliente não encontrado.' });
            return;
        }

        const { password: _, ...profile } = customer;
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    const { name, email, password } = req.body;

    try {
        const repo = AppDataSource.getRepository(Customer);
        const customer = await repo.findOne({ where: { id: req.params.id as string } });

        if (!customer) {
            res.status(404).json({ error: 'Cliente não encontrado.' });
            return;
        }

        if (name !== undefined) customer.name = name;
        if (email !== undefined) customer.email = email;
        if (password !== undefined) customer.password = await bcrypt.hash(password, SALT_ROUNDS);

        const updated = await repo.save(customer);
        const { password: _, ...profile } = updated;
        res.json(profile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function deleteAccount(req: Request, res: Response): Promise<void> {
    if (!guardCustomer(req, res)) return;

    try {
        const repo = AppDataSource.getRepository(Customer);
        const result = await repo.softDelete(req.params.id);

        if (result.affected === 0) {
            res.status(404).json({ error: 'Cliente não encontrado.' });
            return;
        }

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
