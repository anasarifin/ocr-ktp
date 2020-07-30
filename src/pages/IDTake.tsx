import React, { useState, useRef, useEffect } from "react";
import IDReview from "./IDReview";
import Header from "../components/Header";
import Webcam from "react-webcam";
import { atom, useRecoilState } from "recoil";
import "../styles/IDTake.css";

const IDTake = ({ close }: Props) => {
	const [image, setImage] = useState("");
	const [position2nd, setPosition2nd] = useState(0);
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
		const imageNew = webcamRef.current.getScreenshot();
		setImage(imageNew);
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
						screenshotFormat="image/jpeg"
						width={"100%"}
						screenshotQuality={0.5}
						videoConstraints={{
							width: 480,
							height: 800,
							// aspectRatio: 0.6666666667,
							facingMode: "environment",
						}}
					/>
				</div>
			</div>
			<div className="center">Position your ID within the light area and make sure the picture is clear and show complete information</div>
			<svg className="shutter-button" height="100" width="100" onClick={onShoot}>
				<mask id="shutter">
					<rect x="0" y="0" width="100" height="100" fill="white" />
					<circle cx="50" cy="50" r="38" fill="black" />
				</mask>
				<circle cx="50" cy="50" r="40" mask="url(#shutter)" fill="white" />
				<circle cx="50" cy="50" r="35" fill="white" />
			</svg>
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
