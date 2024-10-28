import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "node:events";

export const prisma = new PrismaClient();

export type Transaction = {
	prisma: Parameters<Parameters<typeof prisma.$transaction>[0]>[0];
	onTransactionEnd: (handler: () => void) => void;
};

export const getTransaction = async <T>(callback: (transaction: Transaction) => Promise<T>) => {
	const event = new EventEmitter();

	const result = await prisma.$transaction((tx) =>
		callback({
			prisma: tx,
			onTransactionEnd: (handleTransactionEnd) =>
				event.once("transactionEnd", handleTransactionEnd),
		}),
	);

	event.emit("transactionEnd");

	return result;
};
