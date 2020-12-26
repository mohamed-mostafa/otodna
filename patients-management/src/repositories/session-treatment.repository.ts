import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SessionTreatment, SessionTreatmentRelations, ParameterValue, SessionTreatmentEquipment} from '../models';
import {OltpDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ParameterValueRepository} from './parameter-value.repository';
import {SessionTreatmentEquipmentRepository} from './session-treatment-equipment.repository';

export class SessionTreatmentRepository extends DefaultCrudRepository<
  SessionTreatment,
  typeof SessionTreatment.prototype.id,
  SessionTreatmentRelations
> {

  public readonly parameterValues: HasManyRepositoryFactory<ParameterValue, typeof SessionTreatment.prototype.id>;

  public readonly sessionTreatmentEquipments: HasManyRepositoryFactory<SessionTreatmentEquipment, typeof SessionTreatment.prototype.id>;

  constructor(
    @inject('datasources.oltp_ds') dataSource: OltpDsDataSource, @repository.getter('ParameterValueRepository') protected parameterValueRepositoryGetter: Getter<ParameterValueRepository>, @repository.getter('SessionTreatmentEquipmentRepository') protected sessionTreatmentEquipmentRepositoryGetter: Getter<SessionTreatmentEquipmentRepository>,
  ) {
    super(SessionTreatment, dataSource);
    this.sessionTreatmentEquipments = this.createHasManyRepositoryFactoryFor('sessionTreatmentEquipments', sessionTreatmentEquipmentRepositoryGetter,);
    this.registerInclusionResolver('sessionTreatmentEquipments', this.sessionTreatmentEquipments.inclusionResolver);
    this.parameterValues = this.createHasManyRepositoryFactoryFor('parameterValues', parameterValueRepositoryGetter,);
    this.registerInclusionResolver('parameterValues', this.parameterValues.inclusionResolver);
  }
}
