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
        alert('Error al obtener la pelicula ' + error.message); // Improved error handling
        console.error('Error al obtener la pelicula', error);
      }
    );
  }

  // Agregar una nueva pelicula
  addMovie(): void {
    if (!this.newMovie.title || !this.newMovie.director || !this.newMovie.date) {
      alert('Porfavor agregue todos los campos'); // Improved error handling
      console.error('Please fill in all fields');
      return;
    }

    this.moviesService.addMovie(this.newMovie).subscribe(
      (movie) => {
        this.movies.push(movie);
        this.newMovie = { title: '', director: '', date: '' }; // Reset form
      },
      (error) => {
        alert('Error al agregar la pelicula ' + error.message); // Improved error handling
        console.error('Error al agregar la pelicula', error);
      }
    );
  }

  // Eliminar una pelicula
  deleteMovie(movie: any): void {
    this.moviesService.deleteMovie(movie.id).subscribe(
      () => {
        this.movies = this.movies.filter(m => m.id !== movie.id);
      },
      (error) => {
        console.error('Error deleting movie:', error);
      }
    );
  }
}
