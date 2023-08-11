import { Table, Column, Model, HasMany, ForeignKey } from "sequelize-typescript";
import { Tags, Comments, Likes, Ratings, Photos, Users } from "./";
@Table({
  tableName: "posts",
})
export default class Posts extends Model {
  @Column
  title!: string;

  @Column
  postText!: string;

  @Column
  username!: string;

  @Column
  email!: string;

  @Column
  category!: string;

  @ForeignKey(() => Users)
  @Column({
    field: "user_id"
  })
  userId: number;

  @HasMany(() => Likes)
  likes: Likes[];

  @HasMany(() => Ratings)
  rating: Ratings[];

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Photos)
  photos: Photos[];

  @HasMany(() => Tags)
  tags: Tags[];
}
