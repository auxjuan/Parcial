import {IRepositorioUsuario} from "../../dominio/puertos/repositorios/IRepositorioUsuario";
import {IEncriptador} from "../../dominio/puertos/servicios/IEncriptador";
import { Usuario } from "../../entidades/Usuario";
import Rol from "../../dominio/enum/Rol";
import {ErrorApp} from "../../compartido/errores/ErrorApp";


export interface IservicioToken {
generarToken(payload: object): string;
verificarToken(token:string):object |null;


}

export class ServicioAuth{
constructor (
private readonly repositorioUsuario: IRepositorioUsuario,
private readonly encriptador: IEncriptador,
private readonly ServicioToken: IservicioToken

){}

async registrar(nombre:string,email:string,contraseña:string,telefono?:string): 
Promise<{usuario:Usuario,token:string}> {
    if (!nombre||!email||!contraseña){
        throw new ErrorApp('Todos los campos son obligatorios', 400)
    }
    if (contraseña.length<8){
        throw new ErrorApp('La contraseña debe contener minimo 8 caracteres', 400)
    }
    const usuarioExistente = await this.repositorioUsuario.encontrarPorEmail(email);
if (usuarioExistente){
    throw new ErrorApp('Este email ya esta registrado',409)
}
const hashContraseña= await this.encriptador.encriptar(contraseña);

const nuevoUsuario = new Usuario(0,nombre,email,hashContraseña,Rol.Cliente,telefono);

const usuarioCreado =await this.repositorioUsuario.crear(nuevoUsuario);

const token = this.ServicioToken.generarToken({
id : usuarioCreado.id,
email: usuarioCreado.email,
rol: usuarioCreado.rol

});
return {usuario: usuarioCreado, token}


}


async iniciarSesion(email:string,contraseña:string): Promise<{usuario:Usuario,token:string}>{
    if (!email || ! contraseña){
        throw new ErrorApp('El Email y la contraseña son necesarios',400);

    }
const usuario = await this.repositorioUsuario.encontrarPorEmail(email);
if (!usuario){
    throw new ErrorApp('Credenciales no validas', 400);

}

const contraseñaValida =await this.encriptador.comparar(contraseña,usuario.contraseña);
if (!contraseñaValida){
    throw new ErrorApp('Credenciales no validas',400);

}
const token = this.ServicioToken.generarToken({
id : usuario.id,
email: usuario.email,
rol: usuario.rol

});
return {usuario: usuario, token}}

  private esEmailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}