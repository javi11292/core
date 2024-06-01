import { spawnSync } from "node:child_process";

const database = process.argv[2];
const message = process.argv[3];
const remote = process.argv[4];

const CREATE = `wrangler d1 migrations create ${database} ${message}`;
const APPLY = `wrangler d1 migrations apply ${database}`;
const DIFF =
	"prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script --output";

const run = (/** @type {string} */ command) => {
	console.log(`> ${command}\n`);

	const { stdout, stderr } = spawnSync(command, {
		stdio: ["inherit", "pipe", "pipe"],
		shell: true,
	});

	const result = stdout.toString().trim();
	const error = stderr.toString().trim();

	result && console.log(`${result}\n`);
	error && console.error(`${error}\n`);

	return result;
};

if (message) {
	const path = run(CREATE).split(/\n/).at(-1);
	run(`${DIFF} ${path}`);
}

run(remote ? `${APPLY} ${remote}` : APPLY);
