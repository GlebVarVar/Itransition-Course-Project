import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import Posts from "./Posts.model";

@Table({
  tableName: "comments",
})
export default class Comments extends Model {
  @Column({
    field: "comment_body",
  })
  commentBody!: string;

  @Column
  username!: string;

  @Column
  email!: string;


  @ForeignKey(() => Posts)
  @Column({
    field: "post_id"
  })
  postId: number;
}
