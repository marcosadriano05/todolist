import { AbstractMigration, ClientSQLite, Info } from "../../deps.ts";

export default class extends AbstractMigration<ClientSQLite> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.query(`CREATE TABLE todo (
			id STRING,
			title VARCHAR(255),
			description STRING,
			start_date DATETIME,
			finish_date DATETIME,
			status STRING,
			PRIMARY KEY (id)
		);`);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.query("DROP TABLE todo;");
  }
}
