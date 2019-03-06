import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PostInterface } from '../../interfaces/posts.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { FileItem } from '../../models/file-item';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-post',
  templateUrl: './editar-post.component.html',
  styles: []
})
export class EditarPostComponent implements OnInit {

  post: PostInterface = {
    titulo:"",
    subtitulo:"",
    texto:"",
    imagen:"",
    fecha: new Date()
  }

  archivos:FileItem [] = []

  fecha = new Date();


  nuevo:boolean=false;
  id:string;

  urlImagen: Observable<string>;
  uploadPercent:Observable<number>;
  constructor(private _post : PostsService,
              private router : Router,
              private activade : ActivatedRoute,
              private storage : AngularFireStorage
              ) { 

                this.activade.params.subscribe(parametros =>{
                  console.log(parametros);
                  this.id = parametros['id'];
                  if(this.id!=="nuevo"){
                    this._post.getPost(this.id)
                    .subscribe((data:any)=>{
                      this.post = data
                    })
                  }
                })

              }
  @ViewChild('imageUser') inputImageUser: ElementRef

  ngOnInit() {
  }

  // evento change, se sube la imagen a firebase
  onUpload(e){
    console.log('subir', e.target.files[0]);
    const file = e.target.files[0];
    const nombreImagen= e.target.files[0].name;
    console.log(nombreImagen);
    const filePath = `upload/${nombreImagen}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file); 
    this.uploadPercent = task.percentageChanges();


    task.snapshotChanges().pipe( finalize(() => this.urlImagen = ref.getDownloadURL()
    ))
    .subscribe();
    
    setTimeout(() => {
      this.post.imagen = this.inputImageUser.nativeElement.value
      console.log(this.post.imagen);
    }, 2000);

  }


  guardar(){

    this.post.fecha = this.fecha;
   if(this.id=="nuevo"){
    //  Insertando nuevo post
    this._post.guardarPost(this.post)
      .subscribe(data=>{
        console.log(data);
        this.id=data['name'];
        this.router.navigate(['/editar', this.id]);
      }, error =>console.log(error));

   
   }
   else
   {
     this._post.actualizarPost(this.post, this.id)
     .subscribe ( data =>{
       console.log(data);
     })

   }
  }

  agregarPost(forma:NgForm){
    this.router.navigate(['/editar', 'nuevo']);
  }
}
