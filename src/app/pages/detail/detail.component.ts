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

  public countryDetails$!: Observable<Olympic | undefined>;
  public results!: { name: number; value: number; }[];

  //////// Ajout pour unsubscribe
  public subscription!: Subscription;

  // Data
  public countryName!: string;

  public numberOfEntries: number = -1;
  public totalNumberOfMedals: number = -1;
  public totalNumberOfAthletes: number = -1;

  public isLoading: boolean = true;

  constructor(private router: Router, private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  public ngAfterViewChecked(): void {
    if (this.results.length > 0) {
      this.isLoading = false;
    }
  }

  /**
   * Gets data that must be displayed on the page
   */
  public ngOnInit(): void {

    this.countryName = this.route.snapshot.params['country'];

    // try {
    //   this.countryDetails$ = this.olympicService.getOlympicByCountryName(this.countryName);

    //   this.subscription = this.countryDetails$.subscribe(value => {
    //     console.log("else");
    //     this.numberOfEntries = this.calculateNumberOfEntries(value);
    //     this.totalNumberOfMedals = this.calculateTotalNumberOfMedals(value);
    //     this.totalNumberOfAthletes = this.calculateTotalNumberOfAthletes(value);
    //     this.results = this.transformData(value);
    //   });

    // } catch (e) {
    //   console.log("error");
    //     this.isLoading = false;
    //     this.results.length === -1;
    //     console.log(this.isLoading);
    //     this.router.navigateByUrl('***');
    // }


    this.countryDetails$ = this.olympicService.getOlympicByCountryName(this.countryName);

    this.subscription = this.countryDetails$.subscribe(value => {
      if (value === undefined) {
        this.isLoading = false;
        this.router.navigate(['/not-found']);
      } else {
        this.countryDetails$.subscribe(value => {
          this.numberOfEntries = this.calculateNumberOfEntries(value);
          this.totalNumberOfMedals = this.calculateTotalNumberOfMedals(value);
          this.totalNumberOfAthletes = this.calculateTotalNumberOfAthletes(value);
          this.results = this.transformData(value);
        });
      }
    });

    // this.subscription = this.countryDetails$.subscribe(value => {
    //   this.numberOfEntries = this.calculateNumberOfEntries(value);
    //   this.totalNumberOfMedals = this.calculateTotalNumberOfMedals(value);
    //   this.totalNumberOfAthletes = this.calculateTotalNumberOfAthletes(value);
    //   this.results = this.transformData(value);
    // });
  }

  /**
   * Calculates and returns the number of entries, given an Olympic
   * @param value: Olympic
   * @returns number
   */
  public calculateNumberOfEntries(value: Olympic | undefined): number {

    // TODO: Gérer erreurs
    // if (value.participations == null) {
    //   return -1;
    // }

    if (value === undefined) {
      return -1;
    } else {
      let entries = (value.participations)
        .map(participation => participation.city);
      return new Set(entries).size;
    }



  }

  /**
   * Calculates and returns the total number of medals, given an Olympic
   * @param value: Olympic 
   * @returns number
   */
  public calculateTotalNumberOfMedals(value: Olympic | undefined): number {

    // // TODO: Gérer erreurs
    // if (value.participations == null) {
    //   return -1;
    // }

    // // Voir si OK : ou possible de faire directement à partir de l'Observable ? 
    // let numberOfMedals = (value.participations)
    //   .map(participation => participation.medalsCount)
    //   .reduce((acc, medalsCount) => acc + medalsCount);

    // return numberOfMedals;

    if (value === undefined) {
      return -1;
    } else {
      let numberOfMedals = (value.participations)
        .map(participation => participation.medalsCount)
        .reduce((acc, medalsCount) => acc + medalsCount);

      return numberOfMedals;
    }

  }

  /**
   * Calculates and returns the total number of athletes, given an Olympic
   * @param value: Olympic  
   * @returns number
   */
  public calculateTotalNumberOfAthletes(value: Olympic | undefined): number {

    // // TODO: Gérer erreurs
    // if (value.participations == null) {
    //   return -1;
    // }

    // let numberOfAthletes = (value.participations)
    //   .map(partition => partition.athleteCount)
    //   .reduce((acc, athleteCount) => acc + athleteCount);

    // return numberOfAthletes;

    if (value === undefined) {
      return -1;
    } else {
      let numberOfAthletes = (value.participations)
        .map(partition => partition.athleteCount)
        .reduce((acc, athleteCount) => acc + athleteCount);

      return numberOfAthletes;
    }
  }

  /**
   * Defines the action onClick of the button
   */
  public onClick(): void {

    this.router.navigateByUrl('');

  }


  public transformData(data: Olympic | undefined): { name: number; value: number; }[] {

    // let dataDetailChartTemp: {
    //   name: number;
    //   value: number;
    // }[] = [];

    // data.participations.map(participation => {
    //   dataDetailChartTemp.push({ name: participation.year, value: participation.medalsCount });
    // });

    // return dataDetailChartTemp;

    let dataDetailChartTemp: {
      name: number;
      value: number;
    }[] = [];

    if (data === undefined) {
      return [];
    } else {

      data.participations.map(participation => {
        dataDetailChartTemp.push({ name: participation.year, value: participation.medalsCount });
      });

      return dataDetailChartTemp;
    }
  }



  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
