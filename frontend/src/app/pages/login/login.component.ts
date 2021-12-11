import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: any = {
    value: [],
    message: "",
    error: "",
  }

  loginBody = {
      email: '',
      password: '',
  }

  errorMessage = ''
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onValidateFields = () => {
    if (!this.loginBody.email || !this.loginBody.password) {
      this.errorMessage = 'Toate câmpurile trebuiesc completate!'
      return false
    } else {
      this.errorMessage = ''
      return true
    }
  }

  onLogin = () => {
    if (!this.onValidateFields()) return
    return this.requestService.requestPost(`${environment.apiUrl}/users/login`, this.loginModel, this.loginBody, {}, () => {})
  }

}
