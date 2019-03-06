import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {
    let keysArreglo = [];
      // value es el objeto que viene de firebase
    for(let key in value){

      // la informacion sera un arreglo de llaves
      keysArreglo.push(key);

    }

    return keysArreglo;
  }

}
