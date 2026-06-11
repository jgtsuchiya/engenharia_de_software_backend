import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Order } from './Order';
import { Product } from './Produto';

@Entity('order_items')
export class OrderItem {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: string;

    @Column({ type: 'bigint', unsigned: true, name: 'order_id' })
    orderId!: string;

    @Column({ type: 'bigint', unsigned: true, name: 'product_id' })
    productId!: string;

    @Column({ type: 'int' })
    quantity!: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, name: 'unit_price' })
    unitPrice!: number;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order!: Order;

    @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}
