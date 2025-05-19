import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { UserEntity } from './user.entity';
import { MetricUnit, MetricUnitEnum } from '~metrics/constants/unit.constant';

@Entity('Metric')
export class MetricEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: MetricTypeEnum })
    type: MetricTypeEnum;

    @Column('numeric', { precision: 12, scale: 6 })
    value: number;

    @Column({ type: 'enum', enum: MetricUnitEnum })
    unit: MetricUnit;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.metrics)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    userId: number;
}
