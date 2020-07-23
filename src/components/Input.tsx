import React, { useState, useEffect } from "react";
import "../styles/Input.css";

const Input = ({ type, inputId, inputName, setInputId, setInputName, focus }: Props) => {
	const setTitle = (param: number): string => {
		switch (param) {
			case 1:
				return "KTP";
			case 2:
				return "PASSPORT";
			case 3:
				return "SIM";
			default:
				return "e-KTP";
		}
	};
	const setForm = (param: number) => {
		switch (param) {
			case 2:
				return (
					<>
						<input
							value={inputId[0] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[a-z]{0,2}$/i;
								if (regex.test(e.target.value)) {
									setInputId({ ...inputId, [0]: e.target.value });
								}
							}}
						/>
						<input
							type="number"
							value={inputId[1] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[0-9]{0,4}$/;
								if (regex.test(e.target.value)) {
									setInputId({ ...inputId, [1]: e.target.value });
								}
							}}
						/>
						<input
							type="number"
							value={inputId[2] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[0-9]{0,4}$/;
								if (regex.test(e.target.value)) {
									setInputId({ ...inputId, [2]: e.target.value });
								}
							}}
						/>
					</>
				);
			case 3:
				return (
					<>
						{[0, 1, 2].map((x) => {
							return (
								<input
									type="number"
									value={inputId[x] || ""}
									key={x}
									onChange={(e: React.FormEvent): void => {
										const regex = /^[0-9]{0,4}$/;
										if (regex.test(e.target.value)) {
											setInputId({ ...inputId, [x]: e.target.value });
										}
									}}
								/>
							);
						})}
						<input
							value={inputId[3] || ""}
							type="number"
							onChange={(e: React.FormEvent): void => {
								const regex = /^[0-9]{0,1}$/;
								if (regex.test(e.target.value)) {
									setInputId({ ...inputId, [3]: e.target.value });
								}
							}}
						/>
						<div />
						<input
							value={inputId[4] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[a-z]{0,1}$/i;
								if (regex.test(e.target.value)) {
									setInputId({ ...inputId, [4]: e.target.value.toUpperCase() });
								}
							}}
						/>
					</>
				);
			default:
				return (
					<>
						{[0, 1, 2, 3].map((x) => {
							return (
								<input
									value={inputId[x] || ""}
									type="number"
									key={x}
									onChange={(e: React.FormEvent): void => {
										const regex = /^[0-9]{0,4}$/;
										if (regex.test(e.target.value)) {
											console.log("masuk");
											setInputId({ ...inputId, [x]: e.target.value });
										}
									}}
								/>
							);
						})}
					</>
				);
		}
	};

	return (
		<div className="input-container">
			<label>{setTitle(type)} NUMBER</label>
			<div className={"inputId " + setTitle(type)}>{setForm(type)}</div>
			<label>NAME</label>
			<br />
			<input
				className="inputName"
				value={inputName}
				onChange={(e: React.FormEvent): void => {
					const regex = /^[a-z| ]*$/i;
					if (regex.test(e.target.value)) {
						setInputName(e.target.value.toUpperCase());
					}
				}}
			/>
		</div>
	);
};
	
interface Input {
	0?: string;
	1?: string;
	2?: string;
	3?: string;
	4?: string;
}
interface Props {
	type: number;
	inputId: Input;
	inputName: string;
	setInputId: (e: Input) => void;
	setInputName: (e: string) => void;
}

export default Input;
