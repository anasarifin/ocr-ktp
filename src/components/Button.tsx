import React from "react";
import "../styles/Button.css";

const Button = ({ left, right, reset, next }: Props) => {
	return (
		<div className="button-container">
			<button type="button" onClick={reset}>
				{left}
			</button>
			<button type="button" onClick={next}>
				{right}
			</button>
		</div>
	);
};

interface Props {
	left: string;
	right: string;
	reset?: () => void;
	next?: () => void;
}

export default Button;
