import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';
import { Favorito } from './Favorito';

@Entity('products')
export class Product {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: string;

    @Column({ type: 'bigint', unsigned: true, name: 'merchant_id' })
    merchantId!: string;

    @Column({ type: 'int', unsigned: true, name: 'category_id' })
    categoryId!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, name: 'current_price' })
    currentPrice!: number;

    @Column({ type: 'int', name: 'stock_quantity' })
    stockQuantity!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true, default: null })
    deletedAt!: Date | null;

    @OneToMany(() => Favorito, (favorito) => favorito.product)
    favorites!: Favorito[];
}
