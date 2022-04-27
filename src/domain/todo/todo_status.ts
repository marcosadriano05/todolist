export class TodoStatus {
  value: "INCOMPLETE" | "READY" | "DOING" | "DONE";

  constructor() {
    this.value = "INCOMPLETE";
  }

  checkStatusByDate(start?: Date, finish?: Date): string {
    if (start === undefined || finish === undefined) {
      this.value = "INCOMPLETE";
      return this.value;
    }

    const dateNow = new Date();

    if (start > dateNow) {
      this.value = "READY";
      return this.value;
    }
    if (start <= dateNow && finish > dateNow) {
      this.value = "DOING";
      return this.value;
    }
    this.value = "DONE";
    return this.value;
  }
}
