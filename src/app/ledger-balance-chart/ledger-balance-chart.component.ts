import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto'

interface ChartData {
  labels : string[],
  data : string[],
  backgroundColor : string[],
  borderColor : string[]
}

@Component({
  selector: 'app-ledger-balance-chart',
  templateUrl: './ledger-balance-chart.component.html',
  styleUrls: ['./ledger-balance-chart.component.css']
})
export class LedgerBalanceChartComponent implements OnInit , AfterViewInit{

  @Input() ledgerDataRaw : any;
  @ViewChild('canvas') private canvas!: ElementRef<HTMLCanvasElement>;
  context: any
  chart!:any
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')
    if(this.ledgerDataRaw){
      const processedData: ChartData = this.processLedgerData(this.ledgerDataRaw)
      this.createChart(processedData)
    }
  }
  createChart(input:ChartData){
    const ref = this
    this.chart = new Chart(
      this.context,
      {
        type: 'bar',
        data: {
          labels: input.labels,
          datasets: [
            {
              barThickness: 20,
              label: 'Balance',
              data: input.data,
              backgroundColor: input.backgroundColor,
              borderColor: input.borderColor,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
                display: false
            }
        },
          scales: {
              x: {
                  grid: {
                    display:false
                  }
              },
              y: {
                grid: {
                  display:false
                }
            },
            
          },
          animation: {
            duration: 500,
            onComplete: function () {
              let ctx:any
                  ctx = this.ctx;
                  ctx.textAlign = 'center';
                  ctx.fillStyle = "rgba(0, 0, 0, 1)";
                  ctx.textBaseline = 'bottom';
                  const ref = this
                  this.data.datasets.forEach(function (dataset, i) {
                      var meta = ref.getDatasetMeta(i);
                      meta.data.forEach(function (bar:any, index:any) {
                          var data = dataset.data[index];
                          ctx.fillText(data, 200, bar.y+8);
                      });
                  });
              }
          }
        }
        }
    );
    
  }
  processLedgerData(data:[]){
    const ledgerBalanceData : ChartData = {
      'labels' : [],
      'data' : [],
      'backgroundColor' : [],
      'borderColor' : []
    } as ChartData
    data.forEach((item:any)=>{
      ledgerBalanceData.labels.push(item.ledger_name)
      ledgerBalanceData.data.push(item.balance)
      if(item.balance_type==='CR'){ 
        ledgerBalanceData.backgroundColor.push('rgb(53, 184, 82,0.2)')
        ledgerBalanceData.borderColor.push('rgb(53, 184, 82)')
      }else{
        ledgerBalanceData.backgroundColor.push('rgb(207, 88, 148,0.2)')
        ledgerBalanceData.borderColor.push('rgb(207, 88, 148)')
      }
    })
    return ledgerBalanceData
  }
}
