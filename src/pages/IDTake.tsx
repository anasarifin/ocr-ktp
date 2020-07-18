import React, { useState, useRef } from "react";
import Header from "../components/Header";
import Webcam from "react-webcam";
import "../styles/IDTake.css";

const IDTake = () => {
	const [type, setType] = useState(0);
	const webcamRef = useRef();

	const onClickType = (e) => {
		const element = document.getElementsByClassName("idType-choices") as HTMLCollectionOf<HTMLSpanElement>;
		for (let x = 0; x < element.length; x++) {
			element[x].classList.remove("active");
		}
		e.classList.add("active");
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
			<div className="idCam-container" style={{ height: (window.innerWidth / 14) * 8 }}>
				<div>
					<Webcam
						audio={false}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={"100%"}
						screenshotQuality={1}
						videoConstraints={{
							facingMode: "environment",
						}}
					/>
				</div>
			</div>
			<span>Position your ID within the light area and make sure the picture is clear and show complete information</span>
			<div className="button-camera">
				<button type="button">Click</button>
			</div>
		</div>
	);
};

export default IDTake;
