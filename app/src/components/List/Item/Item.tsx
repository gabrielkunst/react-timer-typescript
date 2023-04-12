import classNames from "classnames";
import { Itask } from "../../../types/Itask";
import style from "./Item.module.scss";

interface Props {
  task: Itask;
  selectItem: (task: Itask) => void;
}

export default function Item({ task, selectItem }: Props) {
  return (
    <article
      className={classNames({
        [style.item]: true,
        [style.selected]: task.selected,
      })}
      onClick={() => selectItem(task)}
    >
      <input type="text" value={task.taskName} readOnly />
      <span>{task.taskTime}</span>
    </article>
  );
}
