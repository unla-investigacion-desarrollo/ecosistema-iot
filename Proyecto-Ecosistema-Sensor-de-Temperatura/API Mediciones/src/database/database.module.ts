import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, //Importa ConfigModule para acceder a las variables de entorno.
    MongooseModule.forRootAsync({
      imports: [ConfigModule], //Necesario para acceder a las variables de entorno.
      inject: [ConfigService], //Inyecta el servicio de configuración.
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), //Carga la URI desde .env.
      }),
    }),
  ],
  exports: [MongooseModule], //Exporta la conexión para reutilizarla en otros módulos.
})
export class DatabaseModule {}
