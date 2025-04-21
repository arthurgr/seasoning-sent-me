import React from "react";
import { RedditPost } from "../types/reddit";

type Props = {
  post: RedditPost;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="p-4 border border-gray-300 dark:border-gray-600 rounded shadow bg-white dark:bg-gray-800 text-black dark:text-white transition-colors duration-200">
      <a
        href={`https://reddit.com${post.permalink}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        {post.title}
      </a>
    </div>
  );
}
