import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('skatespots')
export class SkateSpot extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Field()
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false
  })
  name: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false
  })
  city: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false
  })
  state: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false
  })
  address: string;

  @Field()
  @Column({
    type: 'int',
    default: 0
  })
  following: number;

  @Field()
  @Column({ type: 'varchar', array: true, nullable: true })
  imgs: string;
};