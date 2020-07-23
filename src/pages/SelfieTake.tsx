import React, { useState, useEffect, useRef } from "react";
import SelfieReview from "./SelfieReview";
import Header from "../components/Header";
import Webcam from "react-webcam";
import "../styles/SelfieTake.css";

const SelfieTake = ({ close }: Props) => {
	const [position2nd, setPosition2nd] = useState(0);
	const [image, setImage] = useState("");
	const webcamRef = useRef();

	const onShoot = () => {
		const image = webcamRef.current.getScreenshot();
		setImage(image);
		setPosition2nd(1);
		console.log(image);
	};

	return (
		<div className="container">
			<Header title="Take Photo" body="Position your selfie within the light area and make sure both of your face fully visible" center={true} />
			<br />
			<div className="selfieCam-container" style={{ height: (window.innerWidth / 9) * 16 }}>
				<Webcam
					audio={false}
					ref={webcamRef}
					forceScreenshotSourceSize={true}
					screenshotFormat="image/png"
					mirrored={true}
					width={"100%"}
					screenshotQuality={1}
					videoConstraints={{
						facingMode: "user",
					}}
				/>
			</div>
			<div className="button-camera-selfie">
				<svg className="shutter-button" height="100" width="100" onClick={onShoot}>
					<circle cx="50" cy="50" r="40" fill="red" />
				</svg>
			</div>
			<div className={"sidebar " + (position2nd ? "front" : "right")}>
				<SelfieReview
					image={image}
					back={() => {
						setPosition2nd(0);
					}}
					close={() => {
						close();
						setPosition2nd(0);
					}}
				/>
			</div>
		</div>
	);
};

interface Props {
	close: () => void;
}

export default SelfieTake;
