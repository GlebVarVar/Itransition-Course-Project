// module.exports = (sequelize, DataTypes) => {
//   const Alltags = sequelize.define('Alltags', {
//     tag: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   return Alltags;
// };

import { Column, Model, Table, AllowNull } from 'sequelize-typescript';

@Table
export class Alltags extends Model {
  @Column
  tag: string;
}
