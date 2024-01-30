import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

/**
 * HomeComponent, corresponding to home page of the app
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  // Data
  public olympics$: Observable<Olympic[]> = of([]);

  public numberOfJOs: number = 0;
  public numberOfCountries: number = 0;

  constructor(private olympicService: OlympicService) {
  }

  /**
   * Gets data that must be displayed on the page
   */
  public ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe(value => {
      this.numberOfCountries = value.length;
    });
    this.olympics$.subscribe(value => this.numberOfJOs = this.calculateNumberOfJOs(value));

  }

  /**
   * Calculates and returns the number of JOs, given an Olympic[]
   * @param value: Olympic[] 
   * @returns number
   */
  public calculateNumberOfJOs(value: Olympic[]): number {

    let jos = new Set<string>();

    for (let i = 0 ; i < value.length ; i++) {
      for(let j = 0 ; j < value[i].participations.length ; j++) {
        jos.add(value[i].participations[j].city);
      }
    }
    return jos.size;
  }

}
