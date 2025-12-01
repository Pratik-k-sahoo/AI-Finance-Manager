import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router";

function Auth() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const user = null;

	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const [signupData, setSignupData] = useState({
		email: "",
		password: "",
		fullName: "",
	});

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		let error = Math.random() * (100 - 1) + 1;
		setTimeout(() => {
			if (error % 2 === 0) console.log(loginData.email, loginData.password);
			else error = "Error Occurred while logging in.";
		}, 5000);

		if (error) {
			toast.error(error.message);
		} else {
			toast.success("Welcome back!");
			navigate("/");
		}
		setLoading(false);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
    let error = Math.random() * (100 - 1) + 1;

		setTimeout(() => {
			if (error % 2 === 0) console.log(signupData.email, signupData.password, signupData.fullName);
			else error = "Error Occurred while signing in.";
		}, 5000);

		if (error) {
			toast.error(error.message);
		} else {
			toast.success("Account created successfully!");
			navigate("/");
		}
		setLoading(false);
	};

	return (
		<div>
			<h1>Login Signin Page</h1>
      <button onClick={handleLogin}>Login Sushree</button>
      <button onClick={handleSignup}>Signin</button>
		</div>
	);

}

export default Auth;
