import { cn } from "@/lib/utils";
import React from "react";
import { NavLink as RouterNavLink } from "react-router";

const NavLink = (
	{ className, activeClassName, to, isLoggedIn, ...props },
	ref
) => {
	if (isLoggedIn)
		return (
			<RouterNavLink
				ref={ref}
				to={to}
				className={({ isActive }) => cn(className, isActive && activeClassName)}
				{...props}
			/>
		);
};

export default NavLink;
