import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DateScalar } from './common/date.resolver';
import { MedicionModule } from './medicion/medicion.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths:
        process.env.NODE_ENV === 'production'
          ? ['./dist/src/graphql/**/*.graphql'] //Ruta para producción.
          : ['./src/graphql/**/*.graphql'], //Ruta para desarrollo.
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }), //Carga las variables de entorno de manera global.
    DatabaseModule, //Usa la conexión a MongoDB con `@nestjs/config`.
    MedicionModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
