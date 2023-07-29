'use client';
import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '@/data/usersData';
import { useRouter } from 'next/navigation';

const EditButton = ({ id }) => {
  const { push } = useRouter();
  return (
    <button
      onClick={() => push(`/users/new/${id}`)}
      className="m-1 inline-block hover:bg-green-500 bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Editar
    </button>
  );
};

const DeleteButton = ({ id, onUserDeleted }) => {
  const { push } = useRouter();
  const handleDelete = async () => {
    try {
      await deleteUser(id);
      onUserDeleted();
      push('/users');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="m-1 inline-block hover:bg-red-500 bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Eliminar
    </button>
  );
};

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);

  const handleUserDeleted = () => {
    setUserDeleted(!userDeleted); // Invierte el valor de userDeleted para desencadenar el efecto
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res.state == "Success") {
        setUsers(res.data);
        console.log(res.data);
      }
    });
  }, [userDeleted]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {users.length > 0 ? (
        <ul className="space-y-4">
          {users?.map((user) => (
            <li key={user._id}>
              <h2 className="text-lg font-bold">{user.name}</h2>
              <p>{user.description}</p>
              <EditButton
                id={user._id}
                title={user.name}
                description={user.email}
              />
              <DeleteButton id={user._id} onUserDeleted={handleUserDeleted} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay tareas disponibles.</p>
      )}
    </div>
  );
};
