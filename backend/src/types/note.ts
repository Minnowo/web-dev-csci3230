export type Note = {
	id: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
};

export type NoteListItem = {
	id: number;
	title: string;
	updated_at: string;
};

export type NoteLink = {
	from_note_id: number;
	to_note_id: number;
};
