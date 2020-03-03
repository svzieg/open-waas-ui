import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-base-elements',
  template: `
    <p>
      base-elements works!
    </p>
  `,
  styles: []
})
export class BaseElementsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
