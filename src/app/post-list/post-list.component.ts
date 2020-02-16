import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

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
  styleUrls: ['./post-list.component.styl']
})
export class PostListComponent implements OnInit {

  posts;
  loading;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery<any>({query: GET_POSTS})
      .valueChanges.subscribe(({data,loading}) => {
        this.loading = loading;
        this.posts = data.posts;
      });
  }

}
