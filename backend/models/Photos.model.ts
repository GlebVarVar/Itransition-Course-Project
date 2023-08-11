import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Posts from "./Posts.model";

@Table({
  tableName: "photos",
})
export default class Photos extends Model {
  @Column({
    allowNull: true,
  })
  photo: string;

  @ForeignKey(() => Posts)
  @Column({
    field: "post_id"
  })
  postId: number
}
