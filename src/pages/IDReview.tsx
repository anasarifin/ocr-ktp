import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useRecoilState } from "recoil";
import { image as imageRecoil, type as typeRecoil } from "../recoil";
import "../styles/IDReview.css";
import axios from "axios";

const IDTake = ({ type, image, back, close }: Props) => {
	const [dataState, setData] = useState({ nik: false });
	const [inputId, setInputId] = useState({});
	const [inputName, setInputName] = useState("");
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("");
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

	const submitData = (type_name: string, img_name: string) => {
		if (dataState.nik) return compareData(dataState);

		setLoading(true);
		axios
			.post(process.env.BASE_URL + `/${type_name}/translate`, { [img_name]: image.slice(23) })
			.then((resolve) => {
				console.log(resolve.data);

				if (resolve.data.success) {
					setData(resolve.data.data);
					compareData(resolve.data.data);
				} else {
					if (type_name === "sim-new") {
						submitData("sim-old", "img-sim");
					} else {
						setStatus("ID card not valid, please try again with clearer photo.");
					}
				}
			})
			.catch((reject) => {
				console.log(reject);
				setStatus("Server down!");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const compareData = (data) => {
		const elementId = document.getElementsByClassName("inputId")[0]?.querySelectorAll("input");
		const elementName = document.getElementsByClassName("inputName")[0] as HTMLInputElement;
		let number = "";
		for (let x = 0; x < elementId.length; x++) {
			number += elementId[x].value;
		}

		console.log(data);

		if (data.nik != number) {
			setStatus("ID number don't match with photo, please check again or retake photo with clearer view.");
			return;
		}
		if (data.nama != elementName.value.toUpperCase()) {
			setStatus("Name don't match with photo, please check again or retake photo with clearer view.");
			return;
		}

		setImageState(image);
		setTypeState(type);
		close();
	};

	const onSubmit = () => {
		if (type === 3) {
			submitData("sim-new", "img_sim");
		} else {
			submitData("ktp", "img_ktp");
		}
	};

	return (
		<div className="container" ref={containerRef}>
			<ProgressBar show={loading} status={status} />
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
					setData({ nik: false });
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
