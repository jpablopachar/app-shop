import { IResolvers } from '@graphql-tools/utils';
import { compareSync } from 'bcrypt';
import { Document } from 'mongodb';
import { COLLECTIONS, MESSAGES } from '../../config/constants';
import { findElements, findOneElement } from '../../lib/db-operations';
import { Jwt } from '../../lib/jwt';

const resolversUserQuery: IResolvers = {
  Query: {
    async users (
      _,
      __,
      { db }
    ): Promise<{ status: boolean; message: string; users: Document[] }> {
      try {
        return {
          status: true,
          message: 'User list loaded',
          users: await findElements(db, COLLECTIONS.USERS)
        };
      } catch (error) {
        console.log(error);

        return {
          status: false,
          message: 'Error loading users',
          users: []
        };
      }
    },
    async login (
      _,
      { email, password },
      { db }
    ): Promise<{
      status: boolean;
      message: string;
      token: string | null;
    }> {
      try {
        const user = await findOneElement(db, COLLECTIONS.USERS, { email })

        if (user === null) {
          return {
            status: false,
            message: 'User does not exist',
            token: null
          };
        }

        const passwordCheck = compareSync(password, user.password);

        if (passwordCheck !== null) {
          delete user.password;
          delete user.birthday;
          delete user.registerDate;
        }

        return {
          status: true,
          message:
            !passwordCheck === null ? 'Wrong user and password' : 'User loaded',
          token:
            !passwordCheck === null
              ? null
              : new Jwt().sign({ user: user as any })
        };
      } catch (error) {
        console.log(error);

        return {
          status: false,
          message: 'Error loading user',
          token: null
        };
      }
    },
    me (_, __, { token }) {
      const info = new Jwt().verify(token);

      if (info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
        return {
          status: false,
          message: info,
          user: null
        };
      }

      return {
        status: true,
        message: 'Correct user token',
        user: Object.values(info)[0]
      };
    }
  }
};

export default resolversUserQuery;
