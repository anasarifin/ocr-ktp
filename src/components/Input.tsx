import React, { useState, useEffect } from "react";

const Input = ({ type }: Props) => {
	const [inputValue, setInputValue] = useState({});

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
					<div>
						<input
							value={inputValue[0] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[a-z]{0,2}$/i;
								if (regex.test(e.target.value)) {
									setInputValue({ ...inputValue, [0]: e.target.value });
								}
							}}
						/>
						<input
							type="number"
							value={inputValue[1] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[0-9]{0,4}$/;
								if (regex.test(e.target.value)) {
									setInputValue({ ...inputValue, [1]: e.target.value });
								}
							}}
						/>
						<input
							type="number"
							value={inputValue[2] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[0-9]{0,4}$/;
								if (regex.test(e.target.value)) {
									setInputValue({ ...inputValue, [2]: e.target.value });
								}
							}}
						/>
					</div>
				);
			case 3:
				return (
					<div>
						{[0, 1, 2].map((x) => {
							return (
								<input
									type="number"
									value={inputValue[x] || ""}
									key={x}
									onChange={(e: React.FormEvent): void => {
										const regex = /^[0-9]{0,4}$/;
										if (regex.test(e.target.value)) {
											setInputValue({ ...inputValue, [x]: e.target.value });
										}
									}}
								/>
							);
						})}
						<input
							value={inputValue[3] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[0-9]{0,1}$/;
								if (regex.test(e.target.value)) {
									setInputValue({ ...inputValue, [3]: e.target.value });
								}
							}}
						/>
						<input
							value={inputValue[4] || ""}
							onChange={(e: React.FormEvent): void => {
								const regex = /^[a-z]{0,1}$/i;
								if (regex.test(e.target.value)) {
									setInputValue({ ...inputValue, [4]: e.target.value.toUpperCase() });
								}
							}}
						/>
					</div>
				);
			default:
				return (
					<div>
						{[0, 1, 2, 3].map((x) => {
							return (
								<input
									value={inputValue[x] || ""}
									key={x}
									onChange={(e: React.Form): void => {
										const regex = /^[0-9]{0,4}$/;
										if (regex.test(e.target.value)) {
											console.log("masuk");
											setInputValue({ ...inputValue, [x]: e.target.value });
										}
									}}
								/>
							);
						})}
					</div>
				);
		}
	};

	return (
		<div>
			<label>{setTitle(type)}</label>
			{setForm(type)}
			<label>NAME</label>
			<input
				onKeyPress={(e: KeyboardEvent) => {
					return /[a-z]/i.test(e.key);
				}}
				placeholder="Your name"
			/>
		</div>
	);
};

interface Props {
	type: number;
}

export default Input;
