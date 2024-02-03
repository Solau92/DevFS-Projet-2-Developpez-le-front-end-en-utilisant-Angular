import { Component, OnInit } from '@angular/core';

/**
 * NotFoundComponent, corresponding to error page
 */
@Component({
  selector: 'app-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() {
  }

  public ngOnInit(): void {
  }

}
