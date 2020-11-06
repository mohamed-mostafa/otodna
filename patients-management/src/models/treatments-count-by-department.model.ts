import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'treatments_count_by_department'},
  },
})
export class TreatmentsCountByDepartment extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'department_id',
      dataType: 'int',
      dataLength: null,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  departmentId: number;

  @property({
    type: 'string',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {
      columnName: 'treatment_id',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  treatmentId: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    id: true,
    mysql: {
      columnName: 'treatment_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  treatmentName: string;

  @property({
    type: 'number',
    required: true,
    precision: 19,
    scale: 0,
    mysql: {
      columnName: 'count',
      dataType: 'bigint',
      dataLength: null,
      dataPrecision: 19,
      dataScale: 0,
      nullable: 'N',
    },
  })
  count: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
  constructor(data?: Partial<TreatmentsCountByDepartment>) {
    super(data);
  }
}

export interface TreatmentsCountByDepartmentRelations {
  // describe navigational properties here
}

export type TreatmentsCountByDepartmentWithRelations = TreatmentsCountByDepartment &
  TreatmentsCountByDepartmentRelations;
