import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Page {
  title: string;
  url: string;
}

export interface Response {
  pages: Page[];
}


@Injectable({
  providedIn: 'root',
})
export class AllPagesGQL extends Query<Response> {
  document = gql`
    query Pages($offset: Int, $limit: Int) {
      Pages(offset: $offset, limit: $limit) {
        title
        url
      }
    }
  `;
}
