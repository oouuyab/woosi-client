import axios from 'axios';
import * as Constant from '../Common/Constant';

export const createUser = (data) =>
  axios({
    data,
    method: 'POST',
    url: Constant.API_HOST + '/user',
  });

export const login = (data) =>
  axios({
    data,
    method: 'POST',
    url: Constant.API_HOST + '/auth/login',
  });
