import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToMany } from 'typeorm';
import { Review } from './Review';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Field()
  @Column('text', {
    nullable: false,
  })
  email: string;

  @Field()
  @Column('text', {
    nullable: false,
  })
  username: string;

  @Field()
  @Column('text', {
    nullable: false,
  })
  firstName: string;

  @Field()
  @Column('text', {
    nullable: false,
  })
  lastName: string;

  @Field()
  @Column('text', {
    nullable: true,
    default: '',
  })
  city: string;

  @Field()
  @Column('text', {
    nullable: true,
    default: '',
  })
  state: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Field()
  @Column('text', {
    default: '',
  })
  profilePicture: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
