import { prisma } from "$lib/core/utils/prisma.server";
import { error, type Cookies } from "@sveltejs/kit";
import jwt, { type JwtPayload } from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN = "refreshToken";
const ACCESS_TOKEN = "accessToken";
const ONE_YEAR = 31536000;

const refreshAccessToken = async (cookies: Cookies, platform?: App.Platform) => {
	const refreshToken = cookies.get(REFRESH_TOKEN);
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!refreshToken || !accessToken) {
		throw new Error();
	}

	const { id } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
	const accessPayload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
		ignoreExpiration: true,
	}) as JwtPayload;

	if (id !== accessPayload.id) {
		throw new Error();
	}

	const user = await prisma(platform).user.findUnique({
		where: { id },
	});

	if (!user || user.session !== refreshToken) {
		throw new Error();
	}

	cookies.set(ACCESS_TOKEN, jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: "5m" }), {
		path: "/",
		sameSite: "strict",
		maxAge: ONE_YEAR,
	});

	return user.id;
};

const handleError = async (cookies: Cookies, platform?: App.Platform) => {
	try {
		return await refreshAccessToken(cookies, platform);
	} catch {
		error(401);
	}
};

export const verifyAccessToken = async (cookies: Cookies, platform?: App.Platform) => {
	const accessToken = cookies.get(ACCESS_TOKEN);

	if (!accessToken) {
		error(401);
	}

	try {
		const { id } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
		return id;
	} catch {
		return handleError(cookies, platform);
	}
};

export const setRefreshToken = async (id: number, cookies: Cookies, platform?: App.Platform) => {
	const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
	const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: "5m" });

	cookies.set(REFRESH_TOKEN, refreshToken, { path: "/", sameSite: "strict", maxAge: ONE_YEAR });
	cookies.set(ACCESS_TOKEN, accessToken, { path: "/", sameSite: "strict", maxAge: ONE_YEAR });

	await prisma(platform).user.update({
		where: { id },
		data: { session: refreshToken },
	});
};
