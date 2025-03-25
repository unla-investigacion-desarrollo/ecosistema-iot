
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Medicion {
    id: string;
    fechaHora: Date;
    temperatura: number;
    humedad: number;
}

export interface IQuery {
    traerMedicionActual(): Nullable<Medicion> | Promise<Nullable<Medicion>>;
    traerPromedioMediciones(cantidad: number): Nullable<number> | Promise<Nullable<number>>;
    traerMedicionPorFecha(fechaHora: Date): Nullable<Medicion> | Promise<Nullable<Medicion>>;
}

export interface IMutation {
    agregarMedicion(fechaHora: Date, temperatura: number, humedad: number): Medicion | Promise<Medicion>;
    eliminarMedicion(fechaHora: Date): Medicion | Promise<Medicion>;
}

type Nullable<T> = T | null;
