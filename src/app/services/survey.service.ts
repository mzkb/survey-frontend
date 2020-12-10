import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SurveyResponse} from "./survey-response";
import {SurveyCreate} from "./survey-create";

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

  public update(surveyCreate: SurveyCreate) {
    //return this.http.put<SurveyResponse>(this.endpoint + '/' + surveyCreate.uuid, surveyCreate);
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
}
