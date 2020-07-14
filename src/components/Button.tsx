import React from "react";

const Button = ({ left, right }: Props) => {
	return (
		<div>
			<button type="button">{left}</button>
			<button type="button">{right}</button>
		</div>
	);
};

interface Props {
	left: string;
	right: string;
}

export default Button;
