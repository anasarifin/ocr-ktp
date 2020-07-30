import React, { useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import "../styles/SignatureTake.css";

const SignatureTake = () => {
	useEffect(() => {
		document.addEventListener(
			"backbutton",
			(e) => {
				e.preventDefault();
				alert("mencet");
			},
			false,
		);
	}, []);

	return (
		<div className="container">
			<SignatureCanvas penColor="black" canvasProps={{ className: "sigCanvas" }} />
		</div>
	);
};

export default SignatureTake;
