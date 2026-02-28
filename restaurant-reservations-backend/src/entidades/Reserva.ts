 export enum EstadoReserva {
    PENDIENTE = 'pendiente',
    CONFIRMADA = 'confirmada',
    CANCELADA = 'cancelada',
    COMPLETADA = 'completada',
    NO_SHOW = 'no_show'
}

export class Reserva{
   constructor(
        public readonly id: number | null,
        public usuarioId: number,
        public mesaId: number,
        public fechaReserva: Date,
        public numComensales: number,
        public estado: EstadoReserva,
        public notas?: string,
        public creadoEn?: Date,
        public actualizadoEn?: Date
    ) {}

public cancelar(): void {
    if(this.estado === EstadoReserva.COMPLETADA){
        throw new Error('No es posible cancelar una reserva ya completada')

    }
    this.estado =EstadoReserva.CANCELADA

}

public confirmar(): void {
if (this.estado !== EstadoReserva.PENDIENTE){
     throw new Error('Solo es posible confirmar reservas pendientes')
}
this.estado=EstadoReserva.CONFIRMADA

}



}