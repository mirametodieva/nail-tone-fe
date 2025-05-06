import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateNailPolishModel} from "./models/create-nail-polish-model";

@Injectable({
  providedIn: 'root'
})
export class NailPolishService {
  constructor(private http: HttpClient) {
  }

  addNewNailPolish(model: CreateNailPolishModel): Observable<void> {
    return this.http.post<void>('http://localhost:8080/api/nail-polishes', model);
  }

  deleteNailPolish(id: string): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/nail-polishes/' + id);
  }

  getClosestNailPolishes(colorCode: string): Observable<any> {
    const params = new HttpParams().append('colorCode', encodeURIComponent(colorCode));
    return this.http.get<any>('http://localhost:8080/api/colors', {params});
  }
}
