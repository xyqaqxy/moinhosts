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

export const getCloudPlatforms = async () => {
  const response = await authAxios.get('/cloud-platforms');
  return response.data;
};

export const createCloudPlatform = async (platformData: any) => {
  const response = await authAxios.post('/cloud-platforms', { data: platformData });
  return response.data;
};

export const updateCloudPlatform = async (id: number, platformData: any) => {
  const response = await authAxios.put(`/cloud-platforms/${id}`, { data: platformData });
  return response.data;
};

export const deleteCloudPlatform = async (id: number) => {
  const response = await authAxios.delete(`/cloud-platforms/${id}`);
  return response.data;
};