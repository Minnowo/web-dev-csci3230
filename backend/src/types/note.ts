export type Note = {
	id: number;
	folder_id: number | null;
	title: string;
	content: string;
	icon: string | null;
	created_at: string;
	updated_at: string;
};

export type NoteListItem = {
	id: number;
	folder_id: number | null;
	title: string;
	icon: string | null;
	updated_at: string;
	tags: string[];
};

export type NoteLink = {
	from_note_id: number;
	to_note_id: number;
};
