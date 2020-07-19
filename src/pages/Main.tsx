import React, { useState, ReactElement } from "react";
import IDTake from "./IDTake";

import Header from "../components/Header";
import Button from "../components/Button";

import ClockIcon from "../images/clock.svg";
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
	const [id, setId] = useState("wew");
	const [page, setPage] = useState<ReactElement | null>(null);
	const [checklist, setChecklist] = useState({
		0: false,
		1: true,
		2: false,
	});
	// Position of sidebar: 0: right, 1: front, 2: bottom
	const [position, setPosition] = useState(0);

	return (
		<div className="container">
			<Header title="Verify Identity" body="Please verify your identity to confirm & secure your account. This will only take a few minutes." />
			<div className="border">
				<ClockIcon />
				<div>
					<span>COMPLETE BY</span>
					<br />
					<span>{"59:59:59"}</span>
					<br />
					<span>to avoid order cancellation</span>
				</div>
			</div>
			<span className="req-doc">Required documents</span>
			<Card
				title="Identity"
				body="e-KTP, KTP, Passport or SIM"
				icon={<ClockIcon className="icon" />}
				check={checklist[0] ? <SuccessIcon /> : <NextIcon />}
				click={() => {
					setPage(<IDTake />);
					setPosition(1);
				}}
			/>
			<Card
				title="Selfie with ID"
				body="Take a selfie with your document"
				icon={<ClockIcon className="icon" />}
				check={checklist[1] ? <SuccessIcon /> : <NextIcon />}
				click={() => {
					setPage(<IDTake />);
					setPosition(1);
				}}
			/>
			<Card
				title="Signature"
				body="Digital sign or take signature picture"
				icon={<ClockIcon />}
				check={checklist[2] ? <SuccessIcon /> : <NextIcon />}
				click={() => {
					setPage(<IDTake />);
					setPosition(1);
				}}
			/>
			<Button left="Cancel" right="Next" />

			<div className={"sidebar " + (position === 0 ? "right" : position === 1 ? "front" : "bottom")}>{page || <></>}</div>
		</div>
	);
};

export default Main;
