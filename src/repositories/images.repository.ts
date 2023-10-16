import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Images, ImagesRelations} from '../models';

export class ImagesRepository extends DefaultCrudRepository<
  Images,
  typeof Images.prototype.id,
  ImagesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Images, dataSource);
  }
}
