import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/IDReview.css";

const IDTake = ({ type, image, back, close }: Props) => {
	const [inputId, setInputId] = useState({});
	const [inputName, setInputName] = useState("");
	const [initialHeight, setInitialHeight] = useState(0);
	const [offsetHeight, setOffsetHeight] = useState(0);
	const containerRef = useRef<HTMLDivElement>();

	useEffect(() => {
		setInitialHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		if (initialHeight > 0) {
			window.addEventListener("resize", () => {
				if (document.activeElement.tagName === "INPUT") {
					const offset = initialHeight - containerRef.current.offsetHeight;
					containerRef.current.style.cssText = `transform:translateY(-${initialHeight - window.innerHeight - offset}px)`;
				}
			});
		}
	}, [initialHeight]);

	return (
		<div className="container" ref={containerRef}>
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: (window.innerWidth / 14) * 7.5, backgroundImage: `url('${image}')` }}>
				{/* <img src={image}/> */}
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
				next={close}
			/>
		</div>
	);
};

interface Props {
	type: number;
	image: string;
	back: () => void;
	close: () => void;
}

export default IDTake;
