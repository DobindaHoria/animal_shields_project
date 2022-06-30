import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  token: any = ''

  articlesModel: any = {
    value: [],
    message: "",
    error: "",
  }

  filteredArticles: any = []

  deleteArticleModel: any = {
    value: [],
    message: "",
    error: ""
  }


  selectedLanguage: any
  selectedArticleID: any = ''

  filterArticle: any = ''

  constructor(private requestService: RequestService, private router: Router, private location: Location,) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    if(localStorage.getItem('languageCode')) this.selectedLanguage = localStorage.getItem('languageCode')
    this.getAllArticles()
  }

  buildPicturePath(url: any) {
    let newUrl =url.slice(7)
    return `${environment.imageBaseUrl}/${newUrl}`
  }

  onFilterArticles() {
    this.filteredArticles = [...this.articlesModel.value.articles].filter(article => (article.texts[0].title.toLowerCase()).includes(this.filterArticle.toLowerCase()) && article.published)
  }

  getAllArticles() {
    return this.requestService.requestGet(`${environment.apiUrl}/articles?language=${this.selectedLanguage}`, this.articlesModel, {}, ()=> {
      this.filteredArticles = [...this.articlesModel.value.articles].filter(article => article.published && article.texts.length)
    })
  }

  getTitle(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.selectedLanguage)
    return selectedText.title || '-'
  }

  getContent(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.selectedLanguage)
    return selectedText.content || '-'
  }

  getTags(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.selectedLanguage)
    return selectedText.tags || []
  }

  
  NavigateToArticle(articleID: string) {
    this.router.navigateByUrl(`/blog/` + `${articleID}-${this.selectedLanguage}`);
  }

}
