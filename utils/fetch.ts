const parseResponse = async (response: Response) => {
	const text = await response.text();

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
};

export class NetworkError<T extends { message: string }> extends Error {
	error: T;

	constructor(error: T) {
		super(error.message);
		this.name = "NetworkError";
		this.error = error;
	}
}

export const request = async <T = unknown>(url: string, init: RequestInit = {}): Promise<T> => {
	if (typeof window !== "undefined") {
		init.credentials = "include";
	}

	const response = await fetch(url, init);
	const data = await parseResponse(response);

	if (!response.ok) {
		throw new NetworkError(data);
	}

	return data;
};

export const get = <T = unknown>(url: string, init?: RequestInit) => {
	return request<T>(url, init);
};

export const post = <T = unknown>(url: string, body?: object, init?: RequestInit) => {
	return request<T>(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body && JSON.stringify(body),
		...init,
	});
};

export const upload = (
	url: string,
	data: Record<string, string | Blob | FileList>,
	init?: RequestInit,
) => {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (value instanceof FileList) {
			for (const file of value) {
				formData.append(key, file);
			}

			return;
		}
		formData.append(key, value);
	});

	return request(url, {
		method: "POST",
		body: formData,
		...init,
	});
};
