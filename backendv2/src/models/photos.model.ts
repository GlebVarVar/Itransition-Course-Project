import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { Posts } from './posts.model';

@Table
export class Photos extends Model {
  @AllowNull
  @Column
  photo: string;

  @BelongsTo(() => Posts, 'post_id')
  post: Posts;
}
