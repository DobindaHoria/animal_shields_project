import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  token: any = ''
  userID: any = ''

  updateUserModel: any = {
    message: "",
    error: "",
    value: null
  }

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  userByIDModel: any = {
    message: "",
    error: "",
    value: null
  }

  userUpdateBody: any = {
    name: '',
    email: '',
  }

  arrayOfErrors: any = []

  constructor(
    private location: Location,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    if (window.location.href.split('/')[5]) this.userID = window.location.href.split('/')[5]
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    this.getAllSettings()
    this.getUserById()
  }

  onNavigateBack() {
    this.location.back();
  }

  onValidateFields(body: any) {
    this.arrayOfErrors = []
    if (!body.name || !body.role) {
      this.arrayOfErrors.push('Vă rugăm să completați toate cămpurile!')
    }
    if (body.name && body.name.length < 5) {
      this.arrayOfErrors.push('Vă rugăm să introduceți o parolă de minim 6 caractere!')
    }
    if (this.arrayOfErrors.length) return false
    return true
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  getUserById() {
    return this.requestService.requestGet(`${environment.apiUrl}/users/${this.userID}`, this.userByIDModel, { "Authorization": `Bearer ${this.token}` }, ()=> {
      if(this.userByIDModel.value.user) {
        this.userUpdateBody = {
          name: this.userByIDModel.value.user.name,
          role: this.userByIDModel.value.user.role,
        }
      }
    })
  }

  onUpdateUser() {
    if (!this.onValidateFields(this.userUpdateBody)) return
    return this.requestService.requestPut(`${environment.apiUrl}/users/${this.userID}`, this.updateUserModel, this.userUpdateBody, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.updateUserModel.message === 'Procesul a fost executat cu succes' || this.updateUserModel.message === 'Process completed successfully.') {
        setTimeout(() => {
          this.onNavigateBack()
        }, 2500)
      }
    })
  }

}
