import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {Tarjeta} from 'src/graphql';
import {tarjetas} from 'src/database/tarjeta';
import {UsuarioResolver} from 'src/graphql/resolvers/usuario.resolver'
import {forwardRef, Inject, Injectable} from '@nestjs/common';

@Injectable()
@Resolver('Tarjeta')
export class TarjetaResolver 
{
    //Constructor:
    constructor(@Inject(forwardRef(() => UsuarioResolver)) private readonly usuarioService: UsuarioResolver){}

    ///---------------------------------QUERIES---------------------------------------///

    //Obtener la tarjeta con determinado id:
    @Query('traerTarjetaPorId')
    async traerTarjetaPorId(@Args('id') id: string)
    {
        //Obtenemos la tarjeta con el id indicado:
        const tarjeta = tarjetas.find((tarjeta) => tarjeta.id === id);

        //Retornamos la tarjeta o null si no existe:
        return tarjeta ? tarjeta : null;
    }

    //Obtener la tarjeta con determinado código:
    @Query('traerPorCodigo')
    async traerPorCodigo(@Args('codigo') codigo: string) 
    {
        //Obtenemos la tarjeta con el código indicado:
        const tarjeta = tarjetas.find((tarjeta) => tarjeta.codigo === codigo);

        //Retornamos la tarjeta o null si no existe:
        return tarjeta ? tarjeta : null;
    }

    //Obtener la tarjeta de determinado usuario por su DNI:
    @Query('traerTarjetaPorDniUsuario')
    async traerTarjetaPorDniUsuario(@Args('dni') dni: number) 
    {
        //Obtenemos la tarjeta del usuario con el DNI indicado:
        const tarjeta = tarjetas.find((tarjeta) => tarjeta.usuario.dni === dni);

        //Retornamos la tarjeta o null si no hay una tarjeta asociada a ese usuario:
        return tarjeta ? tarjeta : null;
    }

    //Obtener todas las tarjetas:
    @Query('traerTarjetas')
    async traerTarjetas() 
    {
        //Retornamos todas las tarjetas:
        return tarjetas; 
    }

    //Obtener las tarjetas con un saldo entre un intervalo abierto:
    @Query('traerTarjetasConSaldoEntreRangos')
    async traerTarjetasConSaldoEntreRangos(@Args('minimo') minimo: number, @Args('maximo') maximo: number) 
    {
        //Obtenemos las tarjetas con un saldo mayor al mínimo y menor al máximo indicados:
        const tarjetasConSaldoEntreRangos: Tarjeta[] = tarjetas.filter((tarjeta) => tarjeta.saldo >= minimo && tarjeta.saldo <= maximo);

        //Retornamos las tarjetas:
        return tarjetasConSaldoEntreRangos;
    }

    //Obtener las tarjetas con una fecha de alta entre un intervalo abierto:
    @Query('traerTarjetasEntreFechas')
    async traerTarjetasEntreFechas(@Args('fechaDesde') fechaDesde: Date, @Args('fechaHasta') fechaHasta: Date) 
    {
        //Obtenemos las tarjetas con una fecha de alta posterior a la desde y anterior a la hasta indicadas:
        const tarjetasEntreFechas: Tarjeta[] = tarjetas.filter((tarjeta) => tarjeta.fechaAlta >= fechaDesde && tarjeta.fechaAlta <= fechaHasta);

        //Retornamos las tarjetas:
        return tarjetasEntreFechas;
    }

    ///---------------------------------MUTATIONS---------------------------------------///
    
    //Agregar tarjeta:
    @Mutation('agregarTarjeta')
    async agregarTarjeta(@Args('codigo') codigo: string, @Args('saldo') saldo: number, @Args('fechaAlta') fechaAlta: Date,@Args('dni') dni: number)  
    {
        //Suponemos que ya hay una tarjeta con ese código y no va a poder ser agregada:
        let mensaje = "Ya existe una tarjeta con ese CODIGO"; //Definimos el mensaje asociado al error.
        let nuevaTarjeta = null; //Definimos la tarjeta que retorna el método.

        //Si no existe una tarjeta con el código indicado:
        if(await this.traerPorCodigo(codigo) === null)
        {
            //Obtenemos el usuario al cual se quiere asociar la tarjeta nueva:
            const usuario = await this.usuarioService.traerUsuarioPorDni(dni);

            //Si el usuario no existe:
            if(usuario === null)
            {
                mensaje = "NO existe un usuario con ese DNI"; //Definimos el mensaje asociado al error.
            }
            else //Por el contrario, debido a que el usuario existe...
            {
                //Si el usuario no tiene ninguna tarjeta asociada:
                if(await this.traerTarjetaPorDniUsuario(dni) === null)
                {
                    //En principio, el id de la nueva tarjeta será uno que definimos nosotros para la primera de todas:
                    let nuevoId = "1";
                
                    //Sin embargo, si ya hay otras tarjetas:
                    if(tarjetas.length > 0)
                    {
                        //Calculamos el id de la nueva tarjeta en base al de la última tarjeta generada:
                        const ultimoElemento = tarjetas[tarjetas.length - 1]; //Obtenemos la última tarjeta.
                        const ultimoId = ultimoElemento.id;  //Obtenemos su id.
                        nuevoId = String( Number(ultimoId) + 1); //El nuevo id será una unidad más que el de la última tarjeta.
                    }
                
                    //Cargamos los datos de la nueva tarjeta:
                    nuevaTarjeta = 
                    {
                        id: nuevoId, 
                        codigo: codigo,
                        saldo: saldo,
                        fechaAlta: fechaAlta,
                        usuario: usuario
                    };
            
                    //Agregamos la tarjeta generada al conjunto de datos:
                    tarjetas.push(nuevaTarjeta);

                    mensaje = "TARJETA AGREGADA"; //Definimos el mensaje asociado al resultado de la operación.

                }
                else //Por el contrario, como el usuario ya tiene una tarjeta asociada...
                {
                    mensaje = "Ya existe una tarjeta para el usuario con ese DNI"; //Definimos el mensaje asociado al error.
                }
            }
        }
        
        //Retornamos el mensaje y la nueva tarjeta, según el resultado del proceso:
        return {mensaje: mensaje, tarjeta: nuevaTarjeta};
    }

