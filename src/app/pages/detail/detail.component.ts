import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, partition } from 'rxjs';
import { DetailChartComponent } from './detail-chart/detail-chart.component';

/**
 * DetailComponent, corresponding to detail page
 */
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DetailChartComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit, OnDestroy {

  // Data
  public countryName!: string;
  public numberOfEntries: number = -1;
  public totalNumberOfMedals: number = -1;
  public totalNumberOfAthletes: number = -1;

  // Data in a form that can be used by the graphic
  public results!: { name: number; value: number; }[];

  // Condition of loading
  public isLoading: boolean = true;

  public subscription!: Subscription;

  constructor(private router: Router, private olympicService: OlympicService, private route: ActivatedRoute) {
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
   * Raises error if country not found, and redirects to error page 
   */
  public ngOnInit(): void {

    this.countryName = this.route.snapshot.params['country'];

    let countryDetails$: Observable<Olympic> = this.olympicService.getOlympicByCountryName(this.countryName);

    this.subscription = countryDetails$.subscribe({
      next: (value) => {
        this.numberOfEntries = this.calculateNumberOfEntries(value);
        this.totalNumberOfMedals = this.calculateTotalNumberOfMedals(value);
        this.totalNumberOfAthletes = this.calculateTotalNumberOfAthletes(value);
        this.results = this.transformData(value);
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/not-found']);
      }
    });

  }

  /**
   * Calculates and returns the number of entries, given an Olympic
   * @param value: Olympic
   * @returns number
   */
  public calculateNumberOfEntries(value: Olympic): number {

    if (value.participations == null) {
      return -1;
    }

    let entries = (value.participations)
      .map(participation => participation.city);
    return new Set(entries).size;
  }

  /**
   * Calculates and returns the total number of medals, given an Olympic
   * @param value: Olympic 
   * @returns number
   */
  public calculateTotalNumberOfMedals(value: Olympic): number {

    if (value.participations == null) {
      return -1;
    }

    let numberOfMedals = (value.participations)
      .map(participation => participation.medalsCount)
      .reduce((acc, medalsCount) => acc + medalsCount);

    return numberOfMedals;
  }

  /**
   * Calculates and returns the total number of athletes, given an Olympic
   * @param value: Olympic  
   * @returns number
   */
  public calculateTotalNumberOfAthletes(value: Olympic): number {

    if (value.participations == null) {
      return -1;
    }

    let numberOfAthletes = (value.participations)
      .map(partition => partition.athleteCount)
      .reduce((acc, athleteCount) => acc + athleteCount);

    return numberOfAthletes;
  }

  /**
   * Defines the action onClick of the button : the user must be redirected
   * to home page 
   */
  public onClick(): void {
    this.router.navigateByUrl('');
  }

  /**
   * Transforms data to be used by the graphic
   * @param olympic 
   * @returns an empty array if there is no participation
   * @returns { name: number; value: number; }[] : an array containing data 
   */
  public transformData(olympic: Olympic): { name: number; value: number; }[] {

    let dataDetailChartTemp: {
      name: number;
      value: number;
    }[] = [];

    if (olympic.participations === undefined) {
      return [];

    } else {
      olympic.participations.map(participation => {
        dataDetailChartTemp.push({ name: participation.year, value: participation.medalsCount });
      });

      return dataDetailChartTemp;
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
