import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useRecoilValue } from "recoil";
import { image as imageRecoil, type as typeRecoil } from "../recoil";
import "../styles/IDReview.css";
import axios from "axios";

const IDTake = ({ image, back, close }: Props) => {
	const [height, setHeight] = useState(0);
	const imageID = useRecoilValue(imageRecoil);
	const type = useRecoilValue(typeRecoil);
	const canvasRef = useRef();

	const submitData = (type: string, name: string) => {
		axios
			.post(process.env.BASE_URL + `/${type}/verify`, { [name]: imageID.slice(23), img_person: image.slice(23) })
			.then((resolve) => {
				if (resolve.data.success) {
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

	useEffect(() => {
		const element = document.getElementsByClassName("selfieCam-container")[0].querySelector("video");
		setHeight(element.offsetHeight);
	}, [image]);

	useEffect(() => {
		const canvas = canvasRef.current as HTMLCanvasElement;
		const context = canvas.getContext("2d");
		const imageObj = new Image();

		imageObj.onload = function () {
			canvasRef.current.width = (imageObj.width / 10) * 6;
			canvasRef.current.height = (imageObj.height / 10) * 3;
			context.drawImage(imageObj, (imageObj.width / 10) * 2, (imageObj.width / 10) * 7, (imageObj.width / 10) * 6, (imageObj.height / 10) * 3, 0, 0, (imageObj.width / 10) * 6, (imageObj.height / 10) * 3);
		};
		imageObj.src = image;
	}, [image]);

	return (
		<div className="container">
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: height, backgroundImage: `url('${image}')` }}>
				{/* <img src={image}/> */}
			</div>
			<Button left="Retake Photo" right="Next" reset={back} next={onSubmit} />
			<canvas ref={canvasRef} />
		</div>
	);
};

interface Props {
	image: string;
	back: () => void;
	close: () => void;
}

export default IDTake;
