import React, { useState, useEffect } from "react";

const Input = ({ type }: Props) => {
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
						<input onkeypress="return /[a-z]/i.test(event.key)" minlength="1" maxlength="1" />
						<input type="number" onkeypress="return /[0-9]/i.test(event.key)" minlength="4" maxlength="4" />
						<input type="number" onkeypress="return /[0-9]/i.test(event.key)" minlength="2" maxlength="4" />
					</div>
				);
			case 3:
				return (
					<div>
						{[0, 1, 2].map((x) => {
							return <input type="number" onkeypress="return /[0-9]/i.test(event.key)" minlength="4" maxlength="4" />;
						})}
						<input type="number" onkeypress="return /[0-9]/i.test(event.key)" minlength="1" maxlength="1" />
						<input onkeypress="return /[a-z]/i.test(event.key)" />
					</div>
				);
			default:
				return (
					<div>
						{[0, 1, 2, 3].map((x) => {
							return <input type="number" onkeypress="return /[0-9]/i.test(event.key)" minlength="4" maxlength="4" />;
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
			<input onkeypress="return /[a-z]/i.test(event.key)">Your name</input>
		</div>
	);
};

interface Props {
	type: number;
}

export default Input;
