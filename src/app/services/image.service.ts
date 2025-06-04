import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {
  }

  getImageWithEnhanceLight(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(environment.apiUrl + '/api/images/light-enhance', formData, {
      responseType: 'blob' as 'json'
    });
  }

  getSegmentNails(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(environment.apiUrl + '/api/images/segment-nails', formData, {
      responseType: 'blob' as 'json'
    });
  }
}
