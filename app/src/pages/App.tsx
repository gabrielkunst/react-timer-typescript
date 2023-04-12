import { useEffect, useState } from "react";
import Form from "../components/Form/Form";
import style from "./App.module.scss";
import { Itask } from "../types/Itask";
import List from "../components/List/List";
import Timer from "../components/Timer/Timer";

export default function App() {
  const tasksFromLocalStorage = window.localStorage.getItem("tasks");
  const tasksLocal = tasksFromLocalStorage
    ? JSON.parse(tasksFromLocalStorage)
    : [];
  const [tasks, setTasks] = useState<Itask[]>(tasksLocal);
  const [selected, setSelected] = useState<Itask>();
  const [isDone, setAsDone] = useState<Itask>();

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    resetSelected();
  }, []);

  function resetSelected() {
    if (!(tasks.length === 0)) {
      const updatedTasks = tasks.map((item) => {
        return { ...item, selected: false };
      });
      setTasks(updatedTasks);
    }
  }

  function selectItem(task: Itask) {
    const updatedTasks = tasks?.map((item) => {
      if (item.id === task.id) {
        if (item.selected === false) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      } else {
        return { ...item, selected: false };
      }
    });
    setSelected(task);
    setTasks(updatedTasks);
  }

  function setDone(task: Itask | undefined) {
    const updatedTasks = tasks?.filter((item) => {
      return item.id != task?.id;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className={style.App}>
      <Form tasks={tasks} setTasks={setTasks} />
      <List tasks={tasks} selectItem={selectItem} />
      <Timer selected={selected} setDone={setDone} setSelected={setSelected} />
    </div>
  );
}
