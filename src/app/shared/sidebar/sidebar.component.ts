import { Component} from '@angular/core';

import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{

  constructor(private gifsService:GifsService) { }

  get historial(){
    return this.gifsService.historial;
    console.log(this.gifsService.historial)
  }

  buscar(busqueda:string){
    this.gifsService.buscarGifs(busqueda);
  }

}
