// src/movies/dto/create-movie.dto.ts
import { IsString, IsNumber, IsOptional, IsBoolean, IsDate, Min, Max } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  overview: string;

  @IsDate()
  releaseDate: Date;

  @IsString()
  originalLanguage: string;

  @IsNumber()
  popularity: number;

  @IsNumber()
  voteAverage: number;

  @IsNumber()
  voteCount: number;

  @IsOptional()
  @IsString()
  posterPath?: string;

  @IsOptional()
  @IsString()
  backdropPath?: string;

  @IsOptional()
  @IsString()
  originalTitle?: string;

  @IsOptional()
  @IsBoolean()
  adult?: boolean;

  @IsOptional()
  @IsBoolean()
  video?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: number;
}
