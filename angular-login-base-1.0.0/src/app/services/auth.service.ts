import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url= "https://identitytoolkit.googleapis.com/v1/accounts";

  private api_key="AIzaSyBd1v1VB7U5Mc_3y4ZGE56XlvuzbHQMuxQ";
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

 // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

 tokenUser:string;

  constructor(private http:HttpClient) { 
    this.leerToken();
  }

  logout(){

    localStorage.removeItem('token');

  }


  login(usuario:UsuarioModel){

    const authData= {
      ...usuario,
      returnSecureToken:true

    };

    return this.http.post(`${this.url}:signInWithPassword?key=${this.api_key}`,
    authData
    ).pipe(
      map(resp=>{
        
        this.guardarToken(resp['idToken']);
      return resp;
      })
    );


  }

  register(usuario:UsuarioModel){

    const authData= {
      ...usuario,
      returnSecureToken:true

    };

    return this.http.post(`${this.url}:signUp?key=${this.api_key}`,
    authData
    ).pipe(
      map(resp=>{
        
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  private guardarToken(token:string){

    this.tokenUser=token;

    localStorage.setItem('token',token);

    let hoy = new Date();

    hoy.setSeconds(3600);

    localStorage.setItem('expira',hoy.getTime().toString());

  }

  private leerToken(){

    if(localStorage.getItem('token')){

      this.tokenUser=localStorage.getItem('token');

    }else{

      this.tokenUser='';
    }

    return this.tokenUser;

  }

  estaAuth():boolean{

    if(this.tokenUser.length<2){

      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    
    const hoy = new Date();

    hoy.setTime(expira);


    if(hoy>new Date()){

      return true;
    }else{

      return false;
    }
     
  }

}
