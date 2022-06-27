import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService, BodyTypes } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-dogs-details',
  templateUrl: './dogs-details.component.html',
  styleUrls: ['./dogs-details.component.scss']
})
export class DogsDetailsComponent implements OnInit {
  faCloud = faCloud

  token: any = ''
  language: any = ''

  updateDogModel: any = {
    message: "",
    error: "",
    value: null
  }

  dogByIDModel: any = {
    message: "",
    error: "",
    value: null
  }

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  dogUpdateBody: any = {
    name: '',
    birth_date: '',
    gender: '',
  }

  arrayOfErrors: any = []

  thumbnail: any = { imageFile: undefined, imageSrc: undefined, inputModel: undefined };

  dogID: any
  constructor(private location: Location, private requestService: RequestService, config: NgbDatepickerConfig) {
    config.minDate = { year: 1900, month: 1, day: 1 };
    config.maxDate = { year: 2099, month: 12, day: 31 };
  }

  ngOnInit(): void {
    if (window.location.href.split('/')[5]) this.dogID = window.location.href.split('/')[5]
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    this.getDogByID()
  }

  SetFile($ev: any) {
    if ($ev === null) {
      this.thumbnail = { imageFile: undefined, imageSrc: undefined, inputModel: undefined }; return;
    }
    if ($ev.target.files.length === 0) return; this.thumbnail.imageFile = $ev.target.files[0];
    const reader = new FileReader(); reader.onload = e => this.thumbnail.imageSrc = reader.result + ""; reader.readAsDataURL(this.thumbnail.imageFile);
  }

  DeleteFile() {
    this.thumbnail = { imageFile: null, imageSrc: null, inputModel: null };
  }


  getImg() {
    return this.thumbnail.imageSrc
  }

  onNavigateBack() {
    this.location.back();
  }

  onValidateFields(body: any) {
    this.arrayOfErrors = []
    if (!body.name || !body.name.length) {
      this.arrayOfErrors.push('Vă rugăm să introduceți un nume!')
    }
    if (!body.birth_date || !body.birth_date.year) {
      this.arrayOfErrors.push('Vă rugăm să introduceți o dată de naștere!')
    }
    if (!body.gender || !body.gender) {
      this.arrayOfErrors.push('Vă rugăm să introduceți sexul!')
    }

    if (this.arrayOfErrors.length) return false
    return true
  }

  makeItLegit(nr: number) {
    if (nr <= 9) return `0${nr}`
    else return nr
  }

  makeItLegitTwo(str: string) {
    if (!str) return
    if (str[0] === '0') return +str[1]
    else return +str
  }

  getDogByID() {
    return this.requestService.requestGet(`${environment.apiUrl}/dogs/${this.dogID}`, this.dogByIDModel, { "Authorization": `Bearer ${this.token}` }, () => {
      if (this.dogByIDModel.value.dog) {
        const formatedDate = moment(this.dogByIDModel.value.dog.birth_date).format('YYYY-MM-DD')
        this.dogUpdateBody = {
          name: this.dogByIDModel.value.dog.name,
          gender: this.dogByIDModel.value.dog.gender,
          birth_date: {
            year: this.makeItLegitTwo(formatedDate.split('-')[0]),
            month: this.makeItLegitTwo(formatedDate.split('-')[1]),
            day: this.makeItLegitTwo(formatedDate.split('-')[2]),
          }
        }
      }
    })
  }

  onCreateDog() {
    let thumbnail = [this.thumbnail];

    if (!this.onValidateFields(this.dogUpdateBody)) return

    let updateBody = {
      ...this.dogUpdateBody,
      birth_date: this.dogUpdateBody.birth_date.year + '-' + this.makeItLegit(this.dogUpdateBody.birth_date.month) + '-' + this.makeItLegit(this.dogUpdateBody.birth_date.day)
    }

    if (thumbnail[0].imageSrc) {
      return this.requestService.requestPost(`${environment.apiUrl}/dogs`, this.updateDogModel, updateBody, { "Authorization": `Bearer ${this.token}` }, () => {
        if (this.updateDogModel.message === 'Procesul a fost executat cu succes' || this.updateDogModel.message === 'Process completed successfully.') {
          setTimeout(() => {
            this.onNavigateBack()
          }, 1500)
        }
      },
        {
          bodyType: BodyTypes.FORMDATA, images: [{
            name: "images",
            file: thumbnail
          }]
        })
    } else {
      return this.requestService.requestPost(`${environment.apiUrl}/dogs`, this.updateDogModel, updateBody, { "Authorization": `Bearer ${this.token}` }, () => {
        if (this.updateDogModel.message === 'Procesul a fost executat cu succes' || this.updateDogModel.message === 'Process completed successfully.') {
          setTimeout(() => {
            this.onNavigateBack()
          }, 1500)
        }
      })
    }
  }
}
