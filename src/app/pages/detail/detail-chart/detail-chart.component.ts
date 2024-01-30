import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

/**
 * DetailChart component, linked to DetailComponent
 */
@Component({
  selector: 'app-detail-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './detail-chart.component.html',
  styleUrl: './detail-chart.component.scss'
})
export class DetailChartComponent {

  // Data
  public dataDetailChart!: any[]; // TODO: any ?
  public olympic$!: Observable<Olympic>;
  public countryName!: string;

  // Graph options  
  public view: [number, number] = [700, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = "Dates";
  public showYAxisLabel = true;
  public yAxisLabel = "Nb of medals";
  public barPadding = 40;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {
  }

  /**
   * Gets data needed for the graph
   */
  public ngOnInit(): void {

    this.countryName = this.route.snapshot.params['country'];
    console.log(this.countryName);

    this.olympic$ = this.olympicService.getOlympicByCountryName(this.countryName);

    this.olympic$.subscribe(value => this.transformData(value));
  }

  /**
   * Transforms data in a format that can be used by the graph
   * @param data: Olympic 
   */
  public transformData(data: Olympic) {

    // TODO: any ??
    const dataDetailChartTemp: any[] = [];

    for (let i = 0; i < data.participations.length; i++) {

      let nbOfMedals = 0;

      const obj = { name: data.participations[i].year, value: data.participations[i].medalsCount };
      dataDetailChartTemp.push(obj);

    }
    this.dataDetailChart = dataDetailChartTemp;
  }
}
