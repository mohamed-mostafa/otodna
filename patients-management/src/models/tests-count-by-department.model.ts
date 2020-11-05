import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-patients', table: 'tests_count_by_department'}
  }
})
export class TestsCountByDepartment extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'department_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  departmentId: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    id: true,
    mysql: {columnName: 'test_name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  testName: string;

  @property({
    type: 'number',
    required: true,
    precision: 19,
    scale: 0,
    mysql: {columnName: 'count', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'N'},
  })
  count: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TestsCountByDepartment>) {
    super(data);
  }
}

export interface TestsCountByDepartmentRelations {
  // describe navigational properties here
}

export type TestsCountByDepartmentWithRelations = TestsCountByDepartment & TestsCountByDepartmentRelations;
