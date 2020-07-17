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

	useEffect(() => {
		const elementSvg = document.getElementsByClassName("svg-container")[0] as SVGElement;
		const elementDiv = document.getElementsByClassName("selfie-frame")[0] as HTMLDivElement;
		const boundSvg = elementSvg.getBoundingClientRect();
		const boundDiv = elementDiv.getBoundingClientRect();
		const frame = document.getElementsByClassName("dummy-frame");
		console.log(elementSvg.getBoundingClientRect());
	}, []);

	return (
		<div className="container">
			<Header title="Take Photo" body="Position your selfie within the light area and make sure both of your face fully visible" center={true} />
			<br />
			<div className="selfie-container">
				{/* <div className="selfie-container dark">
					<Webcam
						audio={false}
						mirrored={true}
						width={"100%"}
						videoConstraints={{
							facingMode: "user",
						}}
					/>
				</div> */}

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
					<div className="dummy-frame" />
					<svg viewBox="0 0 1080 2160">
						<defs>
							<mask id="clipping">
								<rect x="0" y="0" width="100%" height="100%" fill="white" />
								<ellipse cx="540" cy="30%" rx="400" ry="440" fill="black" />
								<rect width="680" height="450" x="200" y="60%" fill="black" />
							</mask>
						</defs>
						<rect x="0" y="0" width="100%" height="100%" mask="url(#clipping)" className="svg-container" fillOpacity="60%" />
					</svg>
					{/* <br />
					<svg className="rectangle" style={{ width: "30vw", height: "17vw" }}>
						
					</svg> */}
					<div className="dummy-frame" />
				</div>

				<div className="button-camera">
					<button
						type="button"
						onClick={() => {
							const wew = document.getElementsByClassName("svg-container")[0] as SVGElement;
							console.log(wew.getBoundingClientRect());
						}}>
						Flashlight
					</button>
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