    //Agregar saldo a una tarjeta:
    @Mutation('agregarSaldoTarjeta')
    async agregarSaldoTarjeta(@Args('id') id: string, @Args('saldo') saldo: number)
    {
        //Suponemos que la tarjeta no existe y definimos el mensaje de error asociado:
        let mensaje = "No existe una TARJETA con ese ID";

        //Obtenemos la tarjeta con ese id:
        let tarjeta = await this.traerTarjetaPorId(id);

        //Si la tarjeta existe:
        if(tarjeta !== null)
        {
            //Si el saldo que se le quiere sumar es positivo:
            if(saldo > 0)
            {
                tarjeta.saldo += saldo; //Acumulamos el saldo.
                mensaje = "El saldo fue agregado EXITOSAMENTE"; //Definimos el mensaje asociado a la suma.
            }
            else //Por el contrario, si el saldo es negativo o 0:
            {
                mensaje = "El saldo debe ser POSITIVO"; //Definimos el mensaje asociado al error.
            }
        }

        //Retornamos el mensaje y la tarjeta:
        return {mensaje: mensaje, tarjeta: tarjeta};
    }  

    //Eliminar tarjeta:
    @Mutation('eliminarTarjeta')
    async eliminarTarjeta(@Args('id') id: string) 
    {
        //Suponemos que la tarjeta a eliminar no existe y definimos el mensaje asociado a ese error:
        let mensaje = "No existe una tarjeta con ese ID"; 

        //Obtenemos la tarjeta a eliminar:
        let tarjetaEliminar = await this.traerTarjetaPorId(id);

        //Si la tarjeta existe:
        if(tarjetaEliminar !== null)
        {    
            //Obtenemos el índice de la tarjeta en el arreglo y la removemos del mismo:
            let indice = tarjetas.findIndex((tarjeta) => tarjeta.id === id);
            tarjetas.splice(indice, 1);

            mensaje = "La tarjeta fue ELIMINADA"; //Definimos el mensaje asociado al resultado.
        }

        return mensaje; //Retornamos el mensaje asociado al resultado de la operación.
    }

    //Modificar tarjeta:
    @Mutation('modificarTarjeta')
    async modificarTarjeta(@Args('id') id: string, @Args('codigo') codigo: string, @Args('saldo') saldo: number)  
    {
        //Suponemos que la tarjeta no existe y definimos el mensaje asociado a ese error:
        let mensaje = "No existe la TARJETA";

        //Obtenemos la tarjeta a modificar:
        let tarjeta = await this.traerTarjetaPorId(id);

        //Si la tarjeta existe:
        if(tarjeta !== null)
        {
            mensaje = ""; //Reinicializamos el mensaje.

            let contador = 0; //Definimos e inicializamos un contador de cambios.

            //Si se recibió un código para hacer el reemplazo:
            if(codigo)
            {
                //Si no hay otra tarjeta con el nuevo código:    
                if(await this.traerPorCodigo(codigo) === null)
                {
                    tarjeta.codigo = codigo; //Reemplazamos el código de la tarjeta.
                    contador++; //Contamos el cambio hecho.
                }
                else //Por el contrario, si otra tarjeta ya tiene ese código:
                {
                    mensaje = "Codigo REPETIDO"; //Definimos el mensaje asociado al error.
                }
            }

            //Si se recibió un saldo para hacer el reemplazo:
            if(saldo)
            {
                //Si el saldo es positivo:
                if(saldo > 0)
                {
                    tarjeta.saldo = saldo; //Reemplazamos el saldo de la tarjeta.
                    contador++; //Contamos el cambio hecho.
                }
                else //Por el contrario, si el saldo es negativo o 0:
                {
                    mensaje += " - Saldo NO POSITIVO"; //Definimos el mensaje asociado al error.
                }
            }

            //Si se hizo aunque sea un cambio:
            if(contador > 0)
            {
                mensaje = "Tarjeta MODIFICADA"; //Definimos el mensaje asociado al resultado de la operación.
            }
            else
            {
                //Si no se recibió ni el código ni el saldo:
                if(!codigo && !saldo)
                {
                    mensaje = "NO SE INDICARON CAMBIOS"; //Definimos el mensaje asociado al error.
                }
            }
        }

        //Retornamos el mensaje y la tarjeta:
        return {mensaje: mensaje, tarjeta: tarjeta}
    }
}