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

  public countryDetails$!: Observable<Olympic>;
  public results!: { name: number; value: number; }[];

  //////// Ajout pour unsubscribe
  public subscription!: Subscription;

  // Data
  public countryName!: string;

  public numberOfEntries: number = 0;
  public totalNumberOfMedals: number = 0;
  public totalNumberOfAthletes: number = 0;

  constructor(private router: Router, private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  /**
   * Gets data that must be displayed on the page
   */
  public ngOnInit(): void {

    this.countryName = this.route.snapshot.params['country'];

    this.countryDetails$ = this.olympicService.getOlympicByCountryName(this.countryName);

    this.subscription = this.countryDetails$.subscribe(value => {
      this.numberOfEntries = this.calculateNumberOfEntries(value);
      this.totalNumberOfMedals = this.calculateTotalNumberOfMedals(value);
      this.totalNumberOfAthletes = this.calculateTotalNumberOfAthletes(value);
      this.results = this.transformData(value);
    });

  }


  /**
   * Calculates and returns the number of entries, given an Olympic
   * @param value: Olympic
   * @returns number
   */
  public calculateNumberOfEntries(value: Olympic): number {

    // TODO: Gérer erreurs
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

    // TODO: Gérer erreurs
    if (value.participations == null) {
      return -1;
    }

    // Voir si OK : ou possible de faire directement à partir de l'Observable ? 
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

    // TODO: Gérer erreurs
    if (value.participations == null) {
      return -1;
    }

    let numberOfAthletes = (value.participations)
      .map(partition => partition.athleteCount)
      .reduce((acc, athleteCount) => acc + athleteCount);

    return numberOfAthletes;
  }

  /**
   * Defines the action onClick of the button
   */
  public onClick(): void {

    this.router.navigateByUrl('');

  }


  public transformData(data: Olympic): { name: number; value: number; }[] {

    let dataDetailChartTemp: {
      name: number;
      value: number;
    }[] = [];

    data.participations.map(participation => {
      dataDetailChartTemp.push({ name: participation.year, value: participation.medalsCount });
    });

    return dataDetailChartTemp;
  }
  


  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
