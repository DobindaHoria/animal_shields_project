import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  token: any = ''
  language: any = ''

  createUserModel: any = {
    message: "",
    error: "",
    value: null
  }

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  userCreateBody: any = {
    name: '',
    email: '',
    password: '',
    language: '',
    role: '',
  }

  arrayOfErrors: any = []

  constructor(
    private location: Location,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    this.getAllSettings()
  }

  onNavigateBack() {
    window.location.href = `${environment.url}/admin-panel-dashboard/users-list`
  }

  onValidateFields(body: any) {
    this.arrayOfErrors = []
    if (!body.name || !body.email || !body.password || !body.language || !body.role) {
      this.arrayOfErrors.push('Vă rugăm să completați toate cămpurile!')
    }
    if (body.email) {
      let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!body.email.match(emailFormat)) {
        this.arrayOfErrors.push('Vă rugăm să introduceți o adresă de email validă!')
      }
    }
    if (body.name && body.name.length < 5) {
      this.arrayOfErrors.push('Vă rugăm să introduceți o parolă de minim 6 caractere!')
    }
    if (body.password && body.password.length < 5) {
      this.arrayOfErrors.push('Vă rugăm să introduceți un nume format din minim 5 caractere!')
    }
  
    if (this.arrayOfErrors.length) return false
    return true
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  onCreateUser() {
    if(!this.onValidateFields(this.userCreateBody)) return
    return this.requestService.requestPost(`${environment.apiUrl}/users/register`, this.createUserModel, this.userCreateBody, { "Authorization": `Bearer ${this.token}` }, () => {
      if(this.createUserModel.message === 'Procesul a fost executat cu succes' || this.createUserModel.message === 'Process completed successfully.') {
        setTimeout(()=> {
          this.onNavigateBack()
        }, 1500)
      }
    })
  }
}
