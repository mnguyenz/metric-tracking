import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DistanceUnitEnum } from '~metrics/enums/distance-unit.enum';
import { MetricTypeEnum } from '~metrics/enums/metric-type.enum';
import { TemperatureUnitEnum } from '~metrics/enums/temperature-unit.enum';

type MetricUnit = DistanceUnitEnum | TemperatureUnitEnum;
const MetricUnitEnum = [...Object.values(DistanceUnitEnum), ...Object.values(TemperatureUnitEnum)] as const;

@Entity('Metric')
export class MetricEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: MetricTypeEnum })
    type: MetricTypeEnum;

    @Column('numeric', { precision: 12, scale: 2 })
    value: number;

    @Column({ type: 'enum', enum: MetricUnitEnum })
    unit: MetricUnit;

    @Column({ type: 'date' })
    date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
