type Env = "development" | "staging" | "production";

const DEFAULT_BASES: Record<Env, string> = {
	development: "http://localhost:3000/api/",
	staging: "https://staging.ezquran.my/api/",
	production: "https://ezquran.my/api/",
};

function normalizeEnv(raw: string | undefined): Env {
	const v = (raw || "").toLowerCase();
	if (v === "staging") return "staging";
	if (v === "production") return "production";
	return "development";
}

export function getAppEnv(): Env {
	// Vite exposes mode via import.meta.env.MODE and any custom vars via import.meta.env.VITE_*
	// Priority: explicit VITE_APP_ENV -> MODE -> default to development
	const explicit = (import.meta as any).env?.VITE_APP_ENV as | string | undefined;
	const mode = (import.meta as any).env?.MODE as string | undefined;
	if (explicit) return normalizeEnv(explicit);
	if (mode) return normalizeEnv(mode);
	return "development";
}

export function getBaseUrl(): string {
	const envVars = (import.meta as any).env || {};
	const override = envVars.VITE_API_BASE as string | undefined;
	if (override && override.length > 0) {
		return override.endsWith("/") ? override : override + "/";
	}
	return DEFAULT_BASES[getAppEnv()];
}

async function handleResponse(res: Response) {
	const contentType = res.headers.get("content-type") || "";
	const isJson = contentType.includes("application/json");
	const body = isJson
		? await res.json().catch(() => null)
		: await res.text().catch(() => null);
	if (!res.ok) {
		const err: any = new Error(`API error ${res.status} ${res.statusText}`);
		err.status = res.status;
		err.body = body;
		throw err;
	}
	return body;
}

function withBase(path: string) {
	// Allow absolute URLs to pass through
	try {
		const maybeUrl = new URL(path);
		return maybeUrl.toString();
	} catch (e) {
		return new URL(path.replace(/^\//, ""), getBaseUrl()).toString();
	}
}

export async function apiRequest(path: string, init?: RequestInit) {
	const url = withBase(path);
	const res = await fetch(url, init);
	return handleResponse(res);
}

export const api = {
	get: (path: string, headers?: HeadersInit) =>
		apiRequest(path, { method: "GET", headers }),
	post: (path: string, body?: any, headers?: HeadersInit) =>
		apiRequest(path, {
			method: "POST",
			headers: { "Content-Type": "application/json", ...(headers || {}) },
			body: body ? JSON.stringify(body) : undefined,
		}),
	put: (path: string, body?: any, headers?: HeadersInit) =>
		apiRequest(path, {
			method: "PUT",
			headers: { "Content-Type": "application/json", ...(headers || {}) },
			body: body ? JSON.stringify(body) : undefined,
		}),
    patch: (path: string, body?: any, headers?: HeadersInit) =>
		apiRequest(path, {
			method: "PATCH",
			headers: { "Content-Type": "application/json", ...(headers || {}) },
			body: body ? JSON.stringify(body) : undefined,
		}),
	delete: (path: string, headers?: HeadersInit) =>
		apiRequest(path, { method: "DELETE", headers }),
};

export default api;
