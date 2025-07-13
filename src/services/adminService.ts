import api from './api';

export const getCars = async () => {
  const response = await api.get('/admin/cars');
  return response.data;
};

export const createCar = async (data: any) => {
  const response = await api.post('/admin/cars', data);
  return response.data;
};

export const updateCar = async (id: string, data: any) => {
  const response = await api.put(`/admin/cars/${id}`, data);
  return response.data;
};

export const deleteCar = async (id: string) => {
  const response = await api.delete(`/admin/cars/${id}`);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/admin/orders');
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await api.put(`/admin/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};