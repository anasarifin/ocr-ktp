import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useRecoilValue } from "recoil";
import { type as typeRecoil } from "../recoil";
import "../styles/IDReview.css";
import axios from "axios";

const IDTake = ({ image, back, close }: Props) => {
	const [height, setHeight] = useState(0);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");
	const type = useRecoilValue(typeRecoil);
	const canvasIdRef = useRef<HTMLCanvasElement>();
	const canvasPersonRef = useRef<HTMLCanvasElement>();

	const submitData = (type_name: string, img_name: string) => {
		setLoading(true);
		axios
			.post(process.env.BASE_URL + `/${type_name}/verify`, { [img_name]: canvasIdRef.current.toDataURL("image/jpeg", 1).slice(23), img_person: canvasPersonRef.current.toDataURL("image/jpeg", 1).slice(23) })
			.then((resolve) => {
				console.log(resolve.data);

				if (resolve.data.success) {
					close();
				} else {
					if (type_name === "sim-old") {
						submitData("sim-new", "img-sim");
					} else {
						setStatus("Photo and ID card not match, please retake photo with clearer view.");
					}
				}
			})
			.catch((reject) => {
				console.log(reject);
				setStatus("Server error, please try again later.");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onSubmit = () => {
		// console.log(image.slice(23));
		// console.log(canvasIdRef.current.toDataURL("image/jpeg", 1).slice(23));
		if (type === 3) {
			submitData("sim-old", "img_sim");
		} else {
			submitData("ktp", "img_ktp");
		}
	};

	useEffect(() => {
		const element = document.getElementsByClassName("selfieCam-container")[0].querySelector("video");
		setHeight(element.offsetHeight);
	}, [image]);

	useEffect(() => {
		const canvas = canvasIdRef.current as HTMLCanvasElement;
		const context = canvas.getContext("2d");
		const imageObj = new Image();

		imageObj.onload = function () {
			console.log(imageObj.height);
			canvasIdRef.current.width = (imageObj.width / 10) * 6;
			canvasIdRef.current.height = (imageObj.width / 10) * 4;
			context.drawImage(imageObj, (imageObj.width / 10) * 2, (imageObj.width / 10) * 8, (imageObj.width / 10) * 6, (imageObj.height / 10) * 4, 0, 0, (imageObj.width / 10) * 6, (imageObj.height / 10) * 4);
		};
		imageObj.src = image;
	}, [image]);

	useEffect(() => {
		const canvas = canvasPersonRef.current as HTMLCanvasElement;
		const context = canvas.getContext("2d");
		const imageObj = new Image();

		imageObj.onload = function () {
			console.log(imageObj.height);
			canvasPersonRef.current.width = (imageObj.width / 10) * 6;
			canvasPersonRef.current.height = (imageObj.width / 10) * 6;
			context.drawImage(imageObj, (imageObj.width / 10) * 2, imageObj.width / 10, (imageObj.width / 10) * 6, (imageObj.height / 10) * 6, 0, 0, (imageObj.width / 10) * 6, (imageObj.height / 10) * 6);
		};
		imageObj.src = image;
	}, [image]);

	return (
		<div className="container">
			<ProgressBar show={loading} status={status} />
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: height, backgroundImage: `url('${image}')` }}>
				{/* <img src={image}/> */}
			</div>
			<Button left="Retake Photo" right="Next" reset={back} next={onSubmit} />
			<canvas ref={canvasIdRef} className="canvas-hiddenx" />
			<canvas ref={canvasPersonRef} className="canvas-hiddenx" />
		</div>
	);
};

interface Props {
	image: string;
	back: () => void;
	close: () => void;
}

export default IDTake;
