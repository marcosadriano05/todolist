import { TodoError } from "./todo_error.ts";

export class Todo {
  private id: string;
  private title: string;
  private description: string;
  private startDate: Date;
  private finishDate: Date;

  constructor(title: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = "";
    this.startDate = new Date();
    this.finishDate = new Date();
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

  public getStartDate(): Date {
    return this.startDate;
  }

  public setStartDate(date: Date) {
    if (date < new Date()) {
      throw new TodoError("Start date should be greater or equals to now");
    }
    this.startDate = date;
  }

  public setFinishDate(date: Date) {
    if (date <= this.startDate) {
      throw new TodoError("Finish date should be greater than start date");
    }
    this.finishDate = date;
  }
}
