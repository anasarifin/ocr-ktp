import React, { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/IDReview.css";

const IDTake = ({ type = 0 }: Props) => {
	const [inputId, setInputId] = useState({});
	const [inputName, setInputName] = useState("");

	return (
		<div className="container">
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: (window.innerWidth / 14) * 7.5 }}>
				<img></img>
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
				}}
			/>
		</div>
	);
};

interface Props {
	type: number;
}

export default IDTake;
