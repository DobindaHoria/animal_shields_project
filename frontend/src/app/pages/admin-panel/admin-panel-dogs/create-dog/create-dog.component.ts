import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService, BodyTypes } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-create-dog',
	templateUrl: './create-dog.component.html',
	styleUrls: ['./create-dog.component.scss']
})
export class CreateDogComponent implements OnInit {
	faCloud = faCloud

	token: any = ''
	language: any = ''

	createDogModel: any = {
		message: "",
		error: "",
		value: null
	}

	dogSizesModel: any = {
		message: "",
		error: "",
		value: null
	}

	settingsModel: any = {
		message: "",
		error: "",
		value: null
	}

	dogCreateBody: any = {
		name: '',
		birth_date: '',
		gender: '',
		size: '',
	}

	arrayOfErrors: any = []

	thumbnail: any = { imageFile: undefined, imageSrc: undefined, inputModel: undefined };

	constructor(private location: Location, private requestService: RequestService, config: NgbDatepickerConfig) {
		config.minDate = { year: 1990, month: 1, day: 1 };
		config.maxDate = { year: 2022, month: 12, day: 31 };
	}

	ngOnInit(): void {
		if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
		if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
		this.onGetDogsSizes()
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
		if (!body.size || !body.size) {
			this.arrayOfErrors.push('Vă rugăm să introduceți talia!')
		}

		if (this.arrayOfErrors.length) return false
		return true
	}

	makeItLegit(nr: number) {
		if(nr<=9) return `0${nr}`
		else return nr
	}

	onGetDogsSizes() {
		return this.requestService.requestGet(`${environment.apiUrl}/settings/sizes`, this.dogSizesModel, { "Authorization": `Bearer ${this.token}` }, () => {})
	}

	onCreateDog() {
		let thumbnail = [this.thumbnail];
	
		if (!this.onValidateFields(this.dogCreateBody)) return
		
		let createBody = {
			...this.dogCreateBody,
			birth_date: this.dogCreateBody.birth_date.year + '-' + this.makeItLegit(this.dogCreateBody.birth_date.month) + '-' + this.makeItLegit(this.dogCreateBody.birth_date.day),
			language: this.language || 'ro'
		}
		
		if (thumbnail[0].imageSrc) {
			return this.requestService.requestPost(`${environment.apiUrl}/dogs?language=${this.language}`, this.createDogModel, createBody, { "Authorization": `Bearer ${this.token}` }, () => {
				if (this.createDogModel.message === 'Procesul a fost executat cu succes' || this.createDogModel.message === 'Process completed successfully.') {
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
			return this.requestService.requestPost(`${environment.apiUrl}/dogs?language=${this.language}`, this.createDogModel, createBody, { "Authorization": `Bearer ${this.token}` }, () => {
				if (this.createDogModel.message === 'Procesul a fost executat cu succes' || this.createDogModel.message === 'Process completed successfully.') {
					setTimeout(() => {
						this.onNavigateBack()
					}, 1500)
				}
			})
		}
	}
}
