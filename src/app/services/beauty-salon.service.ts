import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BeautySalonDetails} from "./models/beauty-salon-details";
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BeautySalonService {
  constructor(private http: HttpClient) {
  }

  getBeautySalonDetails(): Observable<BeautySalonDetails> {
    return this.http.get<BeautySalonDetails>(environment.apiUrl + '/api/beauty-salon');
  }
}
