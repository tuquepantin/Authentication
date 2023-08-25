import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	const [register, setRegister] = useState({
		email: "",
		password: "",
	});

	const handleChange = ({ target }) => {
		setRegister({
			...register,
			[target.name]: target.value,
		});
	};

	const sendRegister = (data) => {
		console.log(data);
		actions.getRegister(data);
	};

	return (
		<div className="container">
			<div className="text-center mt-5">
				
			</div>
			<div className="row justify-content-center">
				<div className="card p-3" style={{ width: "25rem" }}>
					<h1>Register</h1>
					<form>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="email"
								type="text"
								onChange={handleChange}
								name="email"
							/>
						</div>
						<div className="form-group">
							<input
								className="form-control"
								placeholder="password"
								type="password"
								onChange={handleChange}
								name="password"
							/>
						</div>
						<div className="form-group">
							<button
								className="btn btn-primary"
								type="button"
								onClick={() => sendRegister(register)}
							>
								register 
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
