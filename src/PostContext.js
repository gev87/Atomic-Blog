import { createContext, useContext, useMemo, useState } from "react";

import { createRandomPost } from "./helpers";

// creating a context
const PostContext = createContext();

function PostProvider({ children }) {
	const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()));
	const [searchQuery, setSearchQuery] = useState("");

	// Derived state. These are the posts that will actually be displayed
	const searchedPosts =
		searchQuery.length > 0
			? posts.filter((post) =>
					`${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase())
			  )
			: posts;

	function handleAddPost(post) {
		setPosts((posts) => [post, ...posts]);
	}

	function handleClearPosts() {
		setPosts([]);
	}

	const value = useMemo(()=>({
				posts: searchedPosts,
				onClearPosts: handleClearPosts,
				onAddPost: handleAddPost,
				searchQuery,
				setSearchQuery,
			}),[searchQuery, searchedPosts])

	return (
		<PostContext.Provider
			value={value}
		>
			{children}
		</PostContext.Provider>
	);
}
// lets create simple hook for this context
function usePosts() {
	const context = useContext(PostContext);
	if (context === undefined) {
		throw new Error("PostContext was used outside of the PostProvider");
	}
	return context;
}

export { PostProvider, usePosts };
