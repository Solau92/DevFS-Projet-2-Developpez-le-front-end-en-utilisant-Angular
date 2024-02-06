import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';

/**
 * HomeComponent, corresponding to home page of the app
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardChartComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {

  // Data
  public olympics$: Observable<Olympic[]> = of([]);
  public numberOfJOs: number = -1;
  public numberOfCountries: number = -1;

  // Data in a form that can be used by the graphic
  public results: { name: string; value: number; }[] = [];

  // Condition of loading
  public isLoading: boolean = true;

  public subscription!: Subscription;

  constructor(private olympicService: OlympicService) {
  }

  /**
   * If data loaded, change loading state to false 
   */
  public ngAfterViewChecked(): void {
    if (this.results.length > 0) {
      this.isLoading = false;
    }
  }

  /**
   * Gets data that must be displayed on the page 
   */
  public ngOnInit(): void {

    this.olympics$ = this.olympicService.getOlympics();

    this.subscription = this.olympics$.subscribe(value => {
      this.numberOfCountries = value.length;
      this.numberOfJOs = this.calculateNumberOfJOs(value);
      this.results = this.transformData(value);
    });

  }

  /**
   * Calculates and returns the number of JOs, given an Olympic[]
   * @param value: Olympic[] 
   * @returns number
   */
  public calculateNumberOfJOs(value: Olympic[]): number {

    let jos = value.flatMap(olympic =>
      olympic.participations).map(participation =>
        participation.city);

    return new Set(jos).size;

  }

  /**
  * Transforms data in a format that can be used by the graph
  * @param data: Olympic[] 
  * @returns { name: string; value: number; }[] : an array containing data 
  */
  public transformData(data: Olympic[]): { name: string; value: number; }[] {

    let dataDashboard: {
      name: string;
      value: number;
    }[] = [];

    data.map(olympic => {
      let nbOfMedals = (olympic.participations)
        .map(participation => participation.medalsCount)
        .reduce((acc, medalsCount) => acc + medalsCount);
      dataDashboard.push({ name: olympic.country, value: nbOfMedals });
    })

    return dataDashboard;
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

