import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { CommentComponent } from 'src/app/comment/comment.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { SharedserviceService } from 'src/app/sharedservice.service';

@Component({
  selector: 'app-movie-details', 
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  comments: any[] = []; 


  isFavorite: boolean = false;
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  
  


  constructor(
    
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private http : HttpClient,
    private authService : AuthService,
    private sharedService: SharedserviceService
    
  ) {}

  ngOnInit(): void {
    const getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
   
    this.loadComments();
    this.getMovieId(getParamId);
  }
 

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }


  addToFavorites() {
    if (this.getMovieDetailResult && this.getMovieDetailResult.id) {
      const movieId = this.getMovieDetailResult.id;
      this.service.addToFavorites(movieId).subscribe(
        (response) => {
          console.log('Added to favorites successfully:', response);
        },
        (error) => {
          console.error('Error adding to favorites:', error);
        }
      );
    } else {
      console.error('Invalid movie details');
    }
  }
  

  

  formData = {
    Name: '',
    mail: '',
    comment: ''
  };

 
  loadComments() {
    const apiUrl = `http://localhost:8080/comments/get?idmovie=${this.getMovieDetailResult.id}`;

    this.http.get<any[]>(apiUrl)
      .subscribe(
        (comment) => {
          this.comments= comment;
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
  }
  
  getMovieId(movieId: any) {
    this.service.getMovieDetails(movieId).subscribe((result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;
      this.sharedService.changeMovieDetailResult(result); 
    });
  }
  

  onSubmit() {
    

    const postData = {
        idmovie: this.getMovieDetailResult.id,
        name: this.formData.Name,
        email: this.formData.mail,
        comment: this.formData.comment
      };
      

    const apiUrl = 'http://localhost:8080/comments/add';

    this.http.post(apiUrl, postData)
      .subscribe(
        (response) => {
          console.log('Comment added successfully:', response);
          
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
  }

  resetForm() {
    this.formData = {
      Name: '',
      mail: '',
      comment: ''
    };
  }


  

 

  

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = result;
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type === 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast.slice(0, 9);
    });
  }
}