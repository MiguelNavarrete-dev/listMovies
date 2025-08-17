import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'http://127.0.0.1:8000/api/movies/'; //  API URL

  constructor(private http: HttpClient) {}

  // Obtener todas las peliculas
  getMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Agregar una nueva pelicula
  addMovie(movie: { title: string; director: string; date: string }): Observable  <any> {
    return this.http.post(this.apiUrl, movie);
  }

  // Eliminar una pelicula
  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
