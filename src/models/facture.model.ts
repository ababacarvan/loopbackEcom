import {Entity, model, property} from '@loopback/repository';

@model()
export class Facture extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;


  constructor(data?: Partial<Facture>) {
    super(data);
  }
}

export interface FactureRelations {
  // describe navigational properties here
}

export type FactureWithRelations = Facture & FactureRelations;
