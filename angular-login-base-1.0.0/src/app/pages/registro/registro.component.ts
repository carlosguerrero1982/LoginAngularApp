import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  recordarme = false;
  usuario:UsuarioModel;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() { 
    this.usuario=new UsuarioModel();

    
  }

  onSubmit(formulario:NgForm){

   if(formulario.invalid){

      return;
    }

    this.auth.register(this.usuario).
    subscribe((data)=>{

      if(this.recordarme===true){

        localStorage.setItem('email',this.usuario.email);
       }

      this.router.navigateByUrl('/home');
      console.log(data);
    },(error)=>{

      console.log(error.error.error.message);
 
    })
  }

}
