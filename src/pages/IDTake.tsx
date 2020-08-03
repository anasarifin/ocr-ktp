import React, { useState, useRef, useEffect } from "react";
import IDReview from "./IDReview";
import Header from "../components/Header";
import Shutter from "../components/Shutter";
import Webcam from "react-webcam";
import "../styles/IDTake.css";

const IDTake = ({ close, cancel }: Props) => {
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
			<Shutter onShoot={onShoot} cancel={cancel} />
			<div className={"sidebar " + (position2nd ? "front" : "right")}>
				<IDReview
					image={image}
					type={type}
					back={() => {
						setPosition2nd(0);
					}}
					close={() => {
						setImage("");
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

export default IDTake;
