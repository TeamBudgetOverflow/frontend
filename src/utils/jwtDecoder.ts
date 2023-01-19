import jwtDecode from 'jwt-decode';
import { MyToken } from '../interfaces/interfaces';

export const getUserIdFromAccessToken = (token: string) => {
  return jwtDecode<MyToken>(token).userId;
};
