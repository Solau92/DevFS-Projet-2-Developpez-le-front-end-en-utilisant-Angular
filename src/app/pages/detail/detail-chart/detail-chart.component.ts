import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
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
export class DetailChartComponent implements OnInit {

  // Data
  @Input() public dataDetailChart!: { name: number; value: number; }[];

  //////// Ajout pour unsubscribe
  public subscription!: Subscription;

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

  constructor(private route: ActivatedRoute) {
  }

  /**
   * Gets data needed for the graph
   */
  public ngOnInit(): void {

  }

}
