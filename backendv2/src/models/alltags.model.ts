import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Alltags extends Model {
  @Column
  tag: string;
}
