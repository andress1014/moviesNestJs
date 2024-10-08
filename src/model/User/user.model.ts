import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    defaultValue: false,
  })
  active: boolean;

  @Column({
    allowNull: false,
  })
  name: string;
  @Column({
    defaultValue: null
  })
  emailVerifiedAt: Date;
}
