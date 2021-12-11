import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordModel: any = {
    value: [],
    message: "",
    error: "",
  }

  forgotPasswordBody = {
      email: '',
  }

  errorMessage = ''
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onValidateFields = () => {
    if (!this.forgotPasswordBody.email) {
      this.errorMessage = 'Toate câmpurile trebuiesc completate!'
      return false
    } else {
      this.errorMessage = ''
      return true
    }
  }

  onForgotPassword = () => {
    if (!this.onValidateFields()) return
    return this.requestService.requestPost(`${environment.apiUrl}/users/forgot-password`, this.forgotPasswordModel, this.forgotPasswordBody, () => {})
  }

}
