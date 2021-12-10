interface VideoDetails {
  kind: string;
  videoId?: string;
}

interface SnippetInfo {
  description: string;
  publishTime: string;
}

interface VideoItem {
  id: VideoDetails;
  snippet: SnippetInfo;
}

export interface VideoResponse {
  items: VideoItem[];
}

export interface MediumArticle {
  title: string;
  guid: string;
  pubDate: string;
  thumbnail: string;
}

export interface MediumResponse {
  items: MediumArticle[];
}
