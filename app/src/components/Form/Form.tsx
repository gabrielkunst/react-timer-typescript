import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button/Button";
import style from "./Form.module.scss";
import { Itask } from "../../types/Itask";

interface Props {
  tasks: Itask[];
  setTasks: Dispatch<SetStateAction<Itask[]>>;
}

export default function Form({ tasks, setTasks }: Props) {
  const [task, setTask] = useState<Itask>({
    taskName: "",
    taskTime: "00:00:00",
    selected: false,
    id: 0,
  });

  function createId() {
    let random = Math.floor(Math.random() * 99999999999);
    return random;
  }
  return (
    <form
      className={style.form}
      onSubmit={(e) => {
        e.preventDefault();
        setTasks([...tasks, { ...task, id: createId() }]);
        setTask({
          taskName: "",
          taskTime: "00:00:00",
          selected: false,
          id: 0,
        });
      }}
    >
      <div>
        <label htmlFor="taskName">Digite sua tarefa</label>
        <input
          type="text"
          id="taskName"
          placeholder="Tarefa..."
          value={task.taskName}
          required
          onChange={(e) => setTask({ ...task, taskName: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="taskTime">Insira a duração</label>
        <input
          type="time"
          id="taskName"
          step="1"
          min="00:00:01"
          value={task.taskTime}
          onChange={(e) => setTask({ ...task, taskTime: e.target.value })}
        />
      </div>
      <Button type="submit" text="Adicionar" />
    </form>
  );
}
