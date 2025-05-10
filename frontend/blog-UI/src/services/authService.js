import api from './api';
export const login = creds => api.post('/auth/login', creds).then(res => res.data);
export const register = creds => api.post('/auth/register', creds).then(res => res.data);
