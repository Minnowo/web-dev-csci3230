import type { Note } from "./note.js";

export type Folder = {
	id: number;
	parent_folder_id: number | null;
	name: string;
};

export type FolderChildren = {
	files: Note[];
	folders: Folder[];
};
