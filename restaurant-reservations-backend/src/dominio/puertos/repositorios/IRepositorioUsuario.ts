import { Usuario } from "../../../entidades/Usuario";

export interface IRepositorioUsuario {
    encontrarPorId(id: number): Promise<Usuario | null>;
    encontrarPorEmail(email: string): Promise<Usuario | null>;
    crear(usuario: Usuario): Promise<Usuario>;
    actualizar(usuario: Usuario): Promise<Usuario>;
    eliminar(id: number): Promise<void>;
}