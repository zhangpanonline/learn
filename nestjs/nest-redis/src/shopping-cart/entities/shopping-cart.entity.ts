import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'json' })
  cartData: Record<string, number>;
}
