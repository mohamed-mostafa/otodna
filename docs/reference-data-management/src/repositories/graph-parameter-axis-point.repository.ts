import {DefaultCrudRepository} from '@loopback/repository';
import {GraphParameterAxisPoint, GraphParameterAxisPointRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class GraphParameterAxisPointRepository extends DefaultCrudRepository<
  GraphParameterAxisPoint,
  typeof GraphParameterAxisPoint.prototype.id,
  GraphParameterAxisPointRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(GraphParameterAxisPoint, dataSource);
  }
}
