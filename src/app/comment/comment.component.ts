import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieApiServiceService } from '../service/movie-api-service.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
    @Input() movieId!: number;


  formData = {
    Name: '',
    mail: '',
    comment: ''
  };

  constructor(private http: HttpClient, private service: MovieApiServiceService) { }

  

  // Function to handle form submission
  onSubmit() {
    

    const postData = {
        movieId: this.movieId,
        name: this.formData.Name,
        email: this.formData.mail,
        comment: this.formData.comment
      };
      

    const apiUrl = 'http://localhost:8080/comments/add';

    this.http.post(apiUrl, postData)
      .subscribe(
        (response) => {
          console.log('Comment added successfully:', response);
          this.resetForm();
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
}
