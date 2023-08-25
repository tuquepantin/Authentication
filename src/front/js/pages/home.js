import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const handleChange = ({ target }) => {
		setLogin({
			...login,
			[target.name]: target.value,
		});
	};

	const sendLogin = (data) => {
		console.log(data);
		actions.getLogin(data);
	};

	return (
		<div className="container">
			<div className="text-center mt-5">
				{store.token ? <h1>Felicidades eres nuetro visitante numero 99999</h1> : <h1>logeate para una sorpresa</h1>}
			</div>
			<div className="row justify-content-center">
				<div className="card p-3" style={{ width: "25rem" }}>
					<h1>Login</h1>
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
								onClick={() => sendLogin(login)}
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};