import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from '../../services/request.service';
import { LanguageService } from '../../services/language.service'

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

  constructor(public languageService: LanguageService, private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onValidateFields = () => {
    if (!this.forgotPasswordBody.email) {
      this.errorMessage = this.languageService.language.login.warningAllFields
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
        this.successMessage = this.languageService.language.login.confirmationMessage
        setTimeout(() => {
          window.location.href = window.location.origin + '/login'
        }, 3500)
      }
    })
  }

}
