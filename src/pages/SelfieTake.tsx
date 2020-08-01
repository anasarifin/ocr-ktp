import React, { useState, useEffect, useRef } from "react";
import SelfieReview from "./SelfieReview";
import Header from "../components/Header";
import Webcam from "react-webcam";
import "../styles/SelfieTake.css";

const SelfieTake = ({ close }: Props) => {
	const [image, setImage] = useState("");
	const [position2nd, setPosition2nd] = useState(0);
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
			<div className="selfieCam-container">
				<Webcam
					audio={false}
					ref={webcamRef}
					forceScreenshotSourceSize={true}
					screenshotFormat="image/jpeg"
					mirrored={true}
					width={"100%"}
					screenshotQuality={0.5}
					videoConstraints={{
						facingMode: "user",
					}}
				/>
			</div>
			<svg className="shutter-button selfie" height="100" width="100" onClick={onShoot}>
				<mask id="shutter">
					<rect x="0" y="0" width="100" height="100" fill="white" />
					<circle cx="50" cy="50" r="38" fill="black" />
				</mask>
				<circle cx="50" cy="50" r="40" mask="url(#shutter)" fill="white" />
				<circle cx="50" cy="50" r="35" fill="white" />
			</svg>
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
