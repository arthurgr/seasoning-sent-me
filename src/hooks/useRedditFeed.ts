import { useState, useCallback } from "react";
import { RedditPost } from "../types/reddit";

export function useRedditFeed(subreddit: string, sort: string, query: string) {
    const [posts, setPosts] = useState<RedditPost[]>([]);
    const [after, setAfter] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = useCallback((reset = false) => {
        if (loading) return;

        setLoading(true);
        const afterParam = !reset && after ? `&after=${after}` : "";
        const queryParam = query ? `&q=${query}` : "";  // Add query parameter for filtering posts

        fetch(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=10${afterParam}${queryParam}`)
            .then((res) => res.json())
            .then((data) => {
                const newPosts = data.data.children.map((child: any) => ({
                    id: child.data.id,
                    title: child.data.title,
                    url: child.data.url,
                    permalink: child.data.permalink,
                }));

                setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
                setAfter(data.data.after);
                setHasMore(data.data.after !== null);
            })
            .finally(() => setLoading(false));
    }, [after, subreddit, sort, loading, query]);

    return { posts, fetchPosts, loading, hasMore };
}
