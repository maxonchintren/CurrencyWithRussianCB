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
  public inputValue = ''
  public error = false;
  public news;

  constructor(private _currencyService : CurrencyServiceService) {}

  ngOnInit() {
    let date = <HTMLInputElement>document.getElementById('dates');
    date.valueAsDate = new Date();
    date.max = date.value

    this._currencyService.getTodaysCurrency().subscribe((data) => {
      for (let val in data['Valute']) {
        this.todaysCurrency.push((data['Valute'][val]));
      }
    });

    this._currencyService.getNews().subscribe((data) => this.news = data["articles"].splice(0,5))
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
  
  valuteSearch() {
    let input = <HTMLInputElement>document.getElementById('search')
    this. inputValue = input.value.toLowerCase();
    console.log(input.value)
    console.log(this.news)
  }
  
  hasImg(article) {
    if (article.urlToImage) {
      return article.urlToImage;
    } else {
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwSVnSwVQ2xdVCsWMSya3NIGfeRqAeVvbhrGGyxnufLoA_LgIM';
    }
  }
}
