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
  async traerPromedioTemperatura(cantidad: number) {

    const ultimosRegistros = await this.traerUltimasMediciones(cantidad);

    let promedio = 0; //Inicializamos el promedio.
    const cantMediciones = ultimosRegistros.length; //Cantidad de registros que se obtuvieron realmente de la base de datos.

    //Si se pidió al menos una medición para el promedio:
    if (cantMediciones > 0) {

      let tempAcumulada = 0; //Inicializamos un acumulador de temperaturas.

      //Iteramos las mediciones guardadas en el arreglo auxiliar:
      ultimosRegistros.forEach((medicion) => {
        tempAcumulada += medicion.temperatura; //Acumulamos la temperatura de la medición.
      });

      promedio = tempAcumulada / cantMediciones; //Calculamos el promedio de temperatura de las mediciones.
    }

    return promedio; //Retornamos el promedio de la temperatura.
  }


  //Obtener el promedio de humedad de determinada cantidad de últimas mediciones:
  async traerPromedioHumedad(cantidad: number) {

    const ultimosRegistros = await this.traerUltimasMediciones(cantidad);

    let promedio = 0; //Inicializamos el promedio.
    const cantMediciones = ultimosRegistros.length; //Cantidad de registros que se obtuvieron realmente de la base de datos.

    //Si se pidió al menos una medición para el promedio:
    if (cantMediciones > 0) {

      let humedadAcumulada = 0; //Inicializamos un acumulador de humedades.

      //Iteramos las mediciones guardadas en el arreglo auxiliar:
      ultimosRegistros.forEach((medicion) => {
        humedadAcumulada += medicion.humedad; //Acumulamos la humedad de la medición.
      });

      promedio = humedadAcumulada / cantMediciones; //Calculamos el promedio de humedad de las mediciones.
    }

    return promedio; //Retornamos el promedio de la humedad.
    
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

  //Obtenemos las ultimas mediciones:
  async traerUltimasMediciones(cantidad: number) {
    let ultimosRegistros = [];

    if(cantidad > 0){
      ultimosRegistros = await this.medicionModel
      .find() //Encuentra todos los documentos.
      .sort({ fechaHora: -1 }) //Ordena por fecha y hora en orden descendente (más reciente primero).
      .limit(cantidad) //Limita el resultado a la cantidad solicitada.
      .exec(); //Ejecuta la consulta.
    }
    
    return ultimosRegistros; //Retornamos las mediciones.
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
