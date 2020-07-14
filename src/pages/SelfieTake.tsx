import React, { useEffect, useRef } from "react";
import SelfieReview from "./SelfieReview";
import Header from "../components/Header";
import Webcam from "react-webcam";
import "../styles/SelfieTake.css";

const SelfieTake = () => {
	const webcamRef = useRef();

	const onShotCamera = () => {
		const container = document.getElementsByClassName("selfie-container")[0] as HTMLDivElement;
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const context = canvas.getContext("2d");
		const img = new Image();

		img.src = webcamRef.current.getScreenshot();
		img.onload = function () {
			canvas.style.width = container.offsetWidth + "px";
			canvas.style.width = container.offsetHeight + "px";
			context.drawImage(img, 0, 0, container.offsetWidth, container.offsetHeight);
		};
	};

	return (
		<div className="container">
			<Header title="Take Photo" body="Position your selfie within the light area and make sure both of your face fully visible" center={true} />
			<br />
			<div className="selfie-container">
				<div className="selfie-container dark">
					<Webcam
						audio={false}
						mirrored={true}
						width={"100%"}
						videoConstraints={{
							facingMode: "user",
						}}
					/>
				</div>

				<div className="selfie-container main">
					<Webcam
						audio={false}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						mirrored={true}
						width={"100%"}
						screenshotQuality={1}
						videoConstraints={{
							facingMode: "user",
						}}
					/>
				</div>

				<div className="selfie-frame">
					<svg viewBox="0 0 100 200" className="ellipse" style={{ height: "40vh" }}>
						<ellipse cx="50" cy="100" rx="50" ry="55" />
					</svg>
					<br />
					<svg className="rectangle" style={{ width: "30vw", height: "17vw" }}>
						<rect width="100%" height="100%" />
					</svg>
				</div>

				<div className="button-camera">
					<button type="button">Flashlight</button>
					<button type="button" onClick={onShotCamera}>
						Click
					</button>
					<button type="submit">Switch</button>
				</div>
			</div>

			<div className="container">
				<SelfieReview />
			</div>
		</div>
	);
};

export default SelfieTake;
