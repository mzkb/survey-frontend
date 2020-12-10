import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserSurveyResponse} from "../models/user-survey-response";

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = 'http://localhost:8080/responses'
  }

  public get(uuid: string) {
    return this.http.get<UserSurveyResponse>(this.endpoint + '/' + uuid);
  }

  public create(userSurveyResponse: UserSurveyResponse) {
    return this.http.post<any>(this.endpoint, userSurveyResponse);
  }
}
