import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestService, BodyTypes } from '../../../../services/request.service'
import { environment } from '../../../../../../src/environments/environment';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  faCloud = faCloud

  token: any = ''
  language: any = ''

  updateArticleModel: any = {
    message: "",
    error: "",
    value: null
  }

  settingsModel: any = {
    message: "",
    error: "",
    value: null
  }

  articleByIDModel: any = {
    message: "",
    error: "",
    value: null
  }

  articleUpdateBody: any = {
    published: false,
    sticky: false,
    text: []
  }

  arrayOfErrors: any = []

  thumbnail: any = { imageFile: undefined, imageSrc: undefined, inputModel: undefined };

  articleID: any
  constructor(
    private location: Location,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    if (window.location.href.split('/')[5]) this.articleID = window.location.href.split('/')[5]
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if (localStorage.getItem('languageCode')) this.language = localStorage.getItem('languageCode')
    this.getAllSettings()
    this.getArticleById()
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
    let i = this.articleUpdateBody.text[+indexOfText].tags.indexOf(tag);
    if (i < 0)
      this.articleUpdateBody.text[+indexOfText].tags.push(tag);
    else
      this.articleUpdateBody.text[+indexOfText].tags.splice(i, 1);
  }

  onNavigateBack() {
    window.location.href = `${environment.url}/admin-panel-dashboard/articles`
  }

  getAllSettings() {
    return this.requestService.requestGet(`${environment.apiUrl}/settings`, this.settingsModel, { "Authorization": `Bearer ${this.token}` })
  }

  getArticleById() {
    return this.requestService.requestGet(`${environment.apiUrl}/articles/${this.articleID}`, this.articleByIDModel, { "Authorization": `Bearer ${this.token}` }, ()=> {
      if(this.articleByIDModel.value.article) {
		if(this.articleByIDModel.value.article.feature_image){
			this.thumbnail.imageSrc = environment.imageBaseUrl + this.articleByIDModel.value.article.feature_image;
		  }
      
        this.articleUpdateBody = {
          published: this.articleByIDModel.value.article.published,
          sticky: this.articleByIDModel.value.article.sticky,
          text: [
            {
              language: 'ro',
              title: this.onGetTitle('ro', this.articleByIDModel.value.article.texts),
              content: this.onGetContent('ro', this.articleByIDModel.value.article.texts),
              tags: this.onGetTags('ro', this.articleByIDModel.value.article.texts),
            },
            {
              language: 'gb',
              title: this.onGetTitle('gb', this.articleByIDModel.value.article.texts),
              content: this.onGetContent('gb', this.articleByIDModel.value.article.texts),
              tags: this.onGetTags('gb', this.articleByIDModel.value.article.texts),
            }
          ]
        }

      }
    })
  }

  onGetTitle(language:any, texts:any) {
    if(!language || !texts?.length) return ''
    const indexOfText = texts.findIndex((text: { language: any; }) => text.language === language)
    if(indexOfText === -1) return ''
    else return texts[indexOfText].title
  }

  onGetContent(language:any, texts:any) {
    if(!language || !texts?.length) return ''
    const indexOfText = texts.findIndex((text: { language: any; }) => text.language === language)
    if(indexOfText === -1) return ''
    else return texts[indexOfText].content
  }

  onGetTags(language:any, texts:any) {
    if(!language || !texts?.length) return []
    const indexOfText = texts.findIndex((text: { language: any; }) => text.language === language)
    if(indexOfText === -1) return []
    else return texts[indexOfText].tags
  }

  onUpdateArticle() {
    let thumbnail = [this.thumbnail]
    this.articleUpdateBody.sticky = (this.articleUpdateBody.sticky === 'true' || this.articleUpdateBody.sticky === true) ? true : false
    this.articleUpdateBody.published = (this.articleUpdateBody.published === 'true' || this.articleUpdateBody.published === true) ? true : false

    
    let text = this.articleUpdateBody.text.filter((item: { content: any; tags: string | any[]; title: any; }) => item.content && item.tags.length && item.title)

    let updateBody = {
      ...this.articleUpdateBody,
      text: text
    }

    console.log('updateBody', updateBody);
    
    if (thumbnail[0].imageSrc) {
      return this.requestService.requestPut(`${environment.apiUrl}/articles/${this.articleID}?language=${this.language}`, this.updateArticleModel, updateBody, { "Authorization": `Bearer ${this.token}` }, () => {
        if (this.updateArticleModel.message === 'Procesul a fost executat cu succes' || this.updateArticleModel.message === 'Process completed successfully.') {
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
      return this.requestService.requestPut(`${environment.apiUrl}/articles/${this.articleID}?language=${this.language}`, this.updateArticleModel, updateBody, { "Authorization": `Bearer ${this.token}` }, () => {
        if (this.updateArticleModel.message === 'Procesul a fost executat cu succes' || this.updateArticleModel.message === 'Process completed successfully.') {
          setTimeout(() => {
            this.onNavigateBack()
          }, 1500)
        }
      })
    }
  }

}
