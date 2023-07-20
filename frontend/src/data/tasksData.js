import axios from '@/data/apiRoot';

export const getTasks = async (token) => {
  try {
    const config = {
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzNmMTJjMzFlOWFhMTY0NGIwYzAzMCIsImlhdCI6MTY4OTM5Mzk0NCwiZXhwIjoxNjg5NDgwMzQ0fQ.aPLj5i3hLr9sWHYQeEvypeNwt_K-beYzQrq9N-nvEWs',
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
