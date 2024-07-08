import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import classes from "./header.module.css";
import DropdownMenu from "../DropDownMenu/DropdownMenu";

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        
        <div className={classes.hamburger} onClick={toggleMenu}>
          {menuOpen ? (
            <span className={classes.close}>&#x2715;</span> // Close icon
          ) : (
            <span className={classes.burger}>&#9776;</span> // Hamburger icon
          )}
        </div>
        <Link to="/" className={classes.logo}>
          Ram Naresh Cafe
        </Link>
        
      </div>
      <nav className={`${classes.nav} ${menuOpen ? classes.open : ""}`}>
          <ul>
            {user ? (
              <li>
                <DropdownMenu user={user} logout={logout} isOpen={menuOpen} />
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
    </header>
  );
}
