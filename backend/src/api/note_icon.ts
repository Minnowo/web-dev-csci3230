// Prevents users from uploading massive strings that bloat the database
export const MAX_NOTE_ICON_LENGTH = 64;

export type ParsedIconCreate = string | null;
export type ParsedIconUpdate = string | null | undefined;


function validateIconString(icon: string): string | null | { error: string } {
    const trimmedIcon = icon.trim();
    if (trimmedIcon.length === 0) {
        return null;
    }
    if (trimmedIcon.length > MAX_NOTE_ICON_LENGTH) {
        return { error: `icon must be at most ${MAX_NOTE_ICON_LENGTH} characters` };
    }
    return trimmedIcon;
}

export function parseIconForCreate(icon: unknown): ParsedIconCreate | { error: string } {
    if (icon === undefined || icon === null) {
        return null;
    }
    if (typeof icon !== "string") {
        return { error: "icon must be a string or null" };
    }
    return validateIconString(icon);
}

export function parseIconForUpdateBody(body: { icon?: unknown }): ParsedIconUpdate | { error: string } {
    if (!("icon" in body)) {
        return undefined; 
    }
    
    const icon = body.icon;
    if (icon === null) {
        return null;
    }
    if (typeof icon !== "string") {
        return { error: "icon must be a string or null" };
    }
    return validateIconString(icon);
}