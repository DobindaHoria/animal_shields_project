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
  successMessage = ''

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
    return this.requestService.requestPost(`${environment.apiUrl}/users/forgot-password`, this.forgotPasswordModel, this.forgotPasswordBody, {}, () => {
      if (this.forgotPasswordModel.message === 'Procesul a fost executat cu succes' || this.forgotPasswordModel.message === 'Process completed successfully.') {
        this.successMessage = 'Vei primi în scurt timp un email pentru confirmare!'
        setTimeout(() => {
          window.location.href = window.location.origin + '/login'
        }, 3500)
      }
    })
  }

}
