// User uploaded file, links to notes are via markdown URLs
export type FileAsset = {
	id: number;
	user_id: number;
	original_name: string;
	stored_name: string;
	mime_type: string;
	extension: string | null;
	size_bytes: number;
	
	// Relative path under the app uploads directory 
	storage_path: string;
	created_at: string;
};
