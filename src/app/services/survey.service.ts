import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SurveyResponse} from "../models/survey-response";
import {SurveyCreate} from "../models/survey-create";
import {SurveySend} from "../models/survey-send";
import {UserSurveyResponse} from "../models/user-survey-response";
import {SurveyUpdate} from "../models/survey-updatee";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = 'http://localhost:8080/surveys'
  }

  public create(surveyCreate: SurveyCreate) {
    return this.http.post<SurveyResponse>(this.endpoint, surveyCreate);
  }

  public update(surveyUpdate: SurveyUpdate) {
    return this.http.put<SurveyResponse>(this.endpoint, surveyUpdate);
  }

  public delete(uuid: string) {
    return this.http.delete(this.endpoint + '/' + uuid);
  }

  public get(uuid: String) {
    return this.http.get<SurveyResponse>(this.endpoint + '/' + uuid);
  }

  public list() {
    return this.http.get<SurveyResponse[]>(this.endpoint);
  }

  public responseList(uuid: string) {
    return this.http.get<UserSurveyResponse[]>(this.endpoint + '/' + uuid + '/responses');
  }

  public send(uuid: string, surveySend: SurveySend) {
    return this.http.post(this.endpoint + '/' + uuid, surveySend);
  }
}
