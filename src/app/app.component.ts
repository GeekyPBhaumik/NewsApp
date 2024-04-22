import { AfterViewInit, ChangeDetectorRef, Component,OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NewsserviceService } from './service/newsservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit,OnInit {
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  public sources:any=[];
  public articles:any=[];
  public selectedNewsChannel:string = 'Top 10 Trending News!';
  title = 'NewsApp';
//here, we are using @ViewChild to access the template variable in app.component.html
//@ViewChild is basically used to access any child component 
//because we have used a template-variable in a div inside the html file
//So the html file itself is a parent and any element inside it is a child
//Even anything outside the html from any other component, we are going to use in this html
//will be a child
//whenever we are implementing an AfterViewInit interface
//we need to use @ViewChild decorator to use the template reference variable inside the html
  constructor(private observer: BreakpointObserver,private cdr: ChangeDetectorRef, private newsApi: NewsserviceService){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.newsApi.getArticles()
    .subscribe((res:any)=>{
      this.articles = res.articles;
    })
    this.newsApi.initialSources()
    .subscribe((res:any)=>{
      this.sources = res.sources;
    })
  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    this.sideNav.opened=true;
    this.observer.observe(['(max-width:787px)'])
    .subscribe((res)=>{
         if(res?.matches){
          this.sideNav.mode="over";
          this.sideNav.close();
         }else{
          this.sideNav.mode="side";
          this.sideNav.open();
         }
    })
    this.cdr.detectChanges();
  }
getArticlesBySourceId(source:any){
  this.newsApi.getArticlesById(source.id)
  .subscribe((res:any)=>{    
    this.articles=res.articles;
    this.selectedNewsChannel=source.name;
  })
}

}
