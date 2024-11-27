## Descripción de la API

El proyecto consiste en una API de GraphQL desarrollada con TypeScript, NodeJS, Nest y Apollo Server. Se puede interactuar con la misma mediante la interfaz Apollo Studio de Apollo Server.

La API permite el CRUD (Create, Read, Update and Delete) de objetos de los tipos Usuario y Tarjeta, donde las Tarjeta tienen un Usuario asociado. Por lo tanto, a continuación se listan los métodos implementados y que pueden ser consumidos:
- ### **Queries**:
  - #### *Usuario*
    - ```traerUsuarioPorId(id: ID!): Usuario``` que devuelve el Usuario que tenga ese id o nulo si no existe.
    - ```traerUsuarioPorDni(dni: Float!): Usuario``` que devuelve el Usuario que tenga ese DNI o nulo si no existe.
    - ```traerUsuarios: [Usuario]``` que devuelve todos los Usuario.
  - #### *Tarjeta*
    - ```traerTarjetaPorId(id: ID!): Tarjeta``` que devuelve la Tarjeta que tenga ese id o nulo si no existe.
    - ```traerPorCodigo(codigo: String!): Tarjeta``` que devuelve la Tarjeta que tenga ese código o nulo si no existe.
    - ```traerTarjetas: [Tarjeta]``` que devuelve todas las Tarjeta.
    - ```traerTarjetasConSaldoEntreRangos(minimo: Float!, maximo: Float!): [Tarjeta]``` que devuelve todas las Tarjeta que tengan un saldo mayor o igual al mínimo y menor o igual al máximo.
    - ```traerTarjetasEntreFechas(fechaDesde: Date!, fechaHasta: Date!): [Tarjeta]``` que devuelve todas las Tarjeta que tengan una fecha de alta posterior o igual a la fecha desde y anterior o igual a la fecha hasta.
- ### **Mutations**:
  - #### *Usuario*
    - ```agregarUsuario(dni: Float!, nombre: String!, apellido: String!): ResultadoMutacionUsuario!``` que deriva en alguno de los siguientes resultados:
      - el usuario es agregado y se retorna un mensaje indicando eso y el nuevo usuario.
      - el usuario no puede ser agregado debido a que el código que se le intenta asignar le pertenece a otro usuario, por lo que se retorna un mensaje indicando ese error y un usuario nulo. 
    - ```eliminarUsuario(dni: Float!): String!``` que deriva en alguno de los siguientes resultados:
      - el usuario es eliminiado y se retorna un mensaje indicando eso.
      - el usuario tiene una tarjeta asociada, por lo que se elimina tanto el usuario como la tarjeta y se retorna un mensaje indicando eso.
      - el usuario a eliminar no existe y no puede ser eliminado, por lo que se retorna un mensaje indicando ese error.
    - ```modificarUsuario(id: ID!, dni: Float, nombre: String, apellido: String): ResultadoMutacionUsuario!``` que deriva en alguno de los siguientes resultados:
      - el usuario es modificado en los atributos indicados y se retorna un mensaje que indica eso y el usuario modificado.
      - el usuario a modificar no existe y no puede ser modificado, por lo que se retorna un mensaje indicando ese error. 
  - #### *Tarjeta*
    - ```agregarTarjeta(codigo: String!, saldo: Float!, fechaAlta: Date!, dni: Float!): ResultadoMutacionTarjeta!``` que deriva en alguno de los siguientes resultados:
      - la tarjeta es agregada y se retorna un mensaje indicando eso y la nueva tarjeta.
      - la tarjeta no puede ser agregada porque ya existe otra con el código que se le intenta asignar, por lo que se retorna un mensaje indicando el error y una tarjeta nula.
      - la tarjeta no puede ser agregada porque el usuario que se le intenta asociar no existe, por lo que se retorna un mensaje indicando el error y una tarjeta nula.
      - la tarjeta no puede ser agregada porque el usuario que se le intenta asociar ya tiene una tarjeta, por lo que se retorna un mensaje indicando el error y una tarjeta nula. 
    - ```agregarSaldoTarjeta(id: ID!, saldo: Float!): ResultadoMutacionTarjeta!``` que deriva en alguno de los siguientes resultados:
      - el saldo es agregado a la tarjeta y se retorna un mensaje indicando eso y la tarjeta con el saldo actualizado.
      - la tarjeta a la cual se le quiere agregar el saldo no existe, por lo que se retorna un mensaje indicando ese error y una tarjeta nula.
      - el saldo que se quiere agregar a la tarjeta es negativo o cero, por lo que se retorna un mensaje indicando ese error y una tarjeta nula.
    - ```eliminarTarjeta(id: ID!): String!``` que deriva en alguno de los siguientes resultados:
      - la tarjeta es eliminada y se retorna un mensaje indicando eso.
      - la tarjera no existe y no puede ser eliminada, por lo que se retorna un mensaje indicando el error.
    - ```modificarTarjeta(id: ID!, codigo: String, saldo: Float): ResultadoMutacionTarjeta!``` que deriva en alguno de los siguientes resultados:
      - la tarjeta es modificada en los atributos indicados y se retorna un mensaje indicando eso y la tarjeta modificada.
      - la tarjeta que se quiere modificar no existe y no puede ser modificada, por lo que se retorna un mensaje indicando el error y nula.
      - el código que se le quiere asignar a la tarjeta le pertenece a otra, por lo que se retorna un mensaje indicando el error y la tarjeta sin modificar.
      - el saldo que se le quiere asignar a la tarjeta es negativo o cero, por lo que se retorna un mensaje indicando el error y la tarjeta sin modificar.
      - no se indicaron cambios ni en el código ni en el saldo de la tarjeta, por lo que se retorna un mensaje indicando el error y la tarjeta sin modificar.

## Guía de instalación

Para realizar el procedimiento de instalación del proyecto y que pueda consumir la API, debe seguir los siguientes pasos:
1. Obtenga el código del proyecto desde este repositorio. Para ello, puede descargar todo el repositorio como un .zip o utilizar el comando ```git clone``` con el enlace al repositorio.
2. Si no lo tiene aún, instale Node.JS. Para ello, puede ir a la [página oficial de Node.JS](https://nodejs.org/en) y elegir la versión según el sistema operativo que tenga. Es importante elegir alguna que tenga la nomenclatura LTS ya que son las versiones que nos aseguran que van a tener soporte por un largo periodo de tiempo. En nuestro caso, para el proyecto utilizamos la versión 22.11.0.
3. Diríjase a la carpeta donde tenga descargado este proyecto (lo que logró con el paso 1) e inicialice Node.JS con el comando ```npm install```.
4. Corra el servidor con el comando ```npm run start```. Si todo sale bien, por la consola se le indicará que el servidor está corriendo.
5. Ya tiene el servidor en funcionamiento y puede consumir la API. Diríjase a http://localhost:3000/graphql para interactuar con la interfaz de Apollo Studio.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
