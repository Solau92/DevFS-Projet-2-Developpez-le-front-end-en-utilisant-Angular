import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
export class DetailComponent {

  public countryDetails$!: Observable<Olympic>;

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

    this.countryDetails$.subscribe(value => this.numberOfEntries = this.calculateNumberOfEntries(value));
    this.countryDetails$.subscribe(value => this.totalNumberOfMedals = this.calculateTotalNumberOfMedals(value));
    this.countryDetails$.subscribe(value => this.totalNumberOfAthletes = this.calculateTotalNumberOfAthletes(value));

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
    let entries = new Set<string>();

    for (let i = 0; i < value.participations.length; i++) {
      entries.add(value.participations[i].city);
    }
    return entries.size;
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
    let numberOfMedals = 0;

    for (let i = 0; i < value.participations.length; i++) {
      numberOfMedals += value.participations[i].medalsCount;
    }
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
    let numberOfAthletes = 0;

    for (let i = 0; i < value.participations.length; i++) {
      numberOfAthletes += value.participations[i].athleteCount;
    }
    return numberOfAthletes;
  }

  /**
   * Defines the action onClick of the button
   */
  public onClick(): void {

    this.router.navigateByUrl('');

  }
}
