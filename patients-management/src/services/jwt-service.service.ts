// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {HttpErrors} from '@loopback/rest';
import {TokenService} from '@loopback/authentication';
import {UserProfile, securityId} from '@loopback/security';
import { service, inject } from '@loopback/core';
import { RemoteUsers, RemoteUsersProvider, VerifyTokenInput } from './remote-users.service';

export class JWTService implements TokenService {
  constructor(
    @inject('services.RemoteUsers')
    protected remoteUsers: RemoteUsers,
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }
    try {
      let verifyTokenInput: VerifyTokenInput = {
        token: token,
      }
      return this.remoteUsers.UserController_verifyToken(verifyTokenInput);
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    return "Please generate a token by logging in to /users/login";
  }
}