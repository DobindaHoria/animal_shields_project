import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  token: any = ''
  articleID: any = ''

  articleByIDModel: any = {
    value: [],
    message: "",
    error: "",
  }

  constructor(private location: Location, private route: ActivatedRoute, private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    if (window.location.href.split('/')[4]) this.articleID = window.location.href.split('/')[4]
    if (localStorage.getItem('accessToken')) this.token = localStorage.getItem('accessToken')
    this.getArticleById()
  }

  getTitle(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.articleID.split('-')[1])
    return selectedText.title || '-'
  }

  getContent(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.articleID.split('-')[1])
    return selectedText.content || '-'
  }

  getTags(article: any) {
    if (!article.texts.length) return '-'
    const selectedText = article.texts.find((text: { language: string; }) => text.language === this.articleID.split('-')[1])
    return selectedText.tags || []
  }

  getArticleById() {
    return this.requestService.requestGet(`${environment.apiUrl}/articles/${this.articleID.split('-')[0]}`, this.articleByIDModel, { "Authorization": `Bearer ${this.token}` });
  }

  backClicked() {
    this.location.back();
  }

}
