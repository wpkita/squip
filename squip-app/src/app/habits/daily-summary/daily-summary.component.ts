import { Component, OnInit } from '@angular/core';
import { DailySummariesService } from '../daily-summaries.service';
import { DailySummary } from '../daily-summary';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.scss'],
  standalone: false,
})
export class DailySummaryComponent implements OnInit {
  public dailySummary: DailySummary | undefined;
  constructor(
    private dailySummariesService: DailySummariesService
  ) { }

  ngOnInit() {
    this.dailySummariesService.get().subscribe(dailySummary => this.dailySummary = dailySummary);
  }
}
