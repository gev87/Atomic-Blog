import { createContext, useState } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Archive from "./components/Archive";
import Footer from "./components/Footer";

import { createRandomPost } from "./helpers";
import ModeButton from "./components/ModeButton";

export const PostContext = createContext();

function App() {
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

	return (
		<PostContext.Provider
			value={{
				posts: searchedPosts,
				onClearPosts: handleClearPosts,
				onAddPost: handleAddPost,
				searchQuery,
				setSearchQuery,
			}}
		>
			<section>
				<ModeButton />
				<Header />
				<Main />
				<Archive />
				<Footer />
			</section>
		</PostContext.Provider>
	);
}

export default App;
