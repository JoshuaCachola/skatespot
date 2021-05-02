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
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  username: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  firstName: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  lastName: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'int',
    default: 0,
  })
  tokenVersion: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profilePicture: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
