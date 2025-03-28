
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
    traerMedicionPorFechaHora(fechaHora: Date): Nullable<Medicion> | Promise<Nullable<Medicion>>;
    traerMediciones(): Nullable<Nullable<Medicion>[]> | Promise<Nullable<Nullable<Medicion>[]>>;
    traerMedicionesEntreFechasHoras(fechaHoraDesde: Date, fechaHoraHasta: Date): Nullable<Nullable<Medicion>[]> | Promise<Nullable<Nullable<Medicion>[]>>;
    traerMedicionesEntreTemperaturas(temperaturaDesde: number, temperaturaHasta: number): Nullable<Nullable<Medicion>[]> | Promise<Nullable<Nullable<Medicion>[]>>;
    traerMedicionesEntreHumedades(humedadDesde: number, humedadHasta: number): Nullable<Nullable<Medicion>[]> | Promise<Nullable<Nullable<Medicion>[]>>;
}

export interface IMutation {
    agregarMedicion(fechaHora: Date, temperatura: number, humedad: number): Medicion | Promise<Medicion>;
    eliminarMedicion(fechaHora: Date): string | Promise<string>;
}

type Nullable<T> = T | null;
