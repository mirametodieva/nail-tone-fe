import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BeautySalonDetails} from "./models/beauty-salon-details";

@Injectable({
  providedIn: 'root'
})
export class BeautySalonService {
  constructor(private http: HttpClient) {
  }

  getBeautySalonDetails(): Observable<BeautySalonDetails> {
    return this.http.get<BeautySalonDetails>('http://localhost:8080/api/beauty-salon');
  }
}
