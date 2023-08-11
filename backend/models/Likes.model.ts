import { Model, Table, Column, ForeignKey } from "sequelize-typescript";
import Users from "./Users.model";
import Posts from "./Posts.model";

@Table({
  tableName: "likes",
})
export default class Likes extends Model {
  @Column
  likes!: number;

  @ForeignKey(() => Users)
  @Column({
    field: "user_id"
  })
  userId: number;


  @ForeignKey(() => Posts)
  @Column({
    field: "post_id"
  })
  postId: number;
}
