import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './detail-chart.component.html',
  styleUrl: './detail-chart.component.scss'
})
export class DetailChartComponent {

  // Data en dur pour commencer 
  single: any[] = [
    {
      "name": "1980",
      "value": 10
    },
    {
      "name": "1984",
      "value": 20
    },
    {
      "name": "1988",
      "value": 30
    }
  ];

  // Data
  public dataDetailChart! :any[]; // any ?
  public olympic$!: Observable<Olympic>;
  
  public countryName!: string;

  // Graph options 
  // A typer !! 
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Nb of medals';

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  constructor(private olympicService :OlympicService, private route: ActivatedRoute) {
    // Object.assign(this, { this : this.single })
  }

  // Initialisation variables
  ngOnInit(): void {

    this.countryName = this.route.snapshot.params['country'];
    console.log(this.countryName);

    this.olympic$ = this.olympicService.getOlympicByCountryName(this.countryName);

    this.olympic$.subscribe(value => this.transformData(value));

  }

  public transformData(data: Olympic) {

    // Revoir + any
    const dataDetailChartTemp :any[] = [];

    for(let i = 0 ; i < data.participations.length ; i++) {

      let nbOfMedals = 0;

      console.log(data.participations[i].year);
      console.log(data.participations[i].medalsCount);

      const obj = { name: data.participations[i].year, value :data.participations[i].medalsCount };
      dataDetailChartTemp.push(obj);

    }
    this.dataDetailChart = dataDetailChartTemp; 
  }
}
