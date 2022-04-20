test:
	export INTEGRATION_TEST_ENEABLED=false && deno test --unstable --allow-env --allow-net

test-integration:
	export INTEGRATION_TEST_ENEABLED=true && deno test --unstable --allow-env --allow-net --allow-read --allow-write

run:
	deno run --unstable --allow-net --allow-read --allow-write ./src/main/server.ts

migration-create:
	deno run -A --unstable https://deno.land/x/nessie/cli.ts make:migration

migration-run:
	deno run -A --unstable https://deno.land/x/nessie/cli.ts migrate

migration-rollback:
	deno run -A --unstable https://deno.land/x/nessie/cli.ts rollback

seed-create:
	deno run -A --unstable https://deno.land/x/nessie/cli.ts make:seed

seed-run:
	deno run -A --unstable https://deno.land/x/nessie/cli.ts seed