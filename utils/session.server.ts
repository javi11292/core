import { prisma } from "$lib/core/utils/prisma.server";
import { error, type Cookies } from "@sveltejs/kit";
import { createHmac, randomUUID } from "node:crypto";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const ONE_YEAR = 31536000;

type Event = {
	cookies: Cookies;
	platform: App.Platform | undefined;
};

const generateAccessToken = (session: string) => {
	const data = Buffer.from(JSON.stringify([session, Math.floor(Date.now() / 1000) + 10])).toString(
		"base64",
	);
	const signature = createHmac("sha256", ACCESS_TOKEN_SECRET).update(data).digest("base64");

	return `${data}.${signature}`;
};

const verifyAccessToken = (token: string) => {
	const [data, signature] = token.split(".");

	if (createHmac("sha256", ACCESS_TOKEN_SECRET).update(data).digest("base64") !== signature) {
		throw new Error();
	}

	const [session, expires] = JSON.parse(Buffer.from(data, "base64").toString());

	return { session: session as string, expired: expires < Date.now() / 1000 };
};

const refreshAccessToken = async (session: string, { cookies, platform }: Event) => {
	const refreshToken = cookies.get(REFRESH_TOKEN);
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!refreshToken || !accessToken) {
		throw new Error();
	}

	if (refreshToken !== session) {
		throw new Error();
	}

	const user = await prisma(platform).user.findUnique({
		where: { session },
	});

	if (!user) {
		throw new Error();
	}

	cookies.set(ACCESS_TOKEN, generateAccessToken(session), {
		path: "/",
		sameSite: "strict",
		maxAge: ONE_YEAR,
	});

	return session;
};

export const getSession = async ({ cookies, platform }: Event) => {
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!accessToken) {
		error(401);
	}

	try {
		const { session, expired } = verifyAccessToken(accessToken);
		return expired ? await refreshAccessToken(session, { cookies, platform }) : session;
	} catch {
		error(401);
	}
};

export const setSession = async (id: number, { cookies, platform }: Event) => {
	const refreshToken = randomUUID();
	const accessToken = generateAccessToken(refreshToken);

	cookies.set(REFRESH_TOKEN, refreshToken, { path: "/", sameSite: "strict", maxAge: ONE_YEAR });
	cookies.set(ACCESS_TOKEN, accessToken, { path: "/", sameSite: "strict", maxAge: ONE_YEAR });

	await prisma(platform).user.update({
		where: { id },
		data: { session: refreshToken },
	});
};
