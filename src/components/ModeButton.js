import { useState } from "react";

function ModeButton() {
	const [isFakeDark, setIsFakeDark] = useState(false);

	function changeStyle() {
		document.documentElement.classList.toggle("fake-dark-mode");
		setIsFakeDark(!isFakeDark);
	}

	return (
		<button onClick={changeStyle} className="btn-fake-dark-mode">
			{isFakeDark ? "☀️" : "🌙"}
		</button>
	);
}

export default ModeButton;
