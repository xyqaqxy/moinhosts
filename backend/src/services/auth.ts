import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const login = async (identifier: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier,
      password,
    }, {
      timeout: 10000, // 设置 10 秒超时
    });
    if (response.data.jwt) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('连接超时，请检查您的网络连接');
      } else if (error.response) {
        console.error('Login error:', error.response.data);
        throw new Error(error.response.data?.error?.message || '登录失败，请检查您的凭据');
      } else if (error.request) {
        console.error('Login error: No response received');
        throw new Error('无法连接到服务器，请确保后端服务正在运行');
      } else {
        console.error('Login error:', error.message);
        throw new Error('发生未知错误，请稍后再试');
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('发生未知错误，请稍后再试');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};