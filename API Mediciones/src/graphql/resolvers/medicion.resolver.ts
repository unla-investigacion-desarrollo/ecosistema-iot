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

    const promedio = tempAcumulada / cantidad; //Calculamos el promedio de temperatura de las mediciones.

    return promedio; //Retornamos el promedio.
  }

  ///---------------------------------MUTATIONS---------------------------------------///
}
