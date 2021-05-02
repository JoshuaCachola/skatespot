import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { SkateSpot } from './SkateSpot';

@ObjectType()
@Entity('reviews')
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { nullable: false })
  review: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => SkateSpot, (skateSpot) => skateSpot.reviews)
  skateSpot: SkateSpot;

  @Field()
  @Column('text', { nullable: true })
  imageUrls: string;
}
