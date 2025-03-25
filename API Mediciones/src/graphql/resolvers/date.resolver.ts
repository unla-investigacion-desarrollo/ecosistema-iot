import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    return new Date(value); //Convierte el valor de entrada a Date.
  }

  serialize(value: Date): string {
    return value.toISOString(); //Convierte el valor de salida a formato ISO 8601.
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); //Convierte el valor literal a Date.
    }
    return null;
  }
}
