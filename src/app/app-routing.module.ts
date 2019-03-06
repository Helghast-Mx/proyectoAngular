import { NgModule } from "@angular/core";
// el RouterModule le dira a angular si son las rutas principales o son las rutas hijas
import { Routes, RouterModule } from "@angular/router";

// rutas
import { MainComponent } from './components/main/main.component';
import { IndividualPostComponent } from './components/individual-post/individual-post.component';
import { EditarPostComponent } from './components/editar-post/editar-post.component';

// Modulo encargado de la especificacion de las rutas
// La idea de hacerlo mediante un modulo es para que el app.module.ts no quede tan cargado

const app_routes:Routes = [

    // si esta vacia la ruta se dirige al portafolio component
{path:'home',component:MainComponent},
{path:'pag/:id',component:IndividualPostComponent},
{path:'editar/:id',component:EditarPostComponent},
// cualquier otro path sera redireccionado al portafolio
{path:'**', pathMatch:'full', redirectTo:'home'},
];

@NgModule({
    // cuando trabajamos con modulos debemos importarlos
imports:[
    // trabajamos con .forRoot porque seran las rutas de la raiz
			// el hash lo utilizamos para decirle al navegador web que no precisamente tiene que buscar una carpeta en especifico o un archivo en especifico
    RouterModule.forRoot(app_routes, {useHash:true})
],
// tambien debemos exportar el RouterModule para poder trabajar afuera de este componente
exports:[
    RouterModule
]
})
export class AppRoutingModule {}

