// src/movies/models/movie.model.ts
import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Movie extends Model<Movie> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  overview: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  releaseDate: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalLanguage: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  popularity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  voteAverage: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  voteCount: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  posterPath?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  backdropPath?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  originalTitle?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  adult?: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  video?: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  rating?: number;
}
