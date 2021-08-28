import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey     : string = 'kDJdowLX3UGiVXDLlUJ7MWUIW4AeEBpS';
  private _historial : string[] = [];
  
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //una forma de mostrar algo guardado en el local storage
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }

    //otra forma de mostrar algo guardado en el local storage
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
   }

  buscarGifs(busqueda: string) {
    /* valido que no tenga espacio con el trim y
     paso todo a minuscula */
    busqueda = busqueda.trim().toLocaleLowerCase();

    // valido que el array no tenga la busqueda guardada
    if (!this._historial.includes(busqueda)) {
      this._historial.unshift(busqueda);

      //guardo el historial de busqueda en el local storage para que me los muestre nuevamente luego de refrescar la pagina
      localStorage.setItem('historial',JSON.stringify(this._historial));

      // limito el array a 5
      if (this._historial.length > 5)
        this._historial.pop();
    }


    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q', busqueda)
    .set('limit',10);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        //guardo el historial de resultados en el local storage para que me los muestre nuevamente luego de refrescar la pagina   
        localStorage.setItem('resultados',JSON.stringify(this.resultados));     
      });
  }
}
