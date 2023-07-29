import axios from '@/data/apiRoot';

export const getUsers = async (token) => {
  try {
    const config = {
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjQ1MzUxMjQxMzE3Y2E2NTczZmU4YiIsImlhdCI6MTY4OTgxNzcyMywiZXhwIjoxNjg5OTA0MTIzfQ.3APeVqc-jSuYCxXz2khX0zgn1Fh_yshfJlfqnv3DOhQ',
      },
    };
    const res = await axios.get('/users', config);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id) => {
  try {
    const res = await axios.get(`/users/${id}`);
    console.log("entro data:"+res.data)
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (user) => {
  try {
    const res = await axios.post('/users', user);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await axios.put(`/users/${id}`, user);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/users/${id}`);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};
