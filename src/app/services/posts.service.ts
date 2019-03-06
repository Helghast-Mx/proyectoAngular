import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PostInterface } from '../interfaces/posts.interface'; 
import { AngularFirestore } from "@angular/fire/firestore";
import { FileItem } from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  cargada=false;
  queryBase:string = "https://blog-d3d59.firebaseio.com/post.json";
  postUrl:string = "https://blog-d3d59.firebaseio.com/post"
 
  private CARPETA_IMAGENES= 'img';

  constructor(public _http:HttpClient,
              public _db:AngularFirestore) 
  {
  }

  cargarImagenesFirebase ( imagenes:FileItem[] ){
    console.log(imagenes);

  }

  private guardarImagen (imagen: {nombre:string, url:string} ){
    this._db.collection(`/${this.CARPETA_IMAGENES}`)
    .add(imagen)
  }

  guardarPost(post:PostInterface){
    let body = JSON.stringify(post);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.post(this.queryBase, body, httpOptions); 
  }

  actualizarPost(post:PostInterface, key$:string){
    let body = JSON.stringify(post);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = `${this.postUrl}/${ key$ }.json`
    return this._http.put(url, body, httpOptions); 
  }



  getPost(key$:string){
    let url = `${this.postUrl}/${key$}.json`
    return this._http.get(url); 
      // console.log(`${resp}desde el servicio`);
   
  } 

  getPostMain(){
    
    return this._http.get(this.queryBase); 
      // console.log(`${resp}desde el servicio`);
   
  } 
}
