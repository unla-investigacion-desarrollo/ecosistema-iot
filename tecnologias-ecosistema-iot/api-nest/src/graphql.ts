
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Tarjeta {
    id: string;
    codigo: string;
    saldo: number;
    fechaAlta: Date;
    usuario: Usuario;
}

export interface ResultadoMutacionTarjeta {
    mensaje: string;
    tarjeta?: Nullable<Tarjeta>;
}

export interface IQuery {
    traerTarjetaPorId(id: string): Nullable<Tarjeta> | Promise<Nullable<Tarjeta>>;
    traerPorCodigo(codigo: string): Nullable<Tarjeta> | Promise<Nullable<Tarjeta>>;
    traerTarjetaPorDniUsuario(dni: number): Nullable<Tarjeta> | Promise<Nullable<Tarjeta>>;
    traerTarjetas(): Nullable<Nullable<Tarjeta>[]> | Promise<Nullable<Nullable<Tarjeta>[]>>;
    traerTarjetasConSaldoEntreRangos(minimo: number, maximo: number): Nullable<Nullable<Tarjeta>[]> | Promise<Nullable<Nullable<Tarjeta>[]>>;
    traerTarjetasEntreFechas(fechaDesde: Date, fechaHasta: Date): Nullable<Nullable<Tarjeta>[]> | Promise<Nullable<Nullable<Tarjeta>[]>>;
    traerUsuarioPorId(id: string): Nullable<Usuario> | Promise<Nullable<Usuario>>;
    traerUsuarioPorDni(dni: number): Nullable<Usuario> | Promise<Nullable<Usuario>>;
    traerUsuarios(): Nullable<Nullable<Usuario>[]> | Promise<Nullable<Nullable<Usuario>[]>>;
}

export interface IMutation {
    agregarTarjeta(codigo: string, saldo: number, fechaAlta: Date, dni: number): ResultadoMutacionTarjeta | Promise<ResultadoMutacionTarjeta>;
    agregarSaldoTarjeta(id: string, saldo: number): ResultadoMutacionTarjeta | Promise<ResultadoMutacionTarjeta>;
    eliminarTarjeta(id: string): string | Promise<string>;
    modificarTarjeta(id: string, codigo?: Nullable<string>, saldo?: Nullable<number>): ResultadoMutacionTarjeta | Promise<ResultadoMutacionTarjeta>;
    agregarUsuario(dni: number, nombre: string, apellido: string): ResultadoMutacionUsuario | Promise<ResultadoMutacionUsuario>;
    eliminarUsuario(dni: number): string | Promise<string>;
    modificarUsuario(id: string, dni?: Nullable<number>, nombre?: Nullable<string>, apellido?: Nullable<string>): ResultadoMutacionUsuario | Promise<ResultadoMutacionUsuario>;
}

export interface Usuario {
    id: string;
    dni: number;
    nombre: string;
    apellido: string;
}

export interface ResultadoMutacionUsuario {
    mensaje: string;
    usuario?: Nullable<Usuario>;
}

type Nullable<T> = T | null;
