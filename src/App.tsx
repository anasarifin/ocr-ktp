import React, { useState, useEffect } from "react";
import Main from "./pages/Main";
import "./styles/Main.css";
import { isMobile } from "mobile-device-detect";
import axios from "axios";

const App = () => {
	useEffect(() => {
		axios
			.get("https://18.212.147.11:3000/test")
			.then((resolve) => {
				console.log(resolve.data);
			})
			.catch((reject) => {
				console.log(reject);
			});
	}, []);

	useEffect(() => {
		window.onbeforeunload = function () {
			return true;
		};
	});

	return <div>{isMobile ? <Main /> : <div>Sorry, this site just support for mobile version only.</div>}</div>;
};

export default App;
