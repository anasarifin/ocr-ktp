import React, { useState, useEffect } from "react";
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

	return (
		<div className="container">
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<div className="review-photo" style={{ height: height, backgroundImage: `url('${image}')` }}>
				{/* <img src={image}/> */}
			</div>
			<Button left="Retake Photo" right="Next" reset={back} next={onSubmit} />
		</div>
	);
};

interface Props {
	image: string;
	back: () => void;
	close: () => void;
}

export default IDTake;
