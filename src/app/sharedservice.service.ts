import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  constructor() { }
  private movieDetailResultSource = new BehaviorSubject<any>(null);
  currentMovieDetailResult = this.movieDetailResultSource.asObservable();

  updateMovieDetailResult(movieDetailResult: any) {
    this.movieDetailResultSource.next(movieDetailResult);
  }

  changeMovieDetailResult(movieDetail: any) {
    this.movieDetailResultSource.next(movieDetail);
  }
}
