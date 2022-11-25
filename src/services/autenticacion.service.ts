import {Usuario} from './../models/usuario.model';
import {UsuarioRepository} from './../repositories/usuario.repository';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');



@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(

    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */


  GenerarContrasena(){
    let contrasena = generador(8,false);
    return contrasena;
  }

  CifrarContrasena(contrasena:string){
    let contrasenaCifrada=cryptoJS.MD5(contrasena).toString();
    return contrasenaCifrada;
  }

  IdentificarUsuario(usuario: string, contrasena: string){
    try {
      let p = this.usuarioRepository.findOne({where:{correo: usuario, contrasena:contrasena}});
      if(p){
        return p;
      }
      return false;

    }catch{
      return false;
    }
  }
  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre
      }

    },
    Llaves.contrasenaJWT);
    return token;
  }
  validarTokenJWT(token:string){
    try{
      let datos= jwt.verify(token, Llaves.contrasenaJWT);
      return datos;

    }catch{
      return false;

    }

  }
}
