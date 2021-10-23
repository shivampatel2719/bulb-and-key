import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map,tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })

export class ReviewPageServices {
    public selectedImage = new BehaviorSubject(null);
    public reviewedImages = new BehaviorSubject(null);
    public listOfImages = new BehaviorSubject(null);
    imagesArr: any = [];
    constructor(
        private http: HttpClient,
        private router: Router,
      ) {}
    
    getPictures(keyword: string) {
        const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
        const params = `api_key=1624083b1bdf91bcbe40ed145a7ae3a0&text=${keyword}&format=json&nojsoncallback=1&per_page=30`;
          
        return this.http.get(url + params).pipe(map((res: any) => {
            this.imagesArr = [];
            res.photos.photo.forEach((ph: any) => {
                const photoObj = {
                id: ph.id,
                url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}.jpg`,
                title: ph.title,
                rating: 0,
                review: null,
                reviewedBy : null
                };
                this.imagesArr.push(photoObj);
            });
            return this.imagesArr;
        }));
    }
}