/**
 * Receive an date and format to YYYY-MM-DD HH:mm:ss
 * @param date
 */
export function formatToDatetime(param: Date | string | undefined): string {
  if (!param) {
    throw new Error("Should be passed a Date or string.");
  }
  let date: Date;
  if (!(param instanceof Date)) {
    date = new Date(param);
  } else {
    date = param;
  }
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return result;
}
