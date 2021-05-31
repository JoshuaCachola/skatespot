import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './Review';

@ObjectType()
@Entity('skatespots')
export class SkateSpot extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { nullable: false })
  name: string;

  @Field()
  @Column('text', { nullable: false })
  categoryName: string;

  @Field()
  @Column('text', { nullable: false })
  city: string;

  @Field()
  @Column('text', { nullable: false })
  state: string;

  @Field()
  @Column('text', { nullable: false })
  street: string;

  @Field()
  @Column('text', { default: '' })
  postalCode: string;

  @Field()
  @Column('text', { default: 'US' })
  countryCode: string;

  @Field()
  @Column('text', { nullable: true })
  phone: string;

  @Field()
  @Column('text', { default: '' })
  website: string;

  @Field()
  @Column({ type: 'boolean', nullable: true, default: false })
  temporarilyClosed: boolean;

  @Field()
  @Column({ type: 'boolean', nullable: true, default: false })
  permanentlyClosed: boolean;

  @Field()
  @Column('text', { default: [] })
  imageUrls: string;

  @Field()
  @Column('text', { nullable: false })
  location: string;

  @Field(() => Int)
  @Column('text', { default: 0 })
  reviewsCount: number;

  @Field()
  @Column('text', { default: { oneStar: 0, twoStar: 0, threeStar: 0, fourStar: 0, fiveStar: 0 } })
  reviewsDistribution: string;

  @OneToMany(() => Review, (review) => review.skateSpot)
  reviews: Review[];

  @Column('tsvector', { select: false, nullable: true })
  document_with_weights: any;
}
