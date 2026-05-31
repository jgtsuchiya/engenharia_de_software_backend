import 'reflect-metadata';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from '../database/typeorm';
import { Favorito } from '../entities/Favorito';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

interface FavoritoRequestBody {
  customerId: number;
  productId: number;
}

connect().then((dataSource: any) => {
    console.log('Connected to the database');


    const favoritoRepository = dataSource.getRepository(Favorito);


    app.post('/favorito', async (req: Request<{}, {}, FavoritoRequestBody>, res: Response): Promise<any> => {
        const { customerId, productId } = req.body;

        if (!customerId || !productId) {
            return res.status(400).json({ error: 'customerId e productId são obrigatórios.' });
        }

        try {
            const jaFavoritado = await favoritoRepository.findOne({
                where: { customerId, productId }
            });

            if (jaFavoritado) {
                return res.status(400).json({ message: 'Este item já está nos favoritos.' });
            }

            const novoFavorito = favoritoRepository.create({ customerId, productId });
            await favoritoRepository.save(novoFavorito);

            return res.status(201).json({ message: 'Item adicionado aos favoritos com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno ao favoritar item.' });
        }
    });

    app.get('/favoritos', async (req: Request, res: Response): Promise<any> => {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({ error: 'O parâmetro customerId é obrigatório.' });
        }

        try {

            const favoritos = await favoritoRepository.find({
                where: { customerId: Number(customerId) },
                relations: ['product']
            });

            return res.status(200).json(favoritos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno ao buscar favoritos.' });
        }
    });

    app.delete('/favorito', async (req: Request<{}, {}, FavoritoRequestBody>, res: Response): Promise<any> => {
        const { customerId, productId } = req.body;

        if (!customerId || !productId) {
            return res.status(400).json({ error: 'customerId e productId são obrigatórios.' });
        }

        try {
            const resultado = await favoritoRepository.delete({ customerId, productId });

            if (resultado.affected === 0) {
                return res.status(404).json({ message: 'Favorito não encontrado.' });
            }

            return res.status(200).json({ message: 'Item removido dos favoritos com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno ao remover favorito.' });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}).catch(error => console.log('TypeORM connection error: ', error));
