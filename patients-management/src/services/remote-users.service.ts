import {getService} from '@loopback/service-proxy';
import {inject, Provider} from '@loopback/core';
import {UsersDataSource} from '../datasources';
import{UserProfile} from '@loopback/security';

export interface RemoteUsers {
  UserController_verifyToken(args: VerifyTokenInput): Promise<UserProfile>;
}

export interface VerifyTokenInput {
  token: string;
}

export class RemoteUsersProvider implements Provider<RemoteUsers> {
  constructor(
    // users must match the name property in the datasource json file
    @inject('datasources.users')
    protected dataSource: UsersDataSource = new UsersDataSource(),
  ) {}

  value(): Promise<RemoteUsers> {
    return getService(this.dataSource);
  }
}
