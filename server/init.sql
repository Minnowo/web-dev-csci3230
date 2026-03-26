CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS note_embeddings (
  note_id TEXT PRIMARY KEY,
  embedding vector(3072),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
