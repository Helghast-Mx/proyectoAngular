import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IndService } from '../../services/ind.service';
import { IndivInter } from '../../interfaces/indiv.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-individual-post',
  templateUrl: './individual-post.component.html',
  styles: []
})
export class IndividualPostComponent implements OnInit {
  
info:IndivInter = {};
key$:string = "";
cargada = false;
  constructor(private route : ActivatedRoute,
              public _IndPost:IndService,
              public _ind:PostsService ) { }

  ngOnInit() {
  
    this.route.params
    .subscribe(parametros=>{
      // console.log(parametros['id']);
      this.key$ = parametros['id'];
      console.log(this.key$);
      this._IndPost.getIndividual(parametros['id'])
      .subscribe((postIndi:IndivInter)=>{
        console.log(postIndi);
        this.info= postIndi;
      })
    })
    
    this.cargada = true;
  
  }


}
