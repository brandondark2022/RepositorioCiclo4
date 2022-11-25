import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';


export class EstrategiaCliente implements AuthenticationStrategy{
  name: string='cliente';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService
    ){}

  async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if (token){
      let datos = this.servicioAutenticacion.validarTokenJWT(token)
      if(datos=='cliente'){
        let perfil:UserProfile=Object.assign({
          nombre: datos.data.rol
        });
        return perfil;
      }else{
        throw new HttpErrors[401]('El token estaba malo')
      }
    }
    else{
      throw new HttpErrors[401]('No se incluyó token')
    }
  }

  }
