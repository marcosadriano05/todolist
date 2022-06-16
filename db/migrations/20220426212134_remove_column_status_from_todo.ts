import { nessie} from "../../deps.ts";

export default class extends nessie.AbstractMigration<nessie.ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: nessie.Info): Promise<void> {
    await this.client.queryArray("ALTER TABLE todo DROP COLUMN status;");
  }

  /** Runs on rollback */
  async down(info: nessie.Info): Promise<void> {
    await this.client.queryArray("ALTER TABLE todo ADD status TEXT;");
  }
}
