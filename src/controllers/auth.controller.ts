import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { AppDataSource } from '../database/typeorm';
import { Customer } from '../entities/Cliente';
import { Merchant } from '../entities/Merchant';
import { PasswordRecovery } from '../entities/PasswordRecovery';

const SALT_ROUNDS = 10;
const CODE_EXPIRY_MINUTES = 15;

function createToken(id: string, email: string, role: 'customer' | 'merchant'): string {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
}

function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        res.status(400).json({ error: 'email, password e role são obrigatórios.' });
        return;
    }
    if (role !== 'customer' && role !== 'merchant') {
        res.status(400).json({ error: 'role inválido. Use customer ou merchant.' });
        return;
    }

    try {
        if (role === 'customer') {
            const repo = AppDataSource.getRepository(Customer);
            const user = await repo.findOne({ where: { email } });

            if (!user || user.deletedAt) {
                res.status(401).json({ error: 'Credenciais inválidas.' });
                return;
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                res.status(401).json({ error: 'Credenciais inválidas.' });
                return;
            }

            const token = createToken(user.id, user.email, 'customer');
            res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: 'client' } });
            return;
        }

        const repo = AppDataSource.getRepository(Merchant);
        const user = await repo.findOne({ where: { email } });

        if (!user || user.deletedAt) {
            res.status(401).json({ error: 'Credenciais inválidas.' });
            return;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            res.status(401).json({ error: 'Credenciais inválidas.' });
            return;
        }

        const token = createToken(user.id, user.email, 'merchant');
        res.json({ token, user: { id: user.id, name: user.tradeName, email: user.email, role: 'admin' } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function register(req: Request, res: Response): Promise<void> {
    const { name, email, password, role, document, trade_name } = req.body;

    if (!email || !password || !role) {
        res.status(400).json({ error: 'email, password e role são obrigatórios.' });
        return;
    }
    if (role !== 'customer' && role !== 'merchant') {
        res.status(400).json({ error: 'role inválido. Use customer ou merchant.' });
        return;
    }
    if (role === 'merchant' && (!document || !trade_name)) {
        res.status(400).json({ error: 'document e trade_name são obrigatórios para lojistas.' });
        return;
    }
    if (role === 'customer' && !name) {
        res.status(400).json({ error: 'name é obrigatório para clientes.' });
        return;
    }

    try {
        const hashed = await bcrypt.hash(password, SALT_ROUNDS);

        if (role === 'customer') {
            const repo = AppDataSource.getRepository(Customer);
            const existing = await repo.findOne({ where: { email }, withDeleted: true });
            if (existing) {
                res.status(409).json({ error: 'E-mail já cadastrado.' });
                return;
            }
            const customer = repo.create({ name, email, password: hashed });
            const saved = await repo.save(customer);
            const token = createToken(saved.id, saved.email, 'customer');
            res.status(201).json({ token, user: { id: saved.id, name: saved.name, email: saved.email, role: 'client' } });
            return;
        }

        const repo = AppDataSource.getRepository(Merchant);
        const existing = await repo.findOne({ where: { email }, withDeleted: true });
        if (existing) {
            res.status(409).json({ error: 'E-mail já cadastrado.' });
            return;
        }
        const merchant = repo.create({ tradeName: trade_name, document, email, password: hashed });
        const saved = await repo.save(merchant);
        const token = createToken(saved.id, saved.email, 'merchant');
        res.status(201).json({ token, user: { id: saved.id, name: saved.tradeName, email: saved.email, role: 'admin' } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function recoverPassword(req: Request, res: Response): Promise<void> {
    const { email, role } = req.body;

    if (!email || !role) {
        res.status(400).json({ error: 'email e role são obrigatórios.' });
        return;
    }
    if (role !== 'customer' && role !== 'merchant') {
        res.status(400).json({ error: 'role inválido.' });
        return;
    }

    try {
        const repo = role === 'customer'
            ? AppDataSource.getRepository(Customer)
            : AppDataSource.getRepository(Merchant);

        const user = await repo.findOne({ where: { email } } as any);
        if (!user) {
            res.status(200).json({ message: 'Se o e-mail existir, você receberá o código de recuperação.' });
            return;
        }

        const code = generateCode();
        const recoveryRepo = AppDataSource.getRepository(PasswordRecovery);
        const recovery = recoveryRepo.create({ email, userType: role, code });
        await recoveryRepo.save(recovery);

        const transporter = createTransporter();
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: 'Código de recuperação de senha',
            text: `Seu código de recuperação é: ${code}\n\nEle expira em ${CODE_EXPIRY_MINUTES} minutos.`,
        });

        res.status(200).json({ message: 'Se o e-mail existir, você receberá o código de recuperação.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
    const { email, code, new_password, role } = req.body;

    if (!email || !code || !new_password || !role) {
        res.status(400).json({ error: 'email, code, new_password e role são obrigatórios.' });
        return;
    }
    if (role !== 'customer' && role !== 'merchant') {
        res.status(400).json({ error: 'role inválido.' });
        return;
    }

    try {
        const recoveryRepo = AppDataSource.getRepository(PasswordRecovery);
        const recovery = await recoveryRepo.findOne({ where: { email, userType: role, code } });

        if (!recovery) {
            res.status(400).json({ error: 'Código inválido ou expirado.' });
            return;
        }

        const expiryMs = CODE_EXPIRY_MINUTES * 60 * 1000;
        if (Date.now() - recovery.createdAt.getTime() > expiryMs) {
            await recoveryRepo.delete(recovery.id);
            res.status(400).json({ error: 'Código expirado.' });
            return;
        }

        const hashed = await bcrypt.hash(new_password, SALT_ROUNDS);

        if (role === 'customer') {
            const repo = AppDataSource.getRepository(Customer);
            await repo.update({ email }, { password: hashed });
        } else {
            const repo = AppDataSource.getRepository(Merchant);
            await repo.update({ email }, { password: hashed });
        }

        await recoveryRepo.delete(recovery.id);
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}
