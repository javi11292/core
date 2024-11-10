import { SUPABASE_POSTGRES } from "$env/static/private";
import type { DB } from "$lib/types";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";

const dialect = new PostgresDialect({
	pool: new pg.Pool({
		connectionString: SUPABASE_POSTGRES,
	}),
});

export const db = new Kysely<DB>({
	dialect,
});

// export const getTransaction = async <T>(callback: (transaction: Transaction) => Promise<T>) => {
// 	const event = new EventEmitter();

// 	const result = await prisma.$transaction((tx) =>
// 		callback({
// 			prisma: tx,
// 			onTransactionEnd: (handleTransactionEnd) =>
// 				event.once("transactionEnd", handleTransactionEnd),
// 		}),
// 	);

// 	event.emit("transactionEnd");

// 	return result;
// };
