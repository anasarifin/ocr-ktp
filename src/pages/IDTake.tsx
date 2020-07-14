import React from "react";
import Header from "../components/Header";

const IDTake = () => {
	return (
		<div>
			<Header title="Take Photo" center={true} />
			<div>
				<button type="button">e-KTP</button>
				<button type="button">KTP</button>
				<button type="button">Passport</button>
				<button type="button">SIM</button>
			</div>
			<canvas></canvas>
			<p>Position your ID within the light area and make sure the picture is clear and show complete information</p>
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" />
			</svg>
		</div>
	);
};

export default IDTake;
