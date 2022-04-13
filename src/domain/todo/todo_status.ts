export class TodoStatus {
  value: "" | "READY" | "DOING" | "DONE";

  constructor() {
    this.value = "";
  }

  checkStatusByDate(start: Date, finish: Date): string {
    const dateNow = new Date(Date.now());
    if (start > dateNow) {
      return "READY";
    }
    if (start <= dateNow && finish > dateNow) {
      return "DOING";
    }

    return "DONE";
  }
}
