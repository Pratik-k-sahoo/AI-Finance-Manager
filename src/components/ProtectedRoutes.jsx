import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate("/auth/login");
	}, [user]);
	return <div>{children}</div>;
};

export default ProtectedRoutes;
