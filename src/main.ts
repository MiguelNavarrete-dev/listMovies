import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { ListMoviesComponent } from './app/components/list-movies/list-movies.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movies', component: ListMoviesComponent}
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ]
}).catch(err => console.error(err));
