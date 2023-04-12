export function toSeconds(value: string | undefined) {
  const [hour, minutes, seconds] = (value ?? "").split(":");
  const hourInSeconds = Number(hour) * 3600;
  const minutesInSeconds = Number(minutes) * 60;
  return hourInSeconds + minutesInSeconds + Number(seconds);
}
