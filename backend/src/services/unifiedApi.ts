import axios from 'axios';
import { getCurrentUser } from './auth';

const API_URL = 'http://localhost:1337/api';

const authAxios = axios.create({
  baseURL: API_URL,
});

authAxios.interceptors.request.use((config) => {
  const user = getCurrentUser();
  if (user && user.jwt) {
    config.headers['Authorization'] = `Bearer ${user.jwt}`;
  }
  return config;
});

export const callUnifiedApi = async (platformId: number, apiId: number, params: any) => {
  try {
    const response = await authAxios.post('/unified-api-call', { platformId, apiId, params });
    return response.data;
  } catch (error) {
    console.error('Error calling unified API:', error);
    throw error;
  }
};