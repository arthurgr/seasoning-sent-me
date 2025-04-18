import React from "react";
import RedditFeed from "../components/RedditFeed";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center my-4">Reddit Feed</h1>
      <RedditFeed />
    </main>
  );
}
