import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { SkateSpot } from './SkateSpot';

@ObjectType()
@Entity('reviews')
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { nullable: false })
  review: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field(() => SkateSpot)
  @ManyToOne(() => SkateSpot, (skateSpot) => skateSpot.reviews)
  @JoinColumn({ name: 'skateSpotId', referencedColumnName: 'id' })
  skateSpot: SkateSpot;

  @Field(() => Int)
  @Column()
  skateSpotId: number;

  @Field()
  @Column('text', { nullable: true })
  imageUrls: string;

  @Field(() => Int)
  @Column()
  rating: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
