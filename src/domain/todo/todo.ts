import { TodoError } from "./todo_error.ts";
import { TodoStatus } from "./todo_status.ts";

export class Todo {
  private id: string;
  private title: string;
  private description: string;
  private startDate: Date | undefined;
  private finishDate: Date | undefined;
  private status: TodoStatus;

  constructor(title: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = "";
    this.startDate = undefined;
    this.finishDate = undefined;
    this.status = new TodoStatus();
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public getStartDate(): Date | undefined {
    return this.startDate;
  }

  public getFinishDate(): Date | undefined {
    return this.finishDate;
  }

  public setStartDate(date: Date) {
    if (date < new Date()) {
      throw new TodoError("Start date should be greater or equals to now");
    }
    this.startDate = date;
  }

  public setFinishDate(date: Date) {
    if (this.startDate && date <= this.startDate) {
      throw new TodoError("Finish date should be greater than start date");
    }
    this.finishDate = date;
  }

  getStatus(): string {
    if (this.startDate === undefined || this.finishDate === undefined) {
      throw new TodoError(
        "Is needed start and finish date to get Todo status.",
      );
    }
    return this.status.checkStatusByDate(this.startDate, this.finishDate);
  }
}
