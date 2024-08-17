// src/movies/movies.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('listMovies')
  async listMovies(@Query('page') page: number) {
    return this.moviesService.listMovies(page);
  }
}
