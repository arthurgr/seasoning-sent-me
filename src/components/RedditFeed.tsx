import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRedditFeed } from "../hooks/useRedditFeed";
import PostCard from "./PostCard";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";

export default function RedditFeed() {
    const [inputValue, setInputValue] = useState("");  // Input field for searching posts
    const [subreddit] = useState("reactjs");  // Always set to 'reactjs'
    const [sort, setSort] = useState<"hot" | "new" | "top">("hot");

    const { posts, fetchPosts, loading, hasMore } = useRedditFeed(subreddit, sort, inputValue);  // Pass inputValue to filter posts
    const observerRef = useRef<HTMLDivElement | null>(null);

    // Debounced update to input search query
    const debouncedSetInputValue = useMemo(
        () =>
            debounce((val: string) => {
                setInputValue(val.trim());
            }, 500),
        []
    );

    useEffect(() => {
        debouncedSetInputValue(inputValue);
        return () => {
            debouncedSetInputValue.cancel();
        };
    }, [inputValue]);

    useEffect(() => {
        fetchPosts(true);
    }, [subreddit, sort, inputValue]);  // Fetch posts when input changes

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchPosts();
                }
            },
            { rootMargin: "100px" }
        );

        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [fetchPosts, hasMore]);

    return (
        <div className="space-y-4 max-w-2xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded w-full sm:w-auto transition-colors duration-200"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search posts..."
                />

                <select
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded transition-colors duration-200"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "hot" | "new" | "top")}
                >
                    <option value="hot">Hot</option>
                    <option value="new">New</option>
                    <option value="top">Top</option>
                </select>
            </div>

            {loading && posts.length === 0 && <p className="text-gray-500">Loading posts...</p>}

            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

            <div ref={observerRef} className="h-10" />

            {loading && posts.length > 0 && (
                <p className="text-center text-gray-400">Loading more...</p>
            )}

            {!loading && !hasMore && posts.length > 0 && (
                <motion.p
                    className="text-center text-green-500 font-medium mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    🎉 That’s all folks! No more posts to load.
                </motion.p>
            )}
        </div>
    );
}
