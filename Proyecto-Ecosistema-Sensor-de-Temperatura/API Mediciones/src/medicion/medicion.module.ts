import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Medicion, MedicionSchema } from './medicion.schema';
import { MedicionService } from './medicion.service';
import { MedicionResolver } from './medicion.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Medicion.name, schema: MedicionSchema },
    ]),
  ],
  providers: [MedicionResolver, MedicionService],
})
export class MedicionModule {}
