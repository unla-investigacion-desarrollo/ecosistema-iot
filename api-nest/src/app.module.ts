import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {ApolloServerPluginLandingPageLocalDefault} from '@apollo/server/plugin/landingPage/default';
import {DateScalar} from './graphql/resolvers/date.resolver';
import {UsuarioResolver} from './graphql/resolvers/usuario.resolver';
import {TarjetaResolver} from './graphql/resolvers/tarjeta.resolver';

@Module(
{
  imports: 
  [
    GraphQLModule.forRoot<ApolloDriverConfig>(
    {
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: 
      {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
  ],
  providers: [DateScalar, UsuarioResolver, TarjetaResolver]
})
export class AppModule{}
