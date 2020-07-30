import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import { useRecoilState } from "recoil";
import { image as imageRecoil, type as typeRecoil } from "../recoil";
import "../styles/IDReview.css";
import axios from "axios";

const IDTake = ({ type, image, back, close }: Props) => {
	const [inputId, setInputId] = useState({});
	const [inputName, setInputName] = useState("");
	const [initialHeight, setInitialHeight] = useState(0);
	const [imageState, setImageState] = useRecoilState(imageRecoil);
	const [typeState, setTypeState] = useRecoilState(typeRecoil);
	const containerRef = useRef<HTMLDivElement>();

	useEffect(() => {
		setInitialHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		if (initialHeight > 0) {
			window.addEventListener("resize", () => {
				const offset = initialHeight - containerRef.current.offsetHeight;
				containerRef.current.style.cssText = `transform:translateY(-${initialHeight - window.innerHeight - offset}px)`;
			});
		}
	}, [initialHeight]);

	const submitData = (type: string, name: string) => {
		axios
			.post(process.env.BASE_URL + `/${type}/translate`, { [name]: image.slice(23) })
			.then((resolve) => {
				if (resolve.data.success) {
					setImageState(image);
					setTypeState(parseFloat(type));
					close();
				} else {
					if (type === "sim-old") {
						submitData("sim-new", "img-sim");
					} else {
						alert("Image not valid!");
					}
				}
			})
			.catch((reject) => {
				console.log(reject);
				alert("An error occured!");
			});
	};

	const onSubmit = () => {
		if (type === 3) {
			submitData("sim-old", "img-sim");
		} else {
			submitData("ktp", "img-ktp");
		}
	};

	return (
		<div className="container" ref={containerRef}>
			<Header title="Review Photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: (window.innerWidth / 14) * 7.5, backgroundImage: `url('${image}')` }}></div>
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
				next={onSubmit}
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
