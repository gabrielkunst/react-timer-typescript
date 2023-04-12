import { useEffect, useState } from "react";
import { Itask } from "../../types/Itask";
import Button from "../Button/Button";
import style from "./Timer.module.scss";
import { toSeconds } from "../../util/Functions";

interface Props {
  selected: Itask | undefined;
  setDone: (task: Itask | undefined) => void;
  setSelected: (selected: Itask | undefined) => void;
}

export default function Timer({ selected, setSelected, setDone }: Props) {
  const [time, setTime] = useState<number>(0);
  const [isActive, setActive] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selected?.taskTime) {
      setTime(() => toSeconds(selected.taskTime));
      setActive(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [selected]);

  let hour = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  function onComplete() {
    alert("Tarefa concluída!");
    setActive(false);
    setDone(selected);
    setSelected(undefined);
  }

  function countdown(
    time: number,
    setTime: (value: number) => void,
    onComplete: () => void
  ) {
    let remainingTime = time;

    const newIntervalId = setInterval(() => {
      remainingTime--;

      if (remainingTime >= 0) {
        setTime(remainingTime);
      } else {
        clearInterval(newIntervalId);
        onComplete();
      }
    }, 1000);

    setIntervalId(newIntervalId);
  }

  const handleClick = () => {
    if (selected) {
      if (isActive) {
        setActive(false);
        clearInterval(intervalId as NodeJS.Timeout);
        setIntervalId(null);
      } else {
        countdown(time, setTime, onComplete);
        setActive(true);
      }
    } else {
      alert("Selecione uma tarefa!");
    }
  };

  return (
    <section className={style.timer}>
      <h3>Escolha um item para começar!</h3>
      <div className={style.clock}>
        <span className={style.number}>
          {String(hour).padStart(2, "0") || "00"}
        </span>
        <span className={style.dots}>:</span>
        <span className={style.number}>
          {String(minutes).padStart(2, "0") || "00"}
        </span>
        <span className={style.dots}>:</span>
        <span className={style.number}>
          {String(seconds).padStart(2, "0") || "00"}
        </span>
      </div>
      <Button
        type="button"
        text={isActive ? "Parar" : "Começar"}
        onClick={handleClick}
      />
    </section>
  );
}
