import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService, BodyTypes } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

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

	settingsModel: any = {
		message: "",
		error: "",
		value: null
	}

	dogCreateBody: any = {
		name: '',
		birth_date: '',
		gender: '',
	}

	arrayOfErrors: any = []

	thumbnail: any = { imageFile: undefined, imageSrc: undefined, inputModel: undefined };

	constructor(private location: Location,
		private requestService: RequestService) { }

	ngOnInit(): void {
		if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
		if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
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
		if (!body.birth_date || !body.birth_date.length) {
			this.arrayOfErrors.push('Vă rugăm să introduceți o dată de naștere!')
		}
		if (!body.gender || !body.gender) {
			this.arrayOfErrors.push('Vă rugăm să introduceți sexul!')
		}

		if (this.arrayOfErrors.length) return false
		return true
	}

	onCreateDog() {
		let thumbnail = [this.thumbnail];
		if (!this.onValidateFields(this.dogCreateBody)) return

		return this.requestService.requestPost(`${environment.apiUrl}/dogs`, this.createDogModel, this.dogCreateBody, { "Authorization": `Bearer ${this.token}` }, () => {
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
	}
}
