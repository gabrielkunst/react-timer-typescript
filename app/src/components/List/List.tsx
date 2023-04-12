import { Itask } from "../../types/Itask";
import Item from "./Item/Item";
import style from "./List.module.scss";

interface Props {
  tasks: Itask[];
  selectItem: (task: Itask) => void;
}

export default function List({ tasks, selectItem }: Props) {
  return (
    <section className={style.list}>
      <h3>Tarefas</h3>
      <div className={style.itemList}>
        {tasks[0] ? (
          tasks.map((item) => (
            <Item task={item} key={item.id} selectItem={selectItem} />
          ))
        ) : (
          <p className={style.warning}>Adicione uma tarefa!</p>
        )}
      </div>
    </section>
  );
}
