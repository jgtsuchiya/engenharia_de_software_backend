import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Customer } from './Cliente';
import { Product } from './Produto';

@Entity('customer_product_favorites')
export class Favorito {

    @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'customer_id' })
    customerId!: string;

    @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'product_id' })
    productId!: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'favorited_at',
        default: () => 'CURRENT_TIMESTAMP'
    })
    favoritedAt!: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    updatedAt!: Date;

    @ManyToOne(() => Customer, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'customer_id' })
    customer!: Customer;

    @ManyToOne(() => Product, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}
