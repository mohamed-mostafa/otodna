import {DefaultCrudRepository} from '@loopback/repository';
import {ProblemStatus, ProblemStatusRelations} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProblemStatusRepository extends DefaultCrudRepository<
  ProblemStatus,
  typeof ProblemStatus.prototype.id,
  ProblemStatusRelations
> {
  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource,
  ) {
    super(ProblemStatus, dataSource);
  }
}
