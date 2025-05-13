import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import {usuarios} from 'src/database/usuario';
import {tarjetas} from 'src/database/tarjeta';
import {TarjetaResolver} from 'src/graphql/resolvers/tarjeta.resolver'
import {forwardRef, Inject, Injectable} from '@nestjs/common';

@Injectable()
@Resolver('Usuario')
export class UsuarioResolver 
{
    constructor(@Inject(forwardRef(() => TarjetaResolver)) private readonly tarjetaService: TarjetaResolver){}

    ///---------------------------------QUERIES---------------------------------------///
    //Obtener el usuario con determinado DNI:
    @Query('traerUsuarioPorDni')
    async traerUsuarioPorDni(@Args('dni') dni: number) 
    {
        //Obtenemos el usuario con ese DNI:
        const usuario = usuarios.find((usuario) => usuario.dni === dni);

        //Retornamos el usuario o null si no existe:
        return usuario ? usuario : null;
    }

    //Obtener el usuario con determinado id:
    @Query('traerUsuarioPorId')
    async traerUsuarioPorId(@Args('id') id: string) 
    {
        //Obtenemos el usuario con ese id:
        const usuario = usuarios.find((usuario) => usuario.id === id);

        //Retornamos el usuario o null si no existe:
        return usuario ? usuario : null;
    }

    //Obtener todos los usuarios:
    @Query('traerUsuarios')
    async traerUsuarios() 
    {
        //Retornamos todos los usuarios:
        return usuarios;
    }

    ///---------------------------------MUTATIONS---------------------------------------///

    //Agregar usuario:
    @Mutation('agregarUsuario')
    async agregarUsuario(@Args('dni') dni: number, @Args('nombre') nombre: string, @Args('apellido') apellido: string)  
    {
        //Suponemos que el usuario ya existe y definimos el mensaje asociado al error:
        let mensaje = "Ya existe un usuario con ese DNI";

        //Suponemos que el nuevo usuario no va a poder ser creado:
        let nuevoUsuario = null;

        //Si no existe otro usuario con ese DNI:
        if(await this.traerUsuarioPorDni(dni) === null)
        {
            //En principio, inicializamos lo que va a ser el id del nuevo usuario:
            let nuevoId = "1";
        
            //Si hay más usuarios registrados:
            if (usuarios.length > 0) 
            {
                //Obtenemos el último usuario:
                const ultimoElemento = usuarios[usuarios.length - 1];

                //Obtenemos el id de este:
                const ultimoId = ultimoElemento.id; 

                //El id del nuevo usuario será la siguiente unidad al del último:
                nuevoId = String( Number(ultimoId) + 1);
            }
        
            //Cargamos el nuevo usuario:
            nuevoUsuario = 
            {
                id: nuevoId, 
                dni: dni,
                nombre: nombre,
                apellido: apellido
            };
    
            //Agregamos el usuario al arreglo:
            usuarios.push(nuevoUsuario);

            //Definimos el mensaje asociado al resultado de la operación:
            mensaje = "USUARIO AGREGADO";
        }

        //Retornamos el mensaje y el nuevo usuario:
        return {mensaje: mensaje, usuario: nuevoUsuario};
    }

    //Eliminar usuario:
    @Mutation('eliminarUsuario')
    async eliminarUsuario(@Args('dni') dni: number)  
    {
        //Suponemos que el usuario a eliminar no existe y definimos el mensaje asociado al error:
        let mensaje = "NO existe un usuario con ese DNI";

        //Obtenemos el usuario a eliminar:
        let usuarioEliminar = await this.traerUsuarioPorDni(dni);

        //Una variable para guardar un índice:
        let indice = null;

        //Si el usuario a eliminar existe:
        if(usuarioEliminar !== null)
        {
            //Obtenemos la tarjeta asociado al usuario a eliminar:
            let tarjetaEliminar = await this.tarjetaService.traerTarjetaPorDniUsuario(dni);

            //Si tiene una tarjeta asociada:
            if(tarjetaEliminar !== null)
            {
                //Obtenemos su índice en el arreglo de tarjetas:
                indice = tarjetas.findIndex((tarjeta) => tarjeta.id === tarjetaEliminar.id);
                
                //Eliminamos la tarjeta:
                tarjetas.splice(indice, 1);

                //Definimos el mensaje asociado al resultado de la operación:
                mensaje = "SE ELIMINO el usuario DNI ["+ dni +"] y su TARJETA con CODIGO [" + tarjetaEliminar.codigo + "]";
            }
            else
            {
                //Definimos el mensaje asociado al resultado de la operación:
                mensaje = "SE ELIMINO el usuario DNI ["+ dni + "] y no tenía TARJETA"; 
            }

            //Obtenemos el índice del usuario a eliminar:
            indice = usuarios.findIndex((usuario) => usuario.id === usuarioEliminar.id);

            //Eliminamos al usuario del arreglo:
            usuarios.splice(indice, 1);
        }

        //Retornamos el mensaje:
        return mensaje;
    }

    //Modificar usuario:
    @Mutation('modificarUsuario')
    async modificarUsuario(@Args('id') id: string,@Args('dni') dni: number,@Args('nombre') nombre: string,@Args('apellido') apellido: string)  
    {
        //Suponemos que el usuario a modificar no existe:
        let mensaje = "NO existe un usuario con ese ID";

        //Obtenemos el usuario a modificar:
        let usuarioModificar = await this.traerUsuarioPorId(id);

        //Si el usuario a modificar existe:
        if(usuarioModificar !== null)
        {
            //Si recibimos un DNI:
            if(dni != null)
            {
                //Modificamos el DNI:
                usuarioModificar.dni = dni;
            }

            //Si recibimos un nombre:
            if(nombre != null)
            {
                //Modificamos el nombre:
                usuarioModificar.nombre = nombre;
            }
            
            //Si recibimos un apellido:
            if(apellido != null)
            {
                //Modificamos el apellido:
                usuarioModificar.apellido = apellido;
            }

            //Definimos el mensaje asociado al resultado de la operación:
            mensaje = "USUARIO MODIFICADO"
        }

        //Retornamos el mensaje y el usuario:
        return {mensaje: mensaje, usuario: usuarioModificar};
    }
}