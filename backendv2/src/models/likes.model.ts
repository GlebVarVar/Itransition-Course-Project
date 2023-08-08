import { Model, Table, BelongsTo } from 'sequelize-typescript';
import { Posts } from './posts.model';
@Table
export class Likes extends Model {
  @BelongsTo(() => Posts, 'post_id')
  post: Posts;
}
