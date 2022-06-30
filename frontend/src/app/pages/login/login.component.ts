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

  myselfModel: any = {
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
    return this.requestService.requestPost(`${environment.apiUrl}/users/login`, this.loginModel, this.loginBody, {}, () => {
      if (this.loginModel.message.token) {
        localStorage.setItem('accessToken', this.loginModel.message.token)
        this.onGetMyself(this.loginModel.message.token)
      }
    })
  }

  onGetMyself = (token: string) => {
    return this.requestService.requestGet(`${environment.apiUrl}/users/myself`, this.myselfModel, { "Authorization": `Bearer ${token}` }, () => {
      if (this.myselfModel.value.user) {
        localStorage.setItem('email', this.myselfModel.value.user.email)
        localStorage.setItem('name', this.myselfModel.value.user.name)
        localStorage.setItem('role', this.myselfModel.value.user.role)
        localStorage.setItem('myID', this.myselfModel.value.user._id)
        localStorage.setItem('languageCode', 'ro')
        if(this.myselfModel.value.user.role === 'admin') {
          window.location.href =  window.location.origin + '/admin-panel-dashboard'
        } else {
          window.location.href =  window.location.origin + '/dashboard'
        }
      }
    })
  }

}
