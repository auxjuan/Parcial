import Rol from '../dominio/enum/Rol'

 export class Usuario {
    constructor(
public readonly id: number,
public nombre:string,
public email:string,
public contraseña:string,
public rol:Rol,
public telefono?:string,


    )
{}

public tieneRol(rol:Rol): boolean{
    return this.rol ==rol
}


}