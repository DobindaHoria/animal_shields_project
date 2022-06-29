import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.scss']
})
export class DogsListComponent implements OnInit {

  token: any = ''
  language: any = ''
  role: any = ''

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  dogsModel: any = {
    message: "",
    error: "",
    value: null
  }

  userByIDModel: any = {
    message: "",
    error: "",
    value: null
  }

  deleteDogModel: any = {
    message: "",
    error: "",
    value: null
  }

  selectedDogID: any = ''

  constructor(private location: Location, private requestService: RequestService) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    if (localStorage.getItem('role')) this.role = localStorage.getItem('role')
    this.getAllSettings()
    this.getAllDogs()
  }

  buildPicturePath(url: any) {
    let newUrl =url.slice(7)
    return `${environment.imageBaseUrl}/${newUrl}`
  }

  onNavigateBack() {
    this.location.back();
  }

  onNavigateToModifyPage(dogID: any) {
    window.location.href = window.location.origin + '/admin-panel-dashboard/update-dog/' + dogID
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  getAllDogs() {
    return this.requestService.requestGet(`${environment.apiUrl}/dogs`, this.dogsModel, { "Authorization": `Bearer ${this.token}` })
  }

  getUserById(userID: string) {
    if (!userID) return
    return this.requestService.requestGet(`${environment.apiUrl}/users/${userID}?language=${this.language || 'ro'}`, this.userByIDModel, { "Authorization": `Bearer ${this.token}` })
  }

  onDeleteDog() {
    if (!this.selectedDogID) return
    return this.requestService.requestDelete(`${environment.apiUrl}/dogs/${this.selectedDogID}`, this.deleteDogModel, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.deleteDogModel.message === 'Procesul a fost executat cu succes' || this.deleteDogModel.message === 'Process completed successfully.') {
        this.selectedDogID = ''
        setTimeout(() => {
          $('#deleteDogModal').modal('hide');
          this.getAllDogs()
          this.deleteDogModel.message = ''
        }, 1500)
      }
    })
  }

}
