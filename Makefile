test:
	export INTEGRATION_TEST_ENEABLED=false && deno test --allow-env --allow-net

test-integration:
	export INTEGRATION_TEST_ENEABLED=true && deno test --allow-env --allow-net