import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dynamic-grid',
  templateUrl: './dynamic-grid.component.html',
  styleUrls: ['./dynamic-grid.component.scss']
})
export class DynamicGridComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards;

  @Input() cols: number;


  @Input()
  set elements(elements: [any]) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return this.buildGrid(elements, matches);
    })
  );

  }


  buildGrid(elements: [any], matches: any) {
    if (!elements) return [];
    return elements.map((element) => ({item: element, cols: 1, rows: 1}));
  }




  constructor(private breakpointObserver: BreakpointObserver) {}
}
