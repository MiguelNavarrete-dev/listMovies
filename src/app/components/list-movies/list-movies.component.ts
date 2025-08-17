import { Component } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
   
@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrl: './list-movies.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule]
})

export class ListMoviesComponent implements OnInit {
  movies: any[] = [];
  newMovie = {
    title: '',
    director: '',
    date: ''
  };

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  // Obtener todas las peliculas
  getMovies(): void {
    this.moviesService.getMovies().subscribe(
      (data: any[]) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  // Agregar una nueva pelicula
  addMovie(): void {
    if (!this.newMovie.title || !this.newMovie.director || !this.newMovie.date) {
      alert('Please fill in all fields');
      return;
    }

    this.moviesService.addMovie(this.newMovie).subscribe(
      (movie) => {
        this.movies.push(movie);
        this.newMovie = { title: '', director: '', date: '' }; // Reset form
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }

  // Eliminar una pelicula
  deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id).subscribe(
      () => {
        this.movies = this.movies.filter(movie => movie.id !== id);
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }
}
