import { PUBLIC_GOOGLE_CLIENT_ID } from "$env/static/public";
import { error, redirect, type Cookies, type ServerLoad } from "@sveltejs/kit";
import { OAuth2Client, type LoginTicket } from "google-auth-library";

const CSRF = "g_csrf_token";
const client = new OAuth2Client();

export const load: ServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, "/");
	}
};

export const login = async (
	{ request, cookies, locals }: { request: Request; cookies: Cookies; locals: App.Locals },
	callback?: (ticket: LoginTicket) => Promise<void>,
) => {
	const { token, ticket } = await getToken({ request, cookies });

	await callback?.(ticket);

	const response = await locals.auth.signInWithIdToken({
		provider: "google",
		token,
	});

	if (response.error) {
		error(400);
	}

	cookies.delete(CSRF, { path: "/" });
	redirect(303, "/");
};

const getToken = async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
	const formData = await request.formData();
	const token = formData.get("credential");
	const csrfBody = formData.get(CSRF);
	const csrfCookie = cookies.get(CSRF);

	if (!csrfBody || csrfBody !== csrfCookie) {
		error(400);
	}

	if (typeof token !== "string") {
		error(400);
	}

	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: PUBLIC_GOOGLE_CLIENT_ID,
	});

	return { token, ticket };
};
