import React, { useState, ReactElement, useEffect } from "react";
import IDTake from "./IDTake";
import SelfieTake from "./SelfieTake";

import Header from "../components/Header";
import Button from "../components/Button";

import ClockIcon from "../images/clock.svg";
import IDIcon from "../images/id.svg";
import SelfieIcon from "../images/selfie.svg";
import SignatureIcon from "../images/signature.svg";
import NextIcon from "../images/next.svg";
import SuccessIcon from "../images/success.svg";
import "../styles/Main.css";

const Card = ({ title, body, icon, check, click }) => {
	return (
		<div className="border" onClick={click}>
			{icon}
			<div>
				<span className="title">{title}</span>
				<br />
				<span className="body">{body}</span>
			</div>
			<div className="check">{check}</div>
		</div>
	);
};

const Main = () => {
	const [imageID, setImageID] = useState("");
	const [page, setPage] = useState<ReactElement | null>(null);
	const [checklist, setChecklist] = useState({
		0: false,
		1: false,
		2: false,
	});
	const [position, setPosition] = useState(0);

	const [countdown, setCountdown] = useState(3600);
	const [countdownString, setCountdownString] = useState("");

	useEffect(() => {
		var hours = Math.floor((countdown % (60 * 60 * 24)) / (60 * 60));
		var minutes = Math.floor((countdown % (60 * 60)) / 60);
		var seconds = Math.floor(countdown % 60);
		setCountdownString(`${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
		setTimeout(() => {
			setCountdown(countdown - 1);
		}, 1000);
	}, [countdown]);

	return (
		<div className="container">
			<Header title="Verify Identity" body="Please verify your identity to confirm & secure your account. This will only take a few minutes." />
			<div className="border">
				<ClockIcon />
				<div>
					<span>COMPLETE BY</span>
					<br />
					<span>{countdownString}</span>
					<br />
					<span>to avoid order cancellation</span>
				</div>
			</div>
			<span className="req-doc">Required documents</span>
			<Card
				title="Identity"
				body="e-KTP, KTP, Passport or SIM"
				icon={<IDIcon className="icon" />}
				check={checklist[0] ? <SuccessIcon /> : <NextIcon />}
				click={() => {
					setPage(
						<IDTake
							image={imageID}
							close={() => {
								setPosition(0);
								setChecklist({ ...checklist, 0: true });
							}}
							setImage={(e: string) => {
								setImageID(e);
							}}
						/>,
					);
					setPosition(1);
				}}
			/>
			<Card
				title="Selfie with ID"
				body="Take a selfie with your document"
				icon={<SelfieIcon className="icon" />}
				check={checklist[1] ? <SuccessIcon /> : <NextIcon />}
				click={() => {
					setPage(
						<SelfieTake
							close={() => {
								setPosition(0);
								setChecklist({ ...checklist, 1: true });
							}}
						/>,
					);
					setPosition(1);
				}}
			/>
			<Card title="Signature" body="Digital sign or take signature picture" icon={<SignatureIcon />} check={checklist[2] ? <SuccessIcon /> : <NextIcon />} />
			<Button left="Cancel" right="Next" />

			<div className={"sidebar " + (position === 0 ? "right" : position === 1 ? "front" : "bottom")}>{page || <></>}</div>
		</div>
	);
};

export default Main;
