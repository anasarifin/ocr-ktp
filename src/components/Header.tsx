import React from "react";
import "../styles/Header.css";

const Header = ({ title, body, center }: Props) => {
	return (
		<div className="header">
			<h2 className={"header-title" + (center ? " center" : "")}>{title}</h2>
			<span className={"header-body" + (center ? " center" : "")}>{body}</span>
		</div>
	);
};

interface Props {
	title: string;
	body?: string;
	center?: boolean;
}

export default Header;
