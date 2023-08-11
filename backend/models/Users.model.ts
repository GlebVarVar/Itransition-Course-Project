import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Likes, Ratings, Posts } from "./";

@Table({
  tableName: "users",
})
export default class Users extends Model {
  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column({
    allowNull: true,
  })
  userType: string;

  @HasMany(() => Likes, {
    onDelete: "CASCADE",
  })
  likes: Likes[];

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Ratings)
  rating: Ratings[];
}
