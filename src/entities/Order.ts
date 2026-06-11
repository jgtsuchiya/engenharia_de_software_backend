import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Customer } from './Cliente';
import { OrderItem } from './OrderItem';

@Entity('orders')
export class Order {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: string;

    @Column({ type: 'bigint', unsigned: true, name: 'customer_id' })
    customerId!: string;

    @Column({ type: 'enum', enum: ['Pending', 'Paid', 'Shipped'], default: 'Pending' })
    status!: 'Pending' | 'Paid' | 'Shipped';

    @Column({ type: 'decimal', precision: 12, scale: 2, name: 'total_amount' })
    totalAmount!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'ordered_at', default: () => 'CURRENT_TIMESTAMP' })
    orderedAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    @ManyToOne(() => Customer, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'customer_id' })
    customer!: Customer;

    @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
    items!: OrderItem[];
}
