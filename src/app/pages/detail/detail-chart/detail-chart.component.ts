import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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

  // Data from DetailComponent
  @Input() public dataDetailChart!: { name: number; value: number; }[];

  // Graph options  
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = "Dates";
  public showYAxisLabel = true;
  public yAxisLabel = "Nb of medals";
  public barPadding = 40;

}
