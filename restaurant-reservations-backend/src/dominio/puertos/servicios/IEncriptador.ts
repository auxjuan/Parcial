export interface IEncriptador {
    encriptar(contraseña:string): Promise<string>;
    comparar(contraseña:string,hash:string): Promise<boolean>;
}
