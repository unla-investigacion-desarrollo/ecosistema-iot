/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Medicion extends Document {
  @Prop({ required: true })
  fechaHora: Date;

  @Prop({ required: true })
  temperatura: number;

  @Prop({ required: true })
  humedad: number;
}

export const MedicionSchema = SchemaFactory.createForClass(Medicion);
