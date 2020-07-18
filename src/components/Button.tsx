import React from "react";
import "../styles/Button.css";

const Button = ({ left, right, reset }: Props) => {
	return (
		<div className="button-container">
			<button type="button" onClick={reset}>
				{left}
			</button>
			<button type="button">{right}</button>
		</div>
	);
};

interface Props {
	left: string;
	right: string;
	reset: () => void;
}

export default Button;
