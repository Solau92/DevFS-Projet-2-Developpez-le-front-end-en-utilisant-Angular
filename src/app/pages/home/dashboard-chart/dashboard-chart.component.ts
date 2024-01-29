import { Component } from '@angular/core';
// Ajouté
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
//import { dataDashboard } from './dataDashboard';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.scss'
})
export class DashboardChartComponent {

  // Data 
  public dataDashboard!: any[]; // any ?
  public olympics$!: Observable<Olympic[]>;

  // Graph options 
  // A typer !! 
  // protected view: [number, number] = [500, 500];
  protected showLegend: boolean = false;
  protected showLabels: boolean = true;
  protected legendPosition = LegendPosition.Below;
  protected maxLabelLength = 30;

  // Ajout injection service : à enlever ? 
  constructor(private olympicService: OlympicService, private router: Router) {
    //Object.assign(this, { this: this.dataDashboard2 });
    //Object.assign(this, { dataDashboard });
  }

  // Initialisation variable 
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe(value => this.transformData(value));
  }

  public transformData(data: Olympic[]) {
    
    const dataDashboard2: any[] = [];

    for(let i = 0 ; i < data.length ; i++) {

      let nbOfMedals = 0;

      for(let j = 0 ; j < data[i].participations.length ; j++) {
        nbOfMedals += data[i].participations[j].medalsCount;
      }
      const obj =  { name: data[i].country, value: nbOfMedals};
      dataDashboard2.push(obj);
    }

    this.dataDashboard = dataDashboard2;
  }

  /*   public setLabelFormatting(name: string) :string {
      return ` ${name} `;
    } */

  public setToolTipText(tooltipText: any): string {
    return "<span> <span class=\"tooltip-label\">" + tooltipText.data.name + "</span> <span class=\"tooltip-val\">" + " 🎖" + tooltipText.value + "</span></span>";
    // return tooltipText.data.name + " 🎖" + tooltipText.value;
  }

  public onSelect(data: any): void {
    // Data :any ??
    
    this.router.navigateByUrl(`./detail/${data.name}`);

  }

}

