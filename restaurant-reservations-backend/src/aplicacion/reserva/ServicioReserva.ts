import { Reserva, EstadoReserva } from '../../entidades/Reserva';
import { IRepositorioReserva, FiltroReserva } from '../../dominio/puertos/repositorios/IRepositorioReserva';
import { Usuario } from '../../entidades/Usuario';
import  Rol  from '../../dominio/enum/Rol';
import { ErrorApp } from '../../compartido/errores/ErrorApp';

interface CrearReservaDTO {
    usuarioId: number;
    mesaId: number;
    fechaReserva: Date;
    numComensales: number;
    notas?: string;
}

interface FiltrosReservaRequest {
    limite?: number;
    pagina?: number;
    fecha?: string;
    estado?: EstadoReserva;
}

export class ServicioReserva {
    constructor(private readonly repositorioReserva: IRepositorioReserva) {}

    async crearReserva(usuario: Usuario, datos: CrearReservaDTO): Promise<Reserva> {
        this.validarCrearReserva(datos);

        if (usuario.rol === Rol.Cliente && usuario.id !== datos.usuarioId) {
            throw new ErrorApp('No puedes crear una reserva para otro usuario', 403);
        }

        const disponible = await this.repositorioReserva.verificarDisponible(
            datos.fechaReserva,
            datos.mesaId,
            datos.numComensales
        );

        if (!disponible) {
            throw new ErrorApp('No hay disponibilidad para la fecha y hora seleccionadas', 409);
        }

        const nuevaReserva = new Reserva(
            0,
            datos.usuarioId,
            datos.mesaId,
            datos.fechaReserva,
            datos.numComensales,
            EstadoReserva.PENDIENTE,
            datos.notas
        );

        return this.repositorioReserva.crear(nuevaReserva);
    }

    async obtenerReservaPorId(usuario: Usuario, reservaId: number): Promise<Reserva> {
        const reserva = await this.obtenerReservaPorIdSinAutorizar(reservaId);

        if (usuario.rol === Rol.Cliente && reserva.usuarioId !== usuario.id) {
            throw new ErrorApp('No autorizado para ver esta reserva', 403);
        }

        return reserva;
    }

    async obtenerTodasLasReservas(
        usuario: Usuario,
        filtros: FiltrosReservaRequest
    ): Promise<{ datos: Reserva[]; total: number }> {
        const limite = this.validarLimite(filtros.limite);
        const pagina = this.validarPagina(filtros.pagina);

        const filtrosDb: FiltroReserva = {
            limite,
           
        };

        if (usuario.rol === Rol.Cliente) {
            filtrosDb.usuarioId = usuario.id;
        }

        if (filtros.fecha) {
            filtrosDb.fecha = new Date(filtros.fecha);
        }

        if (filtros.estado) {
            filtrosDb.estado = filtros.estado;
        }

        const [reservas, total] = await Promise.all([
            this.repositorioReserva.encontrarTodos(filtrosDb),
            this.repositorioReserva.contar(filtrosDb)
        ]);

        return { datos: reservas, total };
    }

    async cancelarReserva(usuario: Usuario, reservaId: number): Promise<Reserva> {
        const reserva = await this.obtenerReservaPorId(usuario, reservaId);

        if (reserva.estado === EstadoReserva.CANCELADA) {
            throw new ErrorApp('La reserva ya está cancelada', 409);
        }

        if (reserva.estado === EstadoReserva.CONFIRMADA) {
            throw new ErrorApp('No puedes cancelar una reserva confirmada', 409);
        }

        reserva.cancelar();
        return this.repositorioReserva.actualizar(reserva);
    }

    async confirmarReserva(usuario: Usuario, reservaId: number): Promise<Reserva> {
        if (usuario.rol !== Rol.Host && usuario.rol !== Rol.Gerente) {
            throw new ErrorApp('Solo el personal puede confirmar reservas', 403);
        }

        const reserva = await this.obtenerReservaPorIdSinAutorizar(reservaId);

        if (reserva.estado === EstadoReserva.CONFIRMADA) {
            throw new ErrorApp('La reserva ya está confirmada', 409);
        }

        if (reserva.estado === EstadoReserva.CANCELADA) {
            throw new ErrorApp('No puedes confirmar una reserva cancelada', 409);
        }

        reserva.confirmar();
        return this.repositorioReserva.actualizar(reserva);
    }

    // === Métodos Privados de Validación ===

    private validarCrearReserva(datos: CrearReservaDTO): void {
        if (!datos.usuarioId || !datos.mesaId || !datos.fechaReserva || !datos.numComensales) {
            throw new ErrorApp('Todos los campos son obligatorios', 400);
        }

        if (datos.numComensales <= 0) {
            throw new ErrorApp('El número de comensales debe ser mayor a 0', 400);
        }

        if (new Date(datos.fechaReserva) < new Date()) {
            throw new ErrorApp('No puedes hacer reservas en fechas pasadas', 400);
        }

        if (datos.notas && datos.notas.length > 500) {
            throw new ErrorApp('Las notas no pueden exceder 500 caracteres', 400);
        }
    }

    private validarLimite(limite?: number): number {
        if (!limite || limite < 1 || limite > 100) {
            return 10;
        }
        return limite;
    }

    private validarPagina(pagina?: number): number {
        if (!pagina || pagina < 1) {
            return 1;
        }
        return pagina;
    }

    private async obtenerReservaPorIdSinAutorizar(reservaId: number): Promise<Reserva> {
        const reserva = await this.repositorioReserva.encontrarPorId(reservaId);
        if (!reserva) {
            throw new ErrorApp('Reserva no encontrada', 404);
        }
        return reserva;
    }
}