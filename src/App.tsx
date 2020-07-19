import React, { useState, useEffect } from "react";
import Main from "./pages/Main";
import "./styles/Main.css";
import { isMobile } from "mobile-device-detect";

const App = () => {
	const [xx, xxx] = useState("");

	useEffect(() => {
		window.addEventListener("resize", () => {
			if (document.activeElement.tagName === "INPUT") {
				xxx(window.innerWidth + " x " + window.innerHeight);
			}
		});
	}, []);

	useEffect(() => {
		window.onbeforeunload = function () {
			return true;
		};
	});
	return (
		<div>
			{isMobile ? (
				<>
					<span id="xxx">{xx}</span>
					<Main />
				</>
			) : (
				<div>Sorry, this site just support for mobile version only.</div>
			)}
		</div>
	);
};

export default App;
