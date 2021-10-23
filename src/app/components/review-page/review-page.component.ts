import { Component, OnInit } from '@angular/core';
import { ReviewPageServices } from './review-page.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewFormComponent } from './dialogs/review-form/review-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  imagesArr : any = [];
  pageLoading: boolean = false;
  localStorage : any;
  keyWord: any = 'veg food';
  constructor(
    private reviewpageServices : ReviewPageServices,
    public dialog: MatDialog,
    private router: Router
  ) { }

  async ngOnInit() {
    let historyState : any = history.state.data;
    this.pageLoading = true;
    this.localStorage = localStorage.getItem('imagesArr');
    if(!this.localStorage) {
      this.imagesArr = this.reviewpageServices.getPictures(this.keyWord).subscribe((res) => {
        this.imagesArr = res.slice();
        this.pageLoading = false;
        this.imagesArr.forEach((image : any) => {
          if(historyState && historyState.id == image.id) {
            image.rating = historyState.rating;
            image.review = historyState.review;
            image.reviewedBy = historyState.reviewedBy;
          }
        });
        localStorage.setItem('imagesArr',JSON.stringify({'array' : this.imagesArr }));
      });
    }
    else {
      Object.entries(JSON.parse(this.localStorage)).forEach(([key,value] : any) => {
        this.imagesArr = value.slice();
        this.pageLoading = false;
        this.imagesArr.forEach((image : any) => {
          if(historyState && historyState.id == image.id) {
            image.rating = historyState.rating;
            image.review = historyState.review;
            image.reviewedBy = historyState.reviewedBy;
          }
        });
        localStorage.setItem('imagesArr',JSON.stringify({'array' : this.imagesArr }));
      });
    }
  }

  clearLocalStorage() {
    localStorage.clear();
    this.localStorage = null;
    this.ngOnInit();
  }

  openReviewForm(image : any) {
    this.reviewpageServices.selectedImage.next(image);
    this.router.navigate(['/review-image'], { state :  { data : image }} );
  }

}
