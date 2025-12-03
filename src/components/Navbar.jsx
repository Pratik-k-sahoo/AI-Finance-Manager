import { Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import NavLink from "./NavLink";

const Navbar = () => {
	const navItems = [
		{
			path: "/",
			name: "Home",
		},
		{
			path: "/admin",
			name: "Admin",
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
							>
								{item.name}
							</NavLink>
						))}
					</div>
					<div id="auth-items"></div>
				</nav>
			</div>
		</div>
	);
};

export default Navbar;
