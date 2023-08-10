import { Model, Table, Column } from "sequelize-typescript";


@Table({
    tableName: 'likes'
})
export class Likes extends Model {

    @Column
    likes: number;
}