export interface KnowledgeFile<T = unknown> {
  path: string;
  title: string;
  kind: string;
  content: T;
}

export interface LoadedKnowledge {
  files: KnowledgeFile[];
}

export function createKnowledgeFile<T>(file: KnowledgeFile<T>) {
  return file;
}
