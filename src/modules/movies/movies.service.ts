// src/movies/movies.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly tmdbApiUrl = 'https://api.themoviedb.org/3/trending/movie/day';
  private readonly tmdbApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ4YjIzOGJmZDgyYTQ4ZWQ3MTBiNGRiM2UzZTJhZCIsIm5iZiI6MTcyMzg2MTU4MC43Njg5MjQsInN1YiI6IjY2YWYwYzNhZjNlZTcyOTIwNjA0ZjdkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Hw8LFMWOdzzRSfNmALYorWLV0U5oe9Q3uowuIuoknQ';
  private readonly posterBaseUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';

  async listMovies(page: number = 1): Promise<any> {
    try {
      const response = await axios.get(this.tmdbApiUrl, {
        headers: {
          Authorization: `Bearer ${this.tmdbApiKey}`,
          accept: 'application/json',
        },
        params: {
          language: 'en-US',
          page: page,
        },
      });

      const movies = response.data.results.map(movie => ({
        ...movie,
        poster_path: `${this.posterBaseUrl}${movie.poster_path}`,
      }));

      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies from TMDb');
    }
  }
}
