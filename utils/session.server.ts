import { ACCESS_TOKEN_SECRET } from "$env/static/private";
import { prisma } from "$lib/core/utils/prisma.server";
import { error, type Cookies } from "@sveltejs/kit";
import { Buffer } from "node:buffer";
import { createHmac, randomUUID } from "node:crypto";

const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const ONE_YEAR = 31536000;

type Event = {
	cookies: Cookies;
	platform: App.Platform | undefined;
};

export type User = {
	id: number;
	session: string;
};

const generateAccessToken = (user: User) => {
	const data = Buffer.from(JSON.stringify([user, Math.floor(Date.now() / 1000) + 60])).toString(
		"base64",
	);
	const signature = createHmac("sha256", ACCESS_TOKEN_SECRET).update(data).digest("base64");

	return `${data}.${signature}`;
};

const verifyAccessToken = (token: string) => {
	const [data, signature] = token.split(".");

	if (!data) {
		throw new Error();
	}

	if (createHmac("sha256", ACCESS_TOKEN_SECRET).update(data).digest("base64") !== signature) {
		throw new Error();
	}

	const [user, expires] = JSON.parse(Buffer.from(data, "base64").toString());

	return { user: user as User, expired: expires < Date.now() / 1000 };
};

const refreshAccessToken = async (user: User, { cookies, platform }: Event) => {
	const refreshToken = cookies.get(REFRESH_TOKEN);
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!refreshToken || !accessToken) {
		throw new Error();
	}

	if (refreshToken !== user.session) {
		throw new Error();
	}

	const userFound = await prisma(platform).user.count({
		where: { session: user.session },
	});

	if (!userFound) {
		throw new Error();
	}

	cookies.set(ACCESS_TOKEN, generateAccessToken(user), {
		path: "/",
		sameSite: "strict",
		maxAge: ONE_YEAR,
	});

	return user;
};

export const getSession = async ({ cookies, platform }: Event) => {
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!accessToken) {
		error(401);
	}

	try {
		const { user, expired } = verifyAccessToken(accessToken);
		return expired ? await refreshAccessToken(user, { cookies, platform }) : user;
	} catch {
		error(401);
	}
};

export const setSession = async (id: number, { cookies, platform }: Event) => {
	const refreshToken = randomUUID();
	const accessToken = generateAccessToken({ id, session: refreshToken });

	cookies.set(REFRESH_TOKEN, refreshToken, { path: "/", sameSite: "strict", maxAge: ONE_YEAR });
	cookies.set(ACCESS_TOKEN, accessToken, { path: "/", sameSite: "strict", maxAge: ONE_YEAR });

	await prisma(platform).user.update({
		where: { id },
		data: { session: refreshToken },
	});
};

export const deleteSession = async ({ platform, cookies }: Event) => {
	const { id } = await getSession({ platform, cookies });

	await prisma(platform).user.update({
		where: { id },
		data: { session: null },
	});

	cookies.delete(REFRESH_TOKEN, { path: "/" });
	cookies.delete(ACCESS_TOKEN, { path: "/" });
};
