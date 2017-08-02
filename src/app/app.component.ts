import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotAnAppService } from './not-an-app.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Review } from '../shared/review';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('reviewForm')
  reviewForm: NgForm;

  @ViewChild('searchForm')
  searchForm: NgForm;

  @ViewChild('content')
  content: NgbModal;

  public reviews: any[];
  public onSaveErrorMessage: string;
  public reviewModalMovie: string;
  public reviewModalAverage: number;

  constructor (
    private notAnAppService: NotAnAppService,
    private modalService: NgbModal
  ) {

  }

  ngOnInit () {
    this.getReviews();
  }

  public onSave () {
    let review = new Review ();
    review.movie = this.reviewForm.value.movie;
    review.rate = this.reviewForm.value.rate;
    review.comment = this.reviewForm.value.comment;

    let saveReviewPromise = this.notAnAppService.saveReview(review);
    saveReviewPromise.then(
      (parseReview) => this.onSaveSuccess(parseReview),
      (error) => this.onSaveError(error)
    )
  }

  private onSaveSuccess (parseReview) {
    this.onSaveErrorMessage = '';
    this.reviewForm.reset();
    this.getReviews();
  }

  private onSaveError (error) {
    this.onSaveErrorMessage = error.message;
  }

  public getReviews () {
    let getReviewsPromise = this.notAnAppService.getReviews();
    getReviewsPromise.then(
      (parseReviews) => this.onGetReviewsSuccess(parseReviews),
      (error) => this.onGetReviewsError(error));
  }

  private onGetReviewsSuccess (parseReviews) {
    this.reviews = parseReviews;
  }

  private onGetReviewsError (error) {
    console.log(error);
  }

  public onGetAverage (parseReview) {
    this.reviewModalMovie = parseReview.get('movie');
    let getAveragePromise = this.notAnAppService.getAverage(parseReview.get('movie'));
    getAveragePromise.then(
      (averateRating) => this.onGetAverageSuccess(averateRating),
      (error) => this.onGetAverageError(error)
    );
  }

  private onGetAverageSuccess (averateRating) {
    this.reviewModalAverage = averateRating;
    this.open(this.content);
  }

  private onGetAverageError (error) {
    console.log(error);
  }

  public onDestroyReview (parseReview) {
    let destroyReviewPromise = this.notAnAppService.destroyReview(parseReview);
    destroyReviewPromise.then(
      (response) => this.onDestroyReviewSuccess(response),
      (error) => this.onDestroyReviewError(error)
    );
  }

  private onDestroyReviewSuccess (response) {
    this.getReviews();
  }

  private onDestroyReviewError (error) {

  }

  public onSearch () {
    let searchReviewPromise = this.notAnAppService.searchReview(this.searchForm.value.movie);
    searchReviewPromise.then(
      (results) => this.onSearchSuccess(results),
      (error) => this.onSearchError(error)
    );
  }

  private onSearchSuccess (results) {
    this.reviews = results;
  }

  private onSearchError (error) {
    console.log(error);
  }

  public open(content) {
    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }

  private getDismissReason(reason: any): string {
   if (reason === ModalDismissReasons.ESC) {
     return 'by pressing ESC';
   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
     return 'by clicking on a bangCckdrop';
   } else {
     return  `with: ${reason}`;
   }
  }
}
