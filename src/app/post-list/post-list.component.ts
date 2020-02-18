import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';

import {pluck, map} from 'rxjs/operators';

import {DynamicGridComponent} from '../dynamic-grid/dynamic-grid.component'

const GET_POSTS = gql`
  {
    posts {
      title
      content
    }
  }
`;


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  posts: Observable<any>;
  constructor(private apollo: Apollo) { }


  getPosts() {
    return this.apollo.watchQuery<any>({query: GET_POSTS}).valueChanges.pipe(pluck('data','posts'))
  }

  ngOnInit() {
    this.posts = this.getPosts();
  }

}
