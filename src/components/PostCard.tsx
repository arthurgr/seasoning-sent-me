import React from "react";
import { RedditPost } from "../types/reddit";

type Props = {
  post: RedditPost;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="p-4 border rounded shadow">
      <a
        href={`https://reddit.com${post.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        {post.title}
      </a>
    </div>
  );
}
