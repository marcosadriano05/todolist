import {
  AbstractMigration,
  ClientSQLite,
  Info,
} from "https://deno.land/x/nessie@2.0.5/mod.ts";

export default class extends AbstractMigration<ClientSQLite> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.query("ALTER TABLE todo DROP COLUMN status;");
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.query("ALTER TABLE todo ADD status STRING;");
  }
}
