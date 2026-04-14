import path from "node:path";

// Directory where files are stored
export const UPLOAD_DIR_NAME = "uploads";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ALLOWED_EXTENSIONS = new Set([
	".md",
	".png",
	".jpg",
	".jpeg",
	".gif",
]);

/** Canonical MIME stored in DB (derived from extension after allowlist). */
export const MIME_FOR_EXTENSION: Record<string, string> = {
	".md": "text/markdown",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".gif": "image/gif",
};

export function canonicalMimeForExtension(extWithDotLower: string): string | null {
	return MIME_FOR_EXTENSION[extWithDotLower] ?? null;
}

export function extensionWithDot(originalFilename: string): string {
	return path.extname(originalFilename).toLowerCase();
}
