import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MetricEntity } from './metric.entity';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => MetricEntity, (metric) => metric.user)
    metrics?: MetricEntity[];
}
