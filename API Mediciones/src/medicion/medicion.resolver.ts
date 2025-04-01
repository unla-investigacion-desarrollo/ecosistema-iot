import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MedicionService } from './medicion.service';

@Resolver('Medicion')
export class MedicionResolver {
  //Constructor:
  constructor(private readonly medicionService: MedicionService) {}

  ///----------------------------------QUERIES----------------------------------------///

  //Obtener la medición actual:
  @Query('traerMedicionActual')
  async traerMedicionActual() {
    return this.medicionService.traerMedicionActual();
  }

  //Obtener el promedio de temperatura de determinada cantidad de últimas mediciones:
  @Query('traerPromedioTemperatura')
  async traerPromedioTemperatura(@Args('cantidad') cantidad: number) {
    return this.medicionService.traerPromedioTemperatura(cantidad);
  }

  //Obtener el promedio de humedad de determinada cantidad de últimas mediciones:
  @Query('traerPromedioHumedad')
  async traerPromedioHumedad(@Args('cantidad') cantidad: number) {
    return this.medicionService.traerPromedioHumedad(cantidad);
  }



  //Obtener la medición con determinada fecha y hora:
  @Query('traerMedicionPorFechaHora')
  async traerMedicionPorFechaHora(@Args('fechaHora') fechaHora: Date) {
    return this.medicionService.traerMedicionPorFechaHora(fechaHora);
  }

  //Obtener todas las mediciones:
  @Query('traerMediciones')
  async traerMediciones() {
    return this.medicionService.traerMediciones();
  }

  //Obtener las mediciones entre dos fecha y hora (extremos inclusive):
  @Query('traerMedicionesEntreFechasHoras')
  async traerMedicionesEntreFechasHoras(
    @Args('fechaHoraDesde') fechaHoraDesde: Date,
    @Args('fechaHoraHasta') fechaHoraHasta: Date,
  ) {
    return this.medicionService.traerMedicionesEntreFechasHoras(
      fechaHoraDesde,
      fechaHoraHasta,
    );
  }

  //Obtener las mediciones entre dos temperaturas (extremos inclusive):
  @Query('traerMedicionesEntreTemperaturas')
  async traerMedicionesEntreTemperaturas(
    @Args('temperaturaDesde') temperaturaDesde: number,
    @Args('temperaturaHasta') temperaturaHasta: number,
  ) {
    return this.medicionService.traerMedicionesEntreTemperaturas(
      temperaturaDesde,
      temperaturaHasta,
    );
  }

  //Obtener las mediciones entre dos humedades (extremos inclusive):
  @Query('traerMedicionesEntreHumedades')
  async traerMedicionesEntreHumedades(
    @Args('humedadDesde') humedadDesde: number,
    @Args('humedadHasta') humedadHasta: number,
  ) {
    return this.medicionService.traerMedicionesEntreHumedades(
      humedadDesde,
      humedadHasta,
    );
  }

  ///---------------------------------MUTATIONS---------------------------------------///

  //Agregar una medición:
  @Mutation('agregarMedicion')
  async agregarMedicion(
    @Args('fechaHora') fechaHora: Date,
    @Args('temperatura') temperatura: number,
    @Args('humedad') humedad: number,
  ) {
    return this.medicionService.agregarMedicion(
      fechaHora,
      temperatura,
      humedad,
    );
  }

  //Eliminar una medicion por fecha y hora:
  @Mutation('eliminarMedicion')
  async eliminarMedicion(@Args('fechaHora') fechaHora: Date) {
    return this.medicionService.eliminarMedicion(fechaHora);
  }
}
