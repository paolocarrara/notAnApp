import { Injectable } from '@angular/core';
import * as Parse from 'parse';
let parse = require('parse');
//import {parse} from 'parse';
import { Review } from '../shared/review';

@Injectable()
export class NotAnAppService {

  constructor(
  ) {
    // To set the server URL
    let parse = require('parse');
    parse.initialize("notAnAppId");
    parse.serverURL = 'http://localhost:1337/parse';
  }

  saveReview (review: Review) {
    var ParseReview = Parse.Object.extend("Review");
    var parseReview = new ParseReview();

    parseReview.set("movie", review.movie);
    parseReview.set("rate", review.rate);
    parseReview.set("comment", review.comment);

    return parseReview.save(null);
  }

  getReviews () {
    var ParseReview = Parse.Object.extend("Review");
    var query = new Parse.Query(ParseReview);

    return query.find();
  }

  getAverage (movie:string) {
    return Parse.Cloud.run('averageStars', { movie: movie });
  }

  destroyReview (parseReview) {
    return parseReview.destroy();
  }

  searchReview (movie) {
    var ParseReview = Parse.Object.extend("Review");
    var query = new Parse.Query(ParseReview);
    query.startsWith("movie", movie);

    return query.find();
  }
}
