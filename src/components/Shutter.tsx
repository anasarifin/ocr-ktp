import React from "react";
import BackIcon from "../images/back.svg";
import "../styles/Shutter.css";

const Shutter = ({ onShoot, cancel }: Props) => {
	return (
		<div className="shutter-container">
			<div />
			<svg className="shutter-button" height="100" width="100" onClick={onShoot}>
				<mask id="shutter">
					<rect x="0" y="0" width="100" height="100" fill="white" />
					<circle cx="50" cy="50" r="38" fill="black" />
				</mask>
				<circle cx="50" cy="50" r="40" mask="url(#shutter)" fill="white" />
				<circle cx="50" cy="50" r="35" fill="white" />
			</svg>
			<BackIcon className="shutter-back" fill="white" onClick={cancel} />
		</div>
	);
};

interface Props {
	onShoot: () => void;
	cancel: () => void;
}

export default Shutter;
