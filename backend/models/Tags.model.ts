import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Posts from "./Posts.model";

@Table({
  tableName: "tags",
})
export default class Tags extends Model {
  @Column
  tag!: string;

  @ForeignKey(() => Posts)
  @Column({
    field: "post_id"
  })
  postId: number;
}
