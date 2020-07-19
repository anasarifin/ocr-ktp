import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/IDReview.css";

const IDTake = ({ type, image, back }: Props) => {
	const [inputId, setInputId] = useState({});
	const [inputName, setInputName] = useState("");

	useEffect(() => {
		const img = new Image();
		img.src = image;
		img.onload = function () {
			const imgWidth = img.naturalWidth;
			const imgHeight = img.naturalHeight;
			console.log("imgHeight: ", imgHeight);
		};
	}, [image]);

	return (
		<div className="container">
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: (window.innerWidth / 14) * 7.5 }}>
				{/* <img src={image} /> */}
			</div>
			<form>
				<Input
					type={type}
					inputId={inputId}
					inputName={inputName}
					setInputId={(e) => {
						setInputId(e);
					}}
					setInputName={(e) => {
						setInputName(e);
					}}
				/>
			</form>
			<Button
				left="Retake Photo"
				right="Next"
				reset={() => {
					setInputId({});
					setInputName("");
					back();
				}}
			/>
		</div>
	);
};

interface Props {
	type: number;
	image: string;
	back: () => void;
}

export default IDTake;
