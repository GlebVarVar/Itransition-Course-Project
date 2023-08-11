import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Users from "./Users.model";
import Posts from "./Posts.model";

@Table({
  tableName: "ratings",
})
export default class Ratings extends Model {
  @Column
  rating!: number;

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
