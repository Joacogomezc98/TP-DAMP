import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { DataService, Device } from '../services/data.service';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-detalle-sensor',
  templateUrl: './detalle-sensor.page.html',
  styleUrls: ['./detalle-sensor.page.scss'],
  standalone: true,
})
export class detalleSensorPage implements OnInit {
  private valorObtenido: number = 0;
  public myChart!: Highcharts.Chart;
  private chartOptions!: Highcharts.Options;
  dataValue!: number;
  deviceId!: string;
  device!: Device;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    setTimeout(() => {
      this.valorObtenido = this.dataValue;
      this.myChart.series[0].setData([this.valorObtenido]);
    }, 1000);

    this.generateChart();
    this.deviceId = this.activatedRoute.snapshot.paramMap.get('deviceId')!;
    this.dataService.getLastValueByDeviceId(this.deviceId).then(res => this.dataValue = res)
  }

  generateChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: undefined,
        plotBackgroundImage: undefined,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: 'transparent',
      },
      title: {
        text: ''
      },
      credits: { enabled: false },
      pane: {
        startAngle: -150,
        endAngle: 150
      },
      yAxis: {
        min: 0,
        max: 100,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 0
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
        }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
        }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
        }]
      },
      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        },
        type: 'gauge'
      }]
    };
    this.myChart = Highcharts.chart('deviceChart', this.chartOptions);
  }
}
