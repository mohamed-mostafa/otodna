import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {
      schema: 'otodna-patients',
      table: 'pathologies_count_by_department',
    },
  },
})
export class PathologiesCountByDepartment extends Entity {
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
      columnName: 'desease_id',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: 10,
      dataScale: 0,
      nullable: 'N',
    },
  })
  deseaseId: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    id: true,
    mysql: {
      columnName: 'desease_name',
      dataType: 'varchar',
      dataLength: 45,
      dataPrecision: null,
      dataScale: null,
      nullable: 'N',
    },
  })
  deseaseName: string;

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

  constructor(data?: Partial<PathologiesCountByDepartment>) {
    super(data);
  }
}

export interface PathologiesCountByDepartmentRelations {
  // describe navigational properties here
}

export type PathologiesCountByDepartmentWithRelations = PathologiesCountByDepartment &
  PathologiesCountByDepartmentRelations;
