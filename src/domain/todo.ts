import { TodoError } from './todo_error.ts'

export class Todo {
  title: string
  description: string
  private startDate: Date
  private finishDate: Date

  constructor() {
    this.title = ""
    this.description = ""
    this.startDate = new Date()
    this.finishDate = new Date()
  }

  public getStartDate(): Date {
    return this.startDate
  }

  public setStartDate(date: Date) {
    if (date < new Date()) {
      throw new TodoError("Start date should be greater or equals to now")
    }
    this.startDate = date
  }

  public setFinishDate(date: Date) {
    if (date <= this.startDate) {
      throw new TodoError("Finish date should be greater than start date")
    }
    this.finishDate = date
  }
}