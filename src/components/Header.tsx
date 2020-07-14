import React from "react";

const Header = ({ title, body, center }: Props) => {
	return (
		<div>
			<h2>{title}</h2>
			<span>{body}</span>
		</div>
	);
};

interface Props {
	title: string;
	body?: string;
	center?: boolean;
}

export default Header;
