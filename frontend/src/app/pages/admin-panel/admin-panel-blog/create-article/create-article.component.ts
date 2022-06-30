import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService, BodyTypes } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  faCloud = faCloud

  token: any = ''
  language: any = ''

  createArticleModel: any = {
    message: "",
    error: "",
    value: null
  }

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  articleCreateBody: any = {
    published: false,
    sticky: false,
    text: [
      {
        language: 'ro',
        title: '',
        content: '',
        tags: []
      },
      {
        language: 'gb',
        title: '',
        content: '',
        tags: []
      }
    ]
  }

  arrayOfErrors: any = []

  thumbnail: any = { imageFile: undefined, imageSrc: undefined, inputModel: undefined };

  constructor(
    private location: Location,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    this.getAllSettings()
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

  onChangeTagsArray(indexOfText: any, tag: any) {
    let i = this.articleCreateBody.text[+indexOfText].tags.indexOf(tag);
    if (i < 0)
      this.articleCreateBody.text[+indexOfText].tags.push(tag);
    else
      this.articleCreateBody.text[+indexOfText].tags.splice(i, 1);
  }

  onNavigateBack() {
    window.location.href = `${environment.url}/admin-panel-dashboard/articles`
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  onCreateArticle() {
    let thumbnail = [this.thumbnail]
    this.articleCreateBody.sticky = this.articleCreateBody.sticky === 'true' ? true : false
    this.articleCreateBody.published = this.articleCreateBody.published === 'true' ? true : false

    if (thumbnail[0].imageSrc) {
      return this.requestService.requestPost(`${environment.apiUrl}/articles`, this.createArticleModel, this.articleCreateBody, { "Authorization": `Bearer ${this.token}` }, () => {
        if (this.createArticleModel.message === 'Procesul a fost executat cu succes' || this.createArticleModel.message === 'Process completed successfully.') {
          setTimeout(() => {
            this.onNavigateBack()
          }, 1500)
        }
      }, {
        bodyType: BodyTypes.FORMDATA, images: [{
          name: "images",
          file: thumbnail
        }]
      })
    } else {
      return this.requestService.requestPost(`${environment.apiUrl}/articles`, this.createArticleModel, this.articleCreateBody, { "Authorization": `Bearer ${this.token}` }, () => {
        if (this.createArticleModel.message === 'Procesul a fost executat cu succes' || this.createArticleModel.message === 'Process completed successfully.') {
          setTimeout(() => {
            this.onNavigateBack()
          }, 1500)
        }
      })
    }
  }
}
