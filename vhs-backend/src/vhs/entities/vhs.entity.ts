import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vhs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column('smallint')
  duration: number;

  @Column('smallint')
  releasedAt: number;

  @Column()
  rentalPrice: number;

  @Column('smallint')
  rentalDuration: number;

  @Column('smallint')
  quantity: number;

  @Column({ nullable: true })
  thumbnail: string;
}
