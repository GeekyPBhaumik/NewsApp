import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  api_Key="e9f8c8edb11744cea57c7d1fde09b73e";
  constructor(private http:HttpClient) {}

  //get the sources method
  initialSources(){
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_Key)
  }

  //get the articles by id(source) method
  getArticlesById(source:String){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources='+ source + '&apiKey='+this.api_Key)
  }
  

  //get all the articles
  getArticles(){
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_Key)
  }
}
