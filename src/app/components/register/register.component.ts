import {Component, OnInit} from '@angular/core';
import {PublisherRegistration} from "../../models/publisher-registration";
import {ActivatedRoute, Router} from "@angular/router";
import {PublisherService} from "../../services/publisher.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  publisherRegistration: PublisherRegistration;

  constructor(private route: ActivatedRoute, private router: Router, private publisherService: PublisherService) {
    this.publisherRegistration = new PublisherRegistration();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.publisherService.create(this.publisherRegistration).subscribe(result => this.goToLogin());
  }

  goToLogin() {
    this.router.navigate(['publisher/login']);
  }

}
