import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const prisma = (
	platform: App.Platform | undefined,
	key: keyof App.Platform["env"] = "DB",
) => {
	if (!platform) {
		return prismaClient;
	}

	if (!prismaClient) {
		const adapter = new PrismaD1(platform.env[key]);
		prismaClient = new PrismaClient({ adapter });
	}

	return prismaClient;
};
