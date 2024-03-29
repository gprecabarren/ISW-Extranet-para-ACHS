import axios from '@/data/apiRoot';

export const getTasks = async (token) => {
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

export const getTask = async (id) => {
  try {
    const res = await axios.get(`/users/${id}`);
    console.log("entro data:"+res.data)
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (task) => {
  try {
    const res = await axios.post('/users', task);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (id, task) => {
  try {
    const res = await axios.put(`/users/${id}`, task);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`/users/${id}`);
    return res.status === 200 ? res.data : { success: false, data: [] };
  } catch (err) {
    console.log(err);
  }
};
