import { TodoError } from "./todo_error.ts";
import { TodoStatus } from "./todo_status.ts";

export class Todo {
  private id: string;
  private title: string;
  private description: string;
  private startDate?: Date;
  private finishDate?: Date;
  private status: TodoStatus;

  constructor(title: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = "";
    this.startDate = undefined;
    this.finishDate = undefined;
    this.status = new TodoStatus();
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getStartDate(): Date | undefined {
    return this.startDate;
  }

  getFinishDate(): Date | undefined {
    return this.finishDate;
  }

  setStartDate(date: Date | string) {
    if (typeof date === "string") {
      date = new Date(date);
    }
    const errorMarginDate5ms = new Date(Date.now() - 5);
    if (date < errorMarginDate5ms) {
      throw new TodoError("Start date should be greater or equals to now.");
    }
    this.startDate = date;
  }

  setFinishDate(date: Date | string) {
    if (typeof date === "string") {
      date = new Date(date);
    }
    if (this.startDate && date < this.startDate) {
      throw new TodoError(
        "Finish date should be greater or equals than start date.",
      );
    }
    this.finishDate = date;
  }

  getStatus(): string {
    return this.status.checkStatusByDate(this.startDate, this.finishDate);
  }
}
