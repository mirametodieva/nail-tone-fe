import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SignInModel, SignUpModel} from "./models/sign-up-model";
import {Observable, tap} from "rxjs";
import {TokenModel} from "./models/token-model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signUp(model: SignUpModel): Observable<TokenModel> {
    return this.http.post<TokenModel>('http://localhost:8080/auth/registration', model).pipe(
      tap(response => this.saveAuthToken(response))
    );
  }

  signIn(model: SignInModel): Observable<TokenModel> {
    return this.http.post<TokenModel>('http://localhost:8080/auth/login', model).pipe(
      tap(response => this.saveAuthToken(response))
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  private saveAuthToken(tokenModel: TokenModel) {
    localStorage.setItem('authToken', tokenModel.token);
  }
}
