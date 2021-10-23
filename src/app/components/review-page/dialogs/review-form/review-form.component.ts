import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReviewPageServices } from '../../review-page.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent implements OnInit {
  selectedImage : any;
  hoverStar: any;
  ratings: any;
  fixedratings: any;  
  reviewedBy : any;
  review: any;
  error : any;
  constructor(
    private reviewpageServices : ReviewPageServices,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.selectedImage = history.state.data;
    this.fixedratings = history.state.data.rating;
    this.reviewedBy = history.state.data.reviewedBy;
    this.review = history.state.data.review;
  }

  hoverStarStart(rating : any) {
    this.ratings = rating;
    this.hoverStar = true;
  }

  selectStar(rating : any) {
    this.fixedratings = rating;
  }

  reviewImage() {
    if(!this.fixedratings || !this.reviewedBy || !this.review) {
      this.error = '* Missing fields';
    }
    else {
      this.error = null;
      this.selectedImage.rating = this.fixedratings;
      this.selectedImage.review = this.review;
      this.selectedImage.reviewedBy = this.reviewedBy;
      this.reviewpageServices.reviewedImages.next(this.selectedImage);
      this.router.navigate(['/review-page'],{ state : { data : this.selectedImage }});
    }
  }

  goBack() {
    this.router.navigate(['/review-page']);
  }
}
