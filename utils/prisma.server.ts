import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const prisma = (platform: App.Platform | undefined) => {
	if (!platform) {
		return prismaClient;
	}

	if (!prismaClient) {
		prismaClient = new PrismaClient();
	}

	return prismaClient;
};
