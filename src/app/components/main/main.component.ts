import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { PostInterface } from '../../interfaces/posts.interface';
import { IndService } from '../../services/ind.service';
import { ImgInterace } from '../../interfaces/imgs.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent  {

  post:any [] = []
  imagen:any = {};
  fecha:number = new Date().getFullYear();
  cargada = false;

  constructor( public _post : PostsService,
              public _img :IndService) { 
    
                
                setTimeout(() => {
                  this._post.getPostMain()
                  .subscribe ( (data:any) =>{
              
                    console.log(data);
                    this.post = data;
                  })
              
                  this.cargada = true;
                  
                }, 1500);
                this._img.getImagen()
                .subscribe ((data:any) =>{
                  // console.log(data);
                  this.imagen = data;
                })
  }

  // ngOnInit() {
  // }

}
