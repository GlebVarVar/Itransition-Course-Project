import { AllowNull, Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Likes, Posts, Ratings } from './';

@Table
export class Users extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @AllowNull
  @Column({
    field: 'user_type',
  })
  userType: string;

  @HasMany(() => Likes, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
  })
  likes: Likes[];

  @HasMany(() => Posts, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
  })
  posts: Posts[];

  @HasMany(() => Ratings, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id',
  })
  ratings: Ratings[];
}
