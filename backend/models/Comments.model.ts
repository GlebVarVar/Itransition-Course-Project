import { Table, Column, Model } from "sequelize-typescript";

@Table({
  tableName: "comments",
})
export class Comments extends Model {
  @Column({
    field: "comment_body",
  })
  commentBody: string;

  @Column
  username: string;

  @Column
  email: string;
}
