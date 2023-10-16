import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Facture, FactureRelations} from '../models';

export class FactureRepository extends DefaultCrudRepository<
  Facture,
  typeof Facture.prototype.id,
  FactureRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Facture, dataSource);
  }
}
