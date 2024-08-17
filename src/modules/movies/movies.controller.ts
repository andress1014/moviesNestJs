// src/movies/movies.controller.ts
import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/createMovie.dto'; // Asegúrate de definir estos DTOs
import { UpdateMovieDto } from './dto/updateMovie.dto'; // Asegúrate de definir estos DTOs

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('listMovies')
  async listMovies(@Query('page') page: number) {
    return this.moviesService.listMovies(page);
  }

  @Post('createMovie')
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.createMovie(createMovieDto);
  }

  @Put('updateMovie/:id')
  async updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.updateMovie(id, updateMovieDto);
  }
}
