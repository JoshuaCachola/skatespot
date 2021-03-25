import { Field, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn} from "typeorm";

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Field()
    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    email: string;

    @Field()
    @Column({
        type: "varchar",
        length: "32",
        nullable: false
    })
    username: string;

    @Field()
    @Column({
        type: "varchar",
        length: 64,
        nullable: false
    })
    firstName: string;

    @Field()
    @Column({
        type: "varchar",
        length: 64,
        nullable: false
    })
    lastName: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    password: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}
