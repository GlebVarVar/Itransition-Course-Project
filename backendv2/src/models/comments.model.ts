import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Posts } from './';

@Table
export class Comments extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column({
    field: 'comment_body',
  })
  commentBody: string;

  @BelongsTo(() => Posts, 'post_id')
  postId: number;
}
