import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('password_recoveries')
export class PasswordRecovery {

    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id!: string;

    @Column({ type: 'varchar', length: 255 })
    email!: string;

    @Column({ type: 'enum', enum: ['customer', 'merchant'], name: 'user_type' })
    userType!: 'customer' | 'merchant';

    @Column({ type: 'varchar', length: 255 })
    code!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
