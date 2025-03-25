import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Medicion } from 'src/graphql';
import { mediciones } from 'src/database/medicion';

@Resolver('Medicion')
export class MedicionResolver {
  ///---------------------------------QUERIES---------------------------------------///

  //Obtener la medición actual:
  @Query('traerMedicionActual')
  async traerMedicionActual() {
    const medicion = mediciones[mediciones.length - 1]; //Obtenemos la última medición "guardada en la base de datos".
    return medicion; //Retornamos la medición.
  }

  //Obtener el promedio de determinada cantidad de últimas mediciones:
  @Query('traerPromedioMediciones')
  async traerPromedioMediciones(@Args('cantidad') cantidad: number) {
    const cantMediciones = mediciones.length; //Cantidad de mediciones que tenemos.
    let ultimasMediciones = []; //Arreglo auxiliar de mediciones consideradas para el promedio.
    let promedio = 0; //Inicializamos el promedio.

    //Si se pidió al menos una medición para el promedio:
    if (cantidad > 0) {
      //Si tenemos menos o la misma cantidad de mediciones que las solicitadas para el promedio:
      if (cantMediciones <= cantidad) {
        ultimasMediciones = mediciones; //Consideramos todas las mediciones para el cálculo del promedio.
        cantidad = cantMediciones; //La cantidad solicitada pasa a ser la cantidad de mediciones.
      }
      //Si tenemos más mediciones que las solicitadas:
      else {
        //Iteramos nuestras mediciones desde la más reciente hasta obtener la cantidad solicitada de ellas:
        for (let i = cantMediciones - 1; i >= cantMediciones - cantidad; i--) {
          ultimasMediciones.push(mediciones[i]); //Agregamos la medición a nuestro arreglo auxiliar.
        }
      }

      let tempAcumulada = 0; //Inicializamos un acumulador de temperaturas.

      //Iteramos las mediciones guardadas en el arreglo auxiliar:
      ultimasMediciones.forEach((medicion) => {
        tempAcumulada += medicion.temperatura; //Acumulamos la temperatura de la medición.
      });

      promedio = tempAcumulada / cantidad; //Calculamos el promedio de temperatura de las mediciones.
    }

    return promedio; //Retornamos el promedio.
  }

  //Obtener la medición con determinada fecha y hora:
  @Query('traerMedicionPorFecha')
  async traerMedicionPorFecha(@Args('fechaHora') fechaHora: Date) {
    //Obtenemos la medición con la fecha y hora indicada::
    const medicion = mediciones.find(
      (medicion) =>
        medicion.fechaHora.toISOString() === fechaHora.toISOString(),
    );

    //Retornamos la medición o null si no existe:
    return medicion ? medicion : null;
  }

  ///---------------------------------MUTATIONS---------------------------------------///

  @Mutation('agregarMedicion')
  async agregarMedicion(
    @Args('fechaHora') fechaHora: Date,
    @Args('temperatura') temperatura: number,
    @Args('humedad') humedad: number,
  ) {
    let nuevaMedicion = null;

    //En principio, el id de la nueva medicion será uno que definimos nosotros para la primera de todas:
    let nuevoId = '1';

    //Sin embargo, si ya hay otras mediciones:
    if (mediciones.length > 0) {
      //Calculamos el id de la nueva medición en base al de la última medición generada:
      const ultimoElemento = mediciones[mediciones.length - 1]; //Obtenemos la última medición.
      const ultimoId = ultimoElemento.id; //Obtenemos su id.
      nuevoId = String(Number(ultimoId) + 1); //El nuevo id será una unidad más que el de la última medición.
    }

    //Cargamos los datos de la nueva medición:
    nuevaMedicion = {
      id: nuevoId,
      fechaHora: fechaHora,
      temperatura: temperatura,
      humedad: humedad,
    };

    mediciones.push(nuevaMedicion); //Agregamos la medición al arreglo.

    return nuevaMedicion; //Retornamos la medición agregada.
  }

  //Eliminar medicion:
  @Mutation('eliminarMedicion')
  async eliminarMedicion(@Args('fechaHora') fechaHora: Date) {
    //Obtenemos la medición a eliminar:
    const medicionEliminar = await this.traerMedicionPorFecha(fechaHora);

    //Si la medición existe:
    if (medicionEliminar !== null) {
      //Obtenemos el índice de la medición en el arreglo y la removemos del mismo:
      const indice = mediciones.findIndex(
        (medicion) => medicion.fechaHora === fechaHora,
      );
      mediciones.splice(indice, 1);
    }

    return medicionEliminar; //Retornamos la medición eliminada.
  }
}
