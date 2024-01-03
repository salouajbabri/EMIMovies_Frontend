// favorited.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Observable, forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoritedMovies: any[] = [];
  favoritedMovieDetailsList: any[] = [];

  constructor(private service: MovieApiServiceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllFavoritesWithDetails();
  }

  
  getAllFavoritesWithDetails() {
    this.service.getAllFavorites().subscribe((data) => {
      this.favoritedMovies = data;
      console.log('Received favorites data:', data);

      const requests = this.favoritedMovies
        .filter((favoritedMovie) => favoritedMovie.movieId) 
        .map((favoritedMovie) =>
          this.service.getMovieDetails(favoritedMovie.movieId)
        );

      forkJoin(requests).subscribe((results) => {
        this.favoritedMovieDetailsList = results.filter((result) => !!result);
        console.log('Favorited movie details:', results);

        // Force change detection to update the UI
        this.cdr.detectChanges();
      });
    });

  }

  getUrl(name: any) {
    return this.service.getimagefromapi(name);
  }


 
  
}
