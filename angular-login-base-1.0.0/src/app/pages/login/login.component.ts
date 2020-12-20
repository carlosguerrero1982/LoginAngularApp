import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  usuario:UsuarioModel;
  recordarme = false;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {

    this.usuario= new UsuarioModel();

    if(localStorage.getItem('email')){

      this.usuario.email=localStorage.getItem('email');
      this.recordarme=true;
     }

   
  }

  login(formulario:NgForm){

    if(formulario.invalid){

      return;
    }

   if(this.recordarme===true){

    localStorage.setItem('email',this.usuario.email);
   }

    this.auth.login(this.usuario)
    .subscribe((data)=>{

      this.router.navigateByUrl('/home');
      console.log(data);
    },(error)=>{

      console.log(error.error.error.message);
      
    })
  }
}
