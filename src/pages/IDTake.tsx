import React, { useState, useRef, useEffect } from "react";
import IDReview from "./IDReview";
import Header from "../components/Header";
import Webcam from "react-webcam";
import "../styles/IDTake.css";

const IDTake = ({ close }: Props) => {
	const [position2nd, setPosition2nd] = useState(0);
	const [image, setImage] = useState("");
	const [type, setType] = useState(0);
	const webcamRef = useRef();

	const onClickType = (e) => {
		const element = document.getElementsByClassName("idType-choices") as HTMLCollectionOf<HTMLSpanElement>;
		for (let x = 0; x < element.length; x++) {
			element[x].classList.remove("active");
		}
		e.classList.add("active");
	};

	const onShoot = () => {
		const image = webcamRef.current.getScreenshot();
		setImage(image);
		setPosition2nd(1);
	};

	return (
		<div className="container">
			<Header title="Take Photo" center={true} />
			<div className="idType-container">
				<span
					className="idType-choices active"
					onClick={(e) => {
						onClickType(e.target);
						setType(0);
					}}>
					e-KTP
				</span>
				<span
					className="idType-choices"
					onClick={(e) => {
						onClickType(e.target);
						setType(1);
					}}>
					KTP
				</span>
				<span
					className="idType-choices"
					onClick={(e) => {
						onClickType(e.target);
						setType(2);
					}}>
					Passport
				</span>
				<span
					className="idType-choices"
					onClick={(e) => {
						onClickType(e.target);
						setType(3);
					}}>
					SIM
				</span>
			</div>
			<div className="idCam-container" style={{ height: (window.innerWidth / 14) * 7.5 }}>
				<div>
					<Webcam
						audio={false}
						ref={webcamRef}
						forceScreenshotSourceSize={true}
						screenshotFormat="image/png"
						width={"100%"}
						screenshotQuality={1}
						videoConstraints={{
							width: 720,
							height: 1280,
							// aspectRatio: 0.6666666667,
							facingMode: "environment",
						}}
					/>
				</div>
			</div>
			<div className="center">Position your ID within the light area and make sure the picture is clear and show complete information</div>
			<div className="button-camera">
				<svg className="shutter-button" height="100" width="100" onClick={onShoot}>
					<circle cx="50" cy="50" r="40" fill="red" />
				</svg>
			</div>
			<div className={"sidebar " + (position2nd ? "front" : "right")}>
				<IDReview
					image={image}
					type={type}
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

export default IDTake;
