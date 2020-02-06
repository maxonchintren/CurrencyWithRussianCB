import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from './currency-service.service';
import { JsonpClientBackend } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'currency';
  public todaysCurrency = [];
  public error = false;

  constructor(private _currencyService : CurrencyServiceService) {}

  ngOnInit() {
    let date = <HTMLInputElement>document.getElementById('dates');
    date.valueAsDate = new Date();
    date.max = date.value
    console.log(date.value)

    this._currencyService.getTodaysCurrency().subscribe((data) => {
      for (let val in data['Valute']) {
        this.todaysCurrency.push((data['Valute'][val]));
      }
    });
  }

  currencyForDate() {
    this.todaysCurrency = [];
    this._currencyService.getCurrencyForDate().subscribe((data) => {
      this.error = false;
      for (let val in data['Valute']) {
        this.todaysCurrency.push((data['Valute'][val]));
      }
    },
    (error) => this.error = true
    );
  }
  
  
  
}
