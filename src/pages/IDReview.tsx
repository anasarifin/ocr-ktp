import React from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

const IDTake = () => {
	return (
		<div>
			<Header title="Review photo" body="Please make sure your picture is clear and show complete information" />
			<form>
				<Input type={0} />
			</form>
			<Button left="Retake Photo" right="Next" />
		</div>
	);
};

export default IDTake;
