import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BeautySalonDetails} from "./models/beauty-salon-details";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {
  }

  getImageWithEnhanceLight(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>('http://localhost:8080/api/images/light-enhance', formData, {
      responseType: 'blob' as 'json'
    });
  }

  getSegmentNails(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>('http://localhost:8080/api/images/segment-nails', formData, {
      responseType: 'blob' as 'json'
    });
  }
}
