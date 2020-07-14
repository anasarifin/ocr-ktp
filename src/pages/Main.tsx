import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import "../styles/Main.css";

const Card = ({ title, body }) => {
	return (
		<div className="border">
			<img alt="image" />
			<div>
				<span>{title}</span>
				<br />
				<span>{body}</span>
			</div>
			<img alt="check" />
		</div>
	);
};

const Main = () => {
	return (
		<div>
			<Header title="Verify Identity" body="Please verify your identity to confirm & secure your account. This will only take a few minutes." />
			<div className="border">
				<img alt="image" />
				<div>
					<span>Complete by</span>
					<br />
					<span>{"59:59:59"}</span>
					<br />
					<span>to avoid order cancellation</span>
				</div>
			</div>
			<Card title="Identity" body="e-KTP, KTP, Passport or SIM" />
			<Card title="Selfie with ID" body="Take a selfie with your document" />
			<Card title="Signature" body="Digital sign or take signature picture" />
			<Button left="Cancel" right="Next" />
		</div>
	);
};

export default Main;
