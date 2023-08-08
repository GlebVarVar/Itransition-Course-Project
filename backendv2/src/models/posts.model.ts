import {
  Column,
  Model,
  Table,
  HasMany,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Comments, Likes, Photos, Ratings, Tags, Users } from './';

@Table
export class Posts extends Model {
  @Column
  title: string;

  @Column({
    field: 'post_text',
    type: DataType.TEXT,
  })
  postText: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  category: string;

  @HasMany(() => Likes, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id',
  })
  likes: Likes[];

  @HasMany(() => Ratings, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id',
  })
  ratings: Ratings[];

  @HasMany(() => Comments, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id',
  })
  comments: Comments[];

  @HasMany(() => Tags, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id',
  })
  tags: Tags[];

  @HasMany(() => Photos, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id',
  })
  photos: Photos[];

  @BelongsTo(() => Users, 'user_id')
  user: Users;
}
