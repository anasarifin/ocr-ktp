import React, { useState, useEffect } from "react";
import "../styles/ProgressBar.css";

const ProgressBar = ({ show, status }: Props) => {
	return (
		<>
			{show ? <div className="progress-bar" /> : <></>}
			{status ? <div className="status-bar">{status}</div> : <></>}
		</>
	);
};

interface Props {
	show: boolean;
	status?: string;
}

export default ProgressBar;
