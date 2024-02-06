import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

/**
 * AppComponent is the main component of the app
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private olympicService: OlympicService) {
  }

  /**
   * Loads initial data when the app is launched
   */
  public ngOnInit(): void {

    this.olympicService.loadInitialData().pipe(take(1)).subscribe();

  }
}
