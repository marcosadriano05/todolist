export class TodoStatus {
  value: "INCOMPLETE" | "READY" | "DOING" | "DONE";

  constructor() {
    this.value = "INCOMPLETE";
  }

  checkStatusByDate(start: Date | undefined, finish: Date | undefined): string {
    if (start === undefined || finish === undefined) {
      return "INCOMPLETE";
    }

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