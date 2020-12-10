import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SessionTreatment, SessionTreatmentRelations, ParameterValue} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ParameterValueRepository} from './parameter-value.repository';

export class SessionTreatmentRepository extends DefaultCrudRepository<
  SessionTreatment,
  typeof SessionTreatment.prototype.id,
  SessionTreatmentRelations
> {

  public readonly parameterValues: HasManyRepositoryFactory<ParameterValue, typeof SessionTreatment.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('ParameterValueRepository') protected parameterValueRepositoryGetter: Getter<ParameterValueRepository>,
  ) {
    super(SessionTreatment, dataSource);
    this.parameterValues = this.createHasManyRepositoryFactoryFor('parameterValues', parameterValueRepositoryGetter,);
    this.registerInclusionResolver('parameterValues', this.parameterValues.inclusionResolver);
  }
}
