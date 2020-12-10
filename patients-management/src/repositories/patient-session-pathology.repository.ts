import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PatientSessionPathology, PatientSessionPathologyRelations, ParameterValue} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ParameterValueRepository} from './parameter-value.repository';

export class PatientSessionPathologyRepository extends DefaultCrudRepository<
  PatientSessionPathology,
  typeof PatientSessionPathology.prototype.id,
  PatientSessionPathologyRelations
> {

  public readonly parameterValues: HasManyRepositoryFactory<ParameterValue, typeof PatientSessionPathology.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('ParameterValueRepository') protected parameterValueRepositoryGetter: Getter<ParameterValueRepository>,
  ) {
    super(PatientSessionPathology, dataSource);
    this.parameterValues = this.createHasManyRepositoryFactoryFor('parameterValues', parameterValueRepositoryGetter,);
    this.registerInclusionResolver('parameterValues', this.parameterValues.inclusionResolver);
  }
}
