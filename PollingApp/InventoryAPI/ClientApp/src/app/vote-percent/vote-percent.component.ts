



import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { trigger, transition, style, animate } from '@angular/animations';

interface OptionVote {
  optionId: number;
  optionText: string;
  voteCount: number;
}

interface Poll {
  pollId: number;
  question: string;
  createdAt: string;
  expirationDate: string;
  options: OptionVote[];
}

@Component({
  selector: 'app-vote-percent',
  templateUrl: './vote-percent.component.html',
  styleUrls: ['./vote-percent.component.css'],
   animations: [
        trigger('slideFadeIn', [
          transition(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            animate(
              '600ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ]),
          transition(':leave', [
            animate(
              '400ms ease-in',
              style({ opacity: 0, transform: 'translateY(30px)' })
            )
          ])
        ]),
    trigger('toggleFade', [
        transition(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
        ])
      ])
    
      ],
})
export class VotePercentComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  barChartOptions: Highcharts.Options = {};
  pieChartOptions: Highcharts.Options = {};

  polls: Poll[] = [];
  loading = true;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPolls();
  }

  fetchPolls() {
    this.loading = true;
    this.http.get<Poll[]>('https://localhost:7022/api/Vote/polls-with-votes')
      .subscribe({
        next: (data) => {
          this.polls = data;
          this.prepareCharts();
          this.loading = false;
        },
        error: (err) => {
          this.errorMsg = 'Failed to load polls.';
          console.error(err);
          this.loading = false;
        }
      });
  }

  prepareCharts() {
    const aggregatedOptions: { [optionText: string]: number } = {};

    for (const poll of this.polls) {
      for (const option of poll.options) {
        if (aggregatedOptions[option.optionText]) {
          aggregatedOptions[option.optionText] += option.voteCount;
        } else {
          aggregatedOptions[option.optionText] = option.voteCount;
        }
      }
    }

    const optionTexts = Object.keys(aggregatedOptions);
    const voteCounts = Object.values(aggregatedOptions);

    // Bar Chart
this.barChartOptions = {
  chart: { type: 'bar' },
  title: { text: '🟩 Total Votes by Option (Bar Chart)' },
  xAxis: {
    categories: optionTexts,
    title: { text: 'Options' }
  },
  yAxis: {
    min: 0,
    title: { text: 'Vote Count' },
      allowDecimals: false,      
  tickInterval: 1  
  },
  plotOptions: {
    bar: {
      pointWidth: 25,
      pointPadding: 0.3,   
      groupPadding: 2,     
      grouping: false      
    }
  },
  series: [{
    name: 'Votes',
    type: 'bar',
    data: voteCounts
  }]
};

    // Pie Chart
    this.pieChartOptions = {
      chart: { type: 'pie' },
      title: { text: '🟦 Vote Percentage by Option (Pie Chart)' },
      series: [{
        name: 'Votes',
        type: 'pie',
        data: optionTexts.map((text, i) => ({
          name: text,
          y: voteCounts[i]
        }))
      }]
    };
  }
}
