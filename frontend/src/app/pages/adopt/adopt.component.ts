import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService } from '../../services/request.service'
import { environment } from '../../../../src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.scss']
})
export class AdoptComponent implements OnInit {

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
  selectedDog: any = ''

  filtersDog: any = {
    gender: '',
    name: ''
  }

  filteredDogsArray: any = []

  constructor(private location: Location, private requestService: RequestService) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    if (localStorage.getItem('role')) this.role = localStorage.getItem('role')
    this.getAllSettings()
    this.getAllDogs()
  }


  onChangeGenderFilter(event: any) {
    this.filtersDog.gender = event.target.value || ''
    this.onFilterDogs()
  }

  onFilterDogs() {
    let tempArrayOfDogs = [...this.dogsModel.value.dogs]
    
    if (this.filtersDog.name) {
      tempArrayOfDogs = tempArrayOfDogs.filter(dog => (dog.name || '').toLowerCase().includes(this.filtersDog.name.toLowerCase()))
    }
    if (this.filtersDog.gender) {
    console.log('this.filtersDog.gender', this.filtersDog.gender);

      tempArrayOfDogs = tempArrayOfDogs.filter(dog => dog.gender && dog.gender.toLowerCase().includes(this.filtersDog.gender.toLowerCase()))
    }
    this.filteredDogsArray = tempArrayOfDogs
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
    return this.requestService.requestGet(`${environment.apiUrl}/dogs`, this.dogsModel, { "Authorization": `Bearer ${this.token}` }, () => {
      this.filteredDogsArray = this.dogsModel.value.dogs
    })
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
