import { Table, Column, Model, HasMany } from "sequelize-typescript";


@Table({
    tableName: 'all_tags'
})
export class Alltags extends Model {   
    @Column 
    tag: string;
};