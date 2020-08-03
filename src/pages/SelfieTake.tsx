import React, { useState, useEffect, useRef } from "react";
import SelfieReview from "./SelfieReview";
import Header from "../components/Header";
import Shutter from "../components/Shutter";
import Webcam from "react-webcam";
import "../styles/SelfieTake.css";

const SelfieTake = ({ close, cancel }: Props) => {
	const [ready, setReady] = useState(false);
	const [image, setImage] = useState("");
	const [position2nd, setPosition2nd] = useState(0);
	const webcamRef = useRef();
	const selfieRef = useRef<HTMLDivElement>();

	const onShoot = () => {
		const image = webcamRef.current.getScreenshot();
		setImage(image);
		setPosition2nd(1);
	};

	return (
		<div className="container">
			<Header title="Take Photo" body="Position your selfie within the light area and make sure both of your face fully visible" center={true} />
			<br />
			<div className="selfieCam-container" ref={selfieRef}>
				<Webcam
					audio={false}
					ref={webcamRef}
					forceScreenshotSourceSize={true}
					screenshotFormat="image/jpeg"
					width={"100%"}
					screenshotQuality={1}
					videoConstraints={{
						facingMode: "user",
					}}
					onUserMedia={() => {
						const element = document.getElementsByClassName("selfie-frame-id")[0] as HTMLDivElement;
						element.style.width = (selfieRef.current.offsetWidth / 10) * 6 + "px";
						element.style.height = (selfieRef.current.offsetWidth / 10) * 4 + "px";
						element.style.left = (selfieRef.current.offsetWidth / 10) * 2 + "px";
						element.style.top = (selfieRef.current.offsetWidth / 10) * 8 + "px";

						setTimeout(() => {
							setReady(true);
						}, 1000);
					}}
				/>
				<div className="selfie-frame-id" />
			</div>
			{ready ? <Shutter onShoot={onShoot} cancel={cancel} /> : <></>}
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
	cancel: () => void;
}

export default SelfieTake;
