import {
  AbstractMigration,
  ClientPostgreSQL,
  Info,
} from "../../deps/nessie.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
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
  async down(info: Info): Promise<void> {
    await this.client.queryArray("DROP TABLE todo;");
  }
}
