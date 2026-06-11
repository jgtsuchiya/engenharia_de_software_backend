declare namespace Express {
    interface Request {
        user?: {
            id: string;
            email: string;
            role: 'customer' | 'merchant';
        };
    }
}
