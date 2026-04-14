// Metadata for uploaded file (binary lives on disk at `storage_path`). 
export type FileAsset = {
	id: number;
	user_id: number;
	note_id: number | null;
	folder_id: number | null;
	original_name: string;
	stored_name: string;
	mime_type: string;
	extension: string | null;
	size_bytes: number;
	// Relative path under the app uploads directory, e.g. `12/uuid.png`. 
	storage_path: string;
	created_at: string;
};
