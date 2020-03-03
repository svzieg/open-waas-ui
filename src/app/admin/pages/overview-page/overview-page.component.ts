import { AfterViewInit, ViewChild, Component, OnInit, Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {pluck, map, tap} from 'rxjs/operators';

import {PageService} from '../page.service'
import {Page} from '../page.model'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import {AddPageDialogComponent} from '../../dialogs/add-page-dialog/add-page-dialog.component'



import {PageListDataSource} from './page-list-datasource'
@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements AfterViewInit, OnInit {

  pages: Observable<Page[]>;
  dataSource: PageListDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Page>;

  displayedColumns: string[] = ['title', 'url'];
  constructor(private pageService: PageService, private addPageDialog: MatDialog) {}

  ngOnInit(): void {
    // IF you want to see only on page use this one:
    //this.course = this.route.snapshot.data["course"];

    this.dataSource = new PageListDataSource(this.pageService);
    this.dataSource.loadPages(1, "asc", 0, 0);
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

        this.paginator.page
            .pipe(
                tap(() => this.loadPagesPage())
            )
            .subscribe();
  }


  openCreatePageDialog(): void {
    const data = {}

    const dialogRef = this.addPageDialog.open(AddPageDialogComponent, {
      width: '250px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }


    loadPagesPage() {
        this.dataSource.loadPages(
            1,
            'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

}
