import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PublisherRegistration} from "../models/publisher-registration";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = 'http://localhost:8080/publishers'
  }

  public create(publisher: PublisherRegistration) {
    return this.http.post<PublisherRegistration>(this.endpoint, publisher);
  }
}
