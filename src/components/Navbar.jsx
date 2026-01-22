import { Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import NavLink from "./NavLink";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router";
import api from "@/lib/axiosBase";
import { resetDashboard } from "@/redux/slices/dashboardSlice";

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const navItems = [
		{
			path: "/",
			name: "Home",
		},
		{
			path: "/analytics",
			name: "Analytics",
		},
		{
			path: "/transaction",
			name: "Transaction",
		},
	];

	const [scrolled, setScrolled] = useState(false);

	const handleLogout = async () => {
		try {
			const response = await api.post(
				`/${import.meta.env.VITE_USER_URL}/logout`,
			);
			if (response.status === 200) {
				dispatch(logout());
				dispatch(resetDashboard());
			}
			navigate("/auth/login");
		} catch (error) {
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) setScrolled(true);
			else setScrolled(false);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="border-b bg-card/5 backdrop-blur-md sticky top-0 z-50">
			<div className="container mx-auto px-4">
				<nav className="flex items-center justify-between h-16">
					<div id="logo">
						<Link to="/" className="flex items-center gap-2 font-bold text-xl">
							<Wallet
								className={`h-6 w-6 ${
									scrolled ? "text-slate-900" : "text-primary"
								}`}
							/>
							<span
								className={`${
									scrolled ? "text-slate-900" : "text-primary"
								} bg-clip-text`}
							>
								Finance Manager
							</span>
						</Link>
					</div>
					<div id="nav-items">
						{navItems.map((item) => (
							<NavLink
								to={item.path}
								className={`${
									scrolled ? "text-amber-600" : "text-muted-foreground"
								} hover:text-foreground hover:border-b border-black px-3 py-2 rounded-md font-bold border-0 transition-all`}
								activeClassName="text-foreground font-medium bg-accent"
								key={item.name}
								isLoggedIn={user ? true : false}
							>
								{item.name}
							</NavLink>
						))}
					</div>
					<div id="auth-items">
						{user && <Button onClick={handleLogout}>Logout</Button>}
						{!user && (
							<div className="flex gap-5">
								<Button>
									<Link className="w-full h-full" to={"/auth/login"}>
										Login
									</Link>
								</Button>
								<Button className="bg-accent">
									<Link className="w-full h-full" to={"/auth/signup"}>
										Signup
									</Link>
								</Button>
							</div>
						)}
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
