# Survey Frontend
Simple survey frontend application.

## Features
* Create a publisher
* Create a survey
* Update a survey
* Send a survey
* Take a survey
* View responses

## Technology Stack
* [Angular CLI](https://github.com/angular/angular-cli): 11.0.2
* Node: 14.15.1
* Docker

## Dependencies
* See "package.json"

## Usage
Expects the API server to be running at the address `http://localhost:8080`.

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Docker

#### Pre-requisite
* Docker installed and available

#### Build
```shell script
docker build --tag survey-frontend:latest .
```

#### Run
```shell script
docker run --rm \
  -p 4200:80 \
  -t \
  --name survey-frontend \
  survey-frontend:latest
```

## Design

Uses Bootstrap for providing the basic styles for the frontend.  
The UI is very simple to get the job done.

## Current Implementation
### Missing
#### Validation
* Validation in the frontend is missing
* What validation there is does not handle the error gracefully for the user
#### Testing
* Test cases for the components and services is missing
#### Error Handling
* Errors are not handled gracefully with good feedback for the user
### Improvements
* Improve the total user experience. Make it very interactive
* Refactor the forms to make use of ReactiveForms
* Implement a client side library for the API
* Handle guards better to improve security
* Show hide menu items based on logged in status
