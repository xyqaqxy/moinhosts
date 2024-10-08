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

export const getCloudApis = async (platformId: number) => {
  const response = await authAxios.get(`/cloud-apis?filters[cloudPlatform][id][$eq]=${platformId}`);
  return response.data;
};

export const createCloudApi = async (apiData: any) => {
  const response = await authAxios.post('/cloud-apis', { data: apiData });
  return response.data;
};

export const updateCloudApi = async (id: number, apiData: any) => {
  const response = await authAxios.put(`/cloud-apis/${id}`, { data: apiData });
  return response.data;
};

export const deleteCloudApi = async (id: number) => {
  const response = await authAxios.delete(`/cloud-apis/${id}`);
  return response.data;
};

export const importApis = async (platformId: number, apiSpecification: string) => {
  // This is a placeholder function. In a real-world scenario, you would parse the API specification
  // and create multiple API entries based on the specification.
  const response = await authAxios.post('/cloud-apis/import', { platformId, apiSpecification });
  return response.data;
};