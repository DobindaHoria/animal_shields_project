import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  selfSignUpModel: any = {
    value: [],
    message: "",
    error: "",
  }

  selfSignUpBody = {
    name: '',
    email: '',
    password: '',
    language: 'ro'
  }

  errorMessage = ''
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onValidateFields = () => {
    if (!this.selfSignUpBody.name || !this.selfSignUpBody.email || !this.selfSignUpBody.password) {
      this.errorMessage = 'Toate câmpurile trebuiesc completate!'
      return false
    } else {
      this.errorMessage = ''
      return true
    }
  }

  onSignUp = () => {
    if (!this.onValidateFields()) return
    return this.requestService.requestPost(`${environment.apiUrl}/users/register`, this.selfSignUpModel, this.selfSignUpBody, {}, () => {})
  }

}
