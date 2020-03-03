import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Observable, of as observableOf, merge, of, BehaviorSubject} from 'rxjs';
import {pluck, map, catchError, finalize} from 'rxjs/operators';

import {PageService} from '../page.service'
import {Page} from '../page.model'


/**
 * Data source for the TestTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PageListDataSource extends DataSource<Page>{
  data: Page[];
  paginator: MatPaginator;
  sort: MatSort;


  private pagesSubject = new BehaviorSubject<Page[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public pagesCount = 100


  public loading$ = this.loadingSubject.asObservable();



  constructor(private pageService: PageService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Page[]> {
    return this.pagesSubject.asObservable()
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.pagesSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  public loadPages(pageId: number, sortDirection: string, pageIndex:number = 0, pageSize:number = 20) {
    this.loadingSubject.next(true);
    this.pageService.findPages(pageId, sortDirection, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe((pages: Page[]) => {
      this.pagesSubject.next(pages)
      // This is necessary since, apollo seams not to destroy subscibtion... so finalize will not work
      return  this.loadingSubject.next(false)
    })

  }


  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Page[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'url': return compare(+a.url, +b.url, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
