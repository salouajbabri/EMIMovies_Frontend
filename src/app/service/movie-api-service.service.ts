import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {
  

  constructor(private http: HttpClient) { }
  apikey = "d006ea37c6a2a388101e001642460b8e";
  //apitoken= "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDQxZDViMjlkNmRlZjY1MmQ0ZGQ3Y2E4ODI1ZDFlZiIsInN1YiI6IjY1Nzc0M2ZkYmJlMWRkMDBhYzdkMWZkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NhaCDVg6N-4j00BNZMWLGCkFbRNHStY3K982VL22XCQ";

  baseurl = "https://api.themoviedb.org/3";
  private baseUrl = 'http://localhost:8080';
  private scndUrl ="http://localhost:8080/comments/add"


  
 

  getFavoriteMovies(movieId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/favorites/get`);
  }
  
  

  addToFavorites(movieId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorites/add`, { movieId });
  }

 

  //bannerapidata
 
  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/popular?api_key=${this.apikey}`);
  }


  getMovieDetailsF(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/favorites/${movieId}`;
    return this.http.get(url);
  }
  

  getimagefromapi( poster_path: string){
    return 'https://image.tmdb.org/t/p/w1280' + poster_path
  }
  getAllFavorites(): Observable<any[]> {
    const url = `${this.baseUrl}/favorites/get`;
    return this.http.get<any[]>(url);
  }

  deleteFavorite(movie_id: number): Observable<any> {
    const url = `${this.baseUrl}/favorites/delete/${movie_id}`;
    return this.http.delete(url);
  }
 

  trendingMovieApiData():Observable<any>{
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
  }

  //searchmovie

  getSearchMovie(data:any):Observable<any>
  {
    console.log(data, 'movie#');
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  getMovieDetails(data:any):Observable<any>
  {
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`); 
  }
  getMovieVideo(data:any):Observable<any>
  {
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`);
  }

  getMovieCast(data:any):Observable<any>{
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`);
  }

  fetchActionMovies():Observable<any>{
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }
  fetchAdventureMovies():Observable<any>{
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`);
  }

  fetchAnimationMovies():Observable<any>{
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=16`);
  }

  fetchComedyMovies():Observable<any>{
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`);
  }

  fetchDocumebtaryMovies():Observable<any>{
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=99`);
  }

}
