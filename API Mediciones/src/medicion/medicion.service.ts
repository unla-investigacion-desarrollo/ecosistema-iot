import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medicion } from './medicion.schema';

@Injectable()
export class MedicionService {
  //Constructor:
  constructor(
    @InjectModel(Medicion.name) private medicionModel: Model<Medicion>,
  ) {}

  ///---------------------------------QUERIES---------------------------------------///

  //Obtener la medición actual:
  async traerMedicionActual() {
    const ultimaMedicion = await this.medicionModel
      .findOne()
      .sort({ fechaHora: -1 }) //Ordena las mediciones por fecha y hora en orden descendente.
      .exec();

    return ultimaMedicion; //Retornamos la medición.
  }

  //Obtener el promedio de determinada cantidad de últimas mediciones:
  async traerPromedioMediciones(cantidad: number) {
    const ultimosRegistros = await this.medicionModel
      .find() //Encuentra todos los documentos.
      .sort({ fechaHora: -1 }) //Ordena por fecha y hora en orden descendente (más reciente primero).
      .limit(cantidad) //Limita el resultado a la cantidad solicitada.
      .exec(); //Ejecuta la consulta.

    let promedio = 0; //Inicializamos el promedio.
    const cantMediciones = ultimosRegistros.length; //Cantidad de registros que se obtuvieron realmente de la base de datos.

    //Si se pidió al menos una medición para el promedio:
    if (cantidad > 0) {
      //Si tenemos menos o la misma cantidad de mediciones que las solicitadas para el promedio:
      if (cantMediciones <= cantidad) {
        cantidad = cantMediciones; //La cantidad solicitada pasa a ser la cantidad de mediciones.
      }

      let tempAcumulada = 0; //Inicializamos un acumulador de temperaturas.

      //Iteramos las mediciones guardadas en el arreglo auxiliar:
      ultimosRegistros.forEach((medicion) => {
        tempAcumulada += medicion.temperatura; //Acumulamos la temperatura de la medición.
      });

      promedio = tempAcumulada / cantidad; //Calculamos el promedio de temperatura de las mediciones.
    }

    return promedio; //Retornamos el promedio de la temperatura.
  }

  //Obtener la medición con determinada fecha y hora:
  async traerMedicionPorFechaHora(fechaHora: Date) {
    //Obtenemos la medición:
    const medicion = this.medicionModel.findOne({ fechaHora }).exec();

    return medicion; //Retornamos la medición o null si no existe.
  }

  //Obtener todas las mediciones:
  async traerMediciones() {
    //Obtenemos las mediciones:
    const mediciones = await this.medicionModel.find().exec();

    return mediciones; //Retornamos las mediciones.
  }

  //Obtener las mediciones entre dos fecha y hora (extremos inclusive):
  async traerMedicionesEntreFechasHoras(
    fechaHoraDesde: Date,
    fechaHoraHasta: Date,
  ) {
    //Obtenemos las mediciones:
    const mediciones = await this.medicionModel.find({
      fechaHora: {
        $gte: fechaHoraDesde,
        $lte: fechaHoraHasta,
      },
    });

    return mediciones; //Retornamos las mediciones.
  }

  //Obtener las mediciones entre dos temperaturas (extremos inclusive):
  async traerMedicionesEntreTemperaturas(
    temperaturaDesde: number,
    temperaturaHasta: number,
  ) {
    //Obtenemos las mediciones:
    const mediciones = await this.medicionModel.find({
      temperatura: {
        $gte: temperaturaDesde,
        $lte: temperaturaHasta,
      },
    });

    return mediciones; //Retornamos las mediciones.
  }

  //Obtener las mediciones entre dos humedades (extremos inclusive):
  async traerMedicionesEntreHumedades(
    humedadDesde: number,
    humedadHasta: number,
  ) {
    //Obtenemos las mediciones:
    const mediciones = await this.medicionModel.find({
      humedad: {
        $gte: humedadDesde,
        $lte: humedadHasta,
      },
    });

    return mediciones; //Retornamos las mediciones.
  }

  ///---------------------------------MUTATIONS---------------------------------------///

  //Agregar una medición:
  async agregarMedicion(fechaHora: Date, temperatura: number, humedad: number) {
    //Instanciamos una nueva medición con los datos envíados:
    const nuevaMedicion = new this.medicionModel({
      fechaHora,
      temperatura,
      humedad,
    });

    return nuevaMedicion.save(); //Retornamos el objeto resultante de la persistencia.
  }

  //Eliminar una medicion por fecha y hora:
  async eliminarMedicion(fechaHora: Date) {
    let mensaje = `No existe una medición con fecha y hora ${fechaHora}`; //Suponemos que no es posible la baja.

    const resultado = await this.medicionModel.deleteOne({ fechaHora }); //Intentamos eliminar la medición y obtenemos el resultado.

    //Si se eliminó un registro:
    if (resultado.deletedCount === 1) {
      mensaje = 'Medicion eliminada correctamente'; //Cambiamos el mensaje por uno de éxito en la operación.
    }

    return mensaje; //Retornamos el mensaje.
  }
}
