import { nessie } from "../../deps.ts";

export default class extends nessie.AbstractMigration<nessie.ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: nessie.Info): Promise<void> {
    await this.client.queryArray(`CREATE TABLE todo (
			id UUID,
			title VARCHAR(255),
			description TEXT,
			start_date TIMESTAMP,
			finish_date TIMESTAMP,
			status TEXT,
			PRIMARY KEY (id)
		);`);
  }

  /** Runs on rollback */
  async down(info: nessie.Info): Promise<void> {
    await this.client.queryArray("DROP TABLE todo;");
  }
}
