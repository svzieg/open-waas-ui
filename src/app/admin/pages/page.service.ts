import { Injectable } from '@angular/core';


import {Page, AllPagesGQL} from './page.model'

import {pluck, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private allPagesGQL: AllPagesGQL) { }


  findPages(pageId: number, sortDirection: string, pageIndex:number = 0, pageSize:number = 20) {
    return this.allPagesGQL.watch({offset: pageIndex*pageSize, limit: pageSize}).valueChanges.pipe(map(res => res["data"]["Pages"]));
  }
}
