import  {Reserva}  from "../../../entidades/Reserva";

export interface FiltroReserva{
    usuarioId?:number,
    fecha?:Date,
    estado?: string,
        limite:number,
    
}

export interface IRepositorioReserva {
encontrarPorId(id:number): Promise<Reserva | null>;
encontrarTodos(filtro:FiltroReserva): Promise<Reserva []>;
crear(reserva:Reserva): Promise<Reserva>;
actualizar(reserva:Reserva): Promise<Reserva>;
eliminar(id:number): Promise<void>;
contar(filtro:FiltroReserva): Promise<number>;
verificarDisponible(fecha:Date, mesaId:number,numComensales:number): Promise <boolean>;
}