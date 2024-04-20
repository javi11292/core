import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const prisma = (platform: App.Platform | undefined) => {
	if (!platform) {
		return prismaClient;
	}

	if (!prismaClient) {
		const adapter = new PrismaD1(platform.env.DB);
		prismaClient = new PrismaClient({ adapter });
	}

	return prismaClient;
};
