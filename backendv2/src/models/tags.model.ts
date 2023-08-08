import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Posts } from './posts.model';
@Table
export class Tags extends Model {
  @Column
  tag: string;

  @BelongsTo(() => Posts, 'post_id')
  post: Posts;
}
