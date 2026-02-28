import { IRepositorioUsuario } from "../../dominio/puertos/repositorios/IRepositorioUsuario";
import { Usuario } from "../../entidades/Usuario";
import Rol from "../../dominio/enum/Rol";
import pool from "../config/db";
import { RowDataPacket, OkPacket } from 'mysql2';

export class RepositorioUsuarioMySQL implements IRepositorioUsuario {
    private mapearFilaAUsuario(fila: RowDataPacket): Usuario {
        return new Usuario(
fila.id,
fila.nombre,
fila.email,
fila.contraseña,
fila.rol as Rol,
fila.telefono,
fila.creada_a_las,
fila.actualizada_a_las
 
);
}

async encontrarPorId (id:number): Promise<Usuario |null>{
    const [filas]=await pool.query<RowDataPacket[]>(
        'select * from usuarios where id = ?',
        [id]
    );
    if (filas.length ===0)return null;
    return this.mapearFilaAUsuario(filas[0])
}


async encontrarPorEmail(email: string): Promise<Usuario | null> {
const [filas] = await pool.query<RowDataPacket[]>(
    'SELECT * from usuarios where email = ?',
    [email]

)   
if (filas.length ===0 )return null;
return this.mapearFilaAUsuario(filas[0]) 
}

async crear (usuario: Usuario): Promise<Usuario>{
    const [resultado] =await pool.query<OkPacket>(
        'Insert into usuarios (nombre,email,contraseña,rol,telefono) values (?,?,?,?,?)',
        [
        usuario.nombre,
        usuario.email,
        usuario.contraseña,
        usuario.rol,
        usuario.telefono
        ]

    );
    const usuarioCreado = await this.encontrarPorId(resultado.insertId);
    if (!usuarioCreado){
        throw new Error('No se pudo crear el usuario creado')
   
    }
     return usuarioCreado;


}

async actualizar (usuario: Usuario): Promise <Usuario>{
    try {
        if (!usuario.id || usuario.id <= 0){
            throw new Error('ID de usuario no valido');
            
        }
    }
this.validarUsuario(usuario);
await pool.query<OkPacket>(
    'update usuarios set nombre =?, email =?, contraseña =?, rol=?, telefono =?, actualizada_a_las = now() where id =?',
    [usuario.nombre,usuario.email,usuario.contraseña,usuario.rol,usuario.telefono,usuario.id]

);

const usuarioActualizado =await this.encontrarPorId(usuario.id);
    if (!usuarioActualizado){
        throw new Error ('No es posible actualizar al usuario')
    }
    return usuarioActualizado;


    throw new Error('Error al actualizar usuario en base de datos');
 catch (error) {
    console.error('Error al actualizar usuario', error);
    throw error;
}

}}




