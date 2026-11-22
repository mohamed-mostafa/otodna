import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'otodna-reference-data', table: 'graph_parameter_axis_point'}
  }
})
export class GraphParameterAxisPoint extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 45,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
    length: 1,
    mysql: {columnName: 'axis', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  axis: boolean;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'parameter_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  parameterId: number;

  @property({
    type: 'boolean',
    required: true,
    length: 1,
    mysql: {columnName: 'active', dataType: 'char', dataLength: 1, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  active: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<GraphParameterAxisPoint>) {
    super(data);
  }
}

export interface GraphParameterAxisPointRelations {
  // describe navigational properties here
}

export type GraphParameterAxisPointWithRelations = GraphParameterAxisPoint & GraphParameterAxisPointRelations;
