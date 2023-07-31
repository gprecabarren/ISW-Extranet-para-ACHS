import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button color="red" onClick={() => deleteTask(task._id)}>Eliminar</Button>
          <ButtonLink to={`/tasks/${task._id}`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      {/* format date */}
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString("es-CL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <div className="flex gap-x-2 items-center">
          <Button color="green" onClick={() => deleteTask(task._id)}>Aprobar</Button>
          <Button color="red" onClick={() => deleteTask(task._id)}>Rechazar</Button>
      </div>
    </Card>
  );
}
