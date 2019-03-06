import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IndService {

  queryBase:string = "https://blog-d3d59.firebaseio.com/post";
  queryImg:string = "https://blog-d3d59.firebaseio.com/principal/"
  constructor(public http:HttpClient) {
    
   }

  getIndividual (id:string){
     return this.http.get(`${this.queryBase}/${ id }.json`);
     
   }

   getImagen (){
     return this.http.get(`${this.queryImg}.json`)
   }

}
