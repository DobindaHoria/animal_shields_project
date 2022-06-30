import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RequestService } from '../../services/request.service';
import { LanguageService } from '../../services/language.service'

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
    language: 'ro',
    role: 'regular'
  }

  errorMessage = ''
  successMessage = ''

  constructor(public languageService: LanguageService, private requestService: RequestService) { }

  ngOnInit(): void {
  }

  onValidateFields = () => {
    if (!this.selfSignUpBody.name || !this.selfSignUpBody.email || !this.selfSignUpBody.password) {
      this.errorMessage = this.languageService.language.login.warningAllFields
      return false
    } else {
      this.errorMessage = ''
      return true
    }
  }

  onSignUp = () => {
    if (!this.onValidateFields()) return
    return this.requestService.requestPost(`${environment.apiUrl}/users/register`, this.selfSignUpModel, this.selfSignUpBody, {}, () => {
      if (this.selfSignUpModel.message === 'Procesul a fost executat cu succes' || this.selfSignUpModel.message === 'Process completed successfully.') {
        this.successMessage = this.languageService.language.login.confirmationMessage
        setTimeout(() => {
          window.location.href = window.location.origin + '/login'
        }, 3500)
      }
    })
  }

}
