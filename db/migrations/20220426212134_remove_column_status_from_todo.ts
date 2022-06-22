import {
  AbstractMigration,
  ClientPostgreSQL,
  Info,
} from "../../deps/nessie.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.queryArray("ALTER TABLE todo DROP COLUMN status;");
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.queryArray("ALTER TABLE todo ADD status TEXT;");
  }
}
