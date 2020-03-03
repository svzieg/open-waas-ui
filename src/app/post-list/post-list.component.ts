import { Component, OnInit, Injectable } from '@angular/core';
import gql from 'graphql-tag';
import {Apollo, Mutation, Subscription, QueryRef} from 'apollo-angular';
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

type Posts = [{
  title: string,
  content: string
}]

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  posts: Observable<any>;
  lastPost:Observable<any>;

  getPostsGQL: QueryRef<Posts, any>;

  constructor(private apollo: Apollo, private createPostGQL: CreatePostGQL, newPostGQL: NewPostGQL) {
    this.getPostsGQL = this.apollo.watchQuery<any>({query: GET_POSTS})
  }


  newPost(title:string, content:string){
    this.createPostGQL.mutate({ title, content }, {optimisticResponse: {
        __typename: 'Mutation',
        createPost: {
          __typename: 'Post',
          title,
          createdAt: +new Date,
          content,
        }
      }
    })
      .subscribe(({ data }) => {
      console.log('got data', data);
      this.getPostsGQL.refetch();

    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  getPosts() {
    return  this.posts
  }

  ngOnInit() {
    this.posts = this.getPostsGQL.valueChanges.pipe(pluck('data','posts'))
  }

}



@Injectable({
  providedIn: 'root',
})
export class CreatePostGQL extends Mutation {
  document = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      title
      content
    }
  }
  `;
}


@Injectable({
  providedIn: 'root',
})
export class NewPostGQL extends Subscription {
  document = gql`
    subscription postAdded {
      postAdded {
        title
        content
      }
    }
  `;
}
