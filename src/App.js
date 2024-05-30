import Header from "./components/Header";
import Main from "./components/Main";
import Archive from "./components/Archive";
import Footer from "./components/Footer";
import ModeButton from "./components/ModeButton";

import { PostProvider } from "./PostContext";

function App() {
	return (
		<section>
			<ModeButton />
			<PostProvider>
				<Header />
				<Main />
				<Archive />
				<Footer />
			</PostProvider>
		</section>
	);
}

export default App;
