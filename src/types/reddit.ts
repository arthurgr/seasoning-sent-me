export interface RedditPost {
  id: string;
  title: string;
  url: string;
  permalink: string;
  selftext: string;
  imageUrl: string | null; // Add imageUrl field to store image link
}
