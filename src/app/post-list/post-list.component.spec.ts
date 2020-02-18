import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import gql from 'graphql-tag';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';

import { PostListComponent } from './post-list.component';

const GET_POSTS = gql`
  {
    posts {
      title
      content
    }
  }
`;

describe('PostListComponent', () => {
  let controller: ApolloTestingController;

  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule
      ],
      declarations: [ PostListComponent ]
    })
    .compileComponents();

    controller = TestBed.get(ApolloTestingController)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('expect a list of posts', () => {
    component.getPosts().subscribe( posts => {
      expect(posts[0].title).toEqual('Mr Apollo')
    })


    // The following `expectOne()` will match the operation's document.
    // If no requests or multiple requests matched that document
    // `expectOne()` would throw.
    const op = controller.expectOne(GET_POSTS);

    // Assert that one of variables is Mr Apollo.
    // expect(op.operation.variables.name).toEqual('Mr Apollo');

    // Respond with mock data, causing Observable to resolve.
    op.flush({
      data: {
        posts: [{
          title: 'Mr Apollo',
          content: 'foo',
        }],
      }
    });
  });

});
