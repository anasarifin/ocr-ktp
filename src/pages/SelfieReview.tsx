import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/IDReview.css";

const IDTake = ({ image, back, close }: Props) => {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const element = document.getElementsByClassName("selfieCam-container")[0].querySelector("video");
		setHeight(element.offsetHeight);
	}, [image]);

	return (
		<div className="container">
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: height, backgroundImage: `url('${image}')` }}>
				{/* <img src={image}/> */}
			</div>
			<Button left="Retake Photo" right="Next" reset={back} next={close} />
		</div>
	);
};

interface Props {
	image: string;
	back: () => void;
	close: () => void;
}

export default IDTake;
