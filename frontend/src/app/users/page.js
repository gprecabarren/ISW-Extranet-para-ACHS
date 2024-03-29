import React from 'react';
import { TaskList } from './UserList';
import Link from 'next/link';

const Button = () => (
  <Link href="/tasks/new">
    <span className="inline-block hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
      Crear nuevo u
    </span>
  </Link>
);

const Tasks = () => {
  return (
    <section>
      <Button />
      <TaskList />
    </section>
  );
};

export default Tasks;
