import { Column, Model, Table, BelongsTo } from 'sequelize-typescript';
import { Users, Posts } from './';
@Table
export class Ratings extends Model {
  @Column
  rating: number;

  @BelongsTo(() => Users, 'user_id')
  userId: Users;

  @BelongsTo(() => Posts, 'post_id')
  postId: Posts;
}
