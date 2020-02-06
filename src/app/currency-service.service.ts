import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {

  constructor(private _http : HttpClient) { }

  getTodaysCurrency() {
    return this._http.get('https://www.cbr-xml-daily.ru/daily_json.js');
  }

  getCurrencyForDate() {
    let dateInput = <HTMLInputElement>document.getElementById('dates');
    let date = dateInput.value.split('-').join('\/\\');
    return this._http.get(`\/\/www.cbr-xml-daily.ru\/archive\/${date}\/daily_json.js`)
  }
}
