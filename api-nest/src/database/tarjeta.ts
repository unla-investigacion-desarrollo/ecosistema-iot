import {Tarjeta} from '../graphql';
import {usuarios} from 'src/database/usuario';

//Definimos las siguientes tarjetas como exportables:
export const tarjetas: Tarjeta[] = 
[
    {id: '1', codigo: "1111", saldo: 5500, fechaAlta: new Date("2018-08-12"), usuario: usuarios[0]},
    {id: '2', codigo: "2222", saldo: 3940, fechaAlta: new Date("2019-03-26"), usuario: usuarios[1]},
    {id: '3', codigo: "3333", saldo: 19305, fechaAlta: new Date("2019-04-10"), usuario: usuarios[2]},
    {id: '4', codigo: "4444", saldo: 157, fechaAlta: new Date("2020-01-02"), usuario: usuarios[3]},
    {id: '5', codigo: "5555", saldo: 2610, fechaAlta: new Date("2022-07-17"), usuario: usuarios[4]}
];