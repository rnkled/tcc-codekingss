import api from './api';
import { AxiosResponse } from 'axios';

export function signIn(email: string, password: string): Promise<AxiosResponse> {
    return api.post('/authenticate', {
        "email": email,
        "password": password
      })
  }