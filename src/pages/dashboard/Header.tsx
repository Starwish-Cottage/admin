import React from "react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Link, useLocation, useNavigate, type NavigateFunction } from "react-router";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = React.useState<boolean>(false);
  const isActivePath = (subpath: string | undefined) => {
    const currPath = location.pathname.split("/")[2];
    return currPath === subpath;
  };
  const handleSetLogoutLoading = (isLoading: boolean) => {
    setLogoutLoading(isLoading);
  };

  return (
    <Navbar className="mb-4">
      <NavbarBrand>
        <img src="/icon.jpg" width={54} className="rounded-full" />
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem
          isActive={isActivePath("materials") || isActivePath(undefined)}
          className="dashboard-header__item"
        >
          <Link to="/dashboard/materials">
            <p>素材管理</p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActivePath("orders")} className="dashboard-header__item">
          <Link to="/dashboard/orders">
            <p>订单管理</p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActivePath("library")} className="dashboard-header__item">
          <Link to="/dashboard/library">
            <p>图库</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          color="success"
          isLoading={logoutLoading}
          onPress={() => logout(navigate, handleSetLogoutLoading)}
        >
          登出
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

// log out current user

const logout = (
  navigate: NavigateFunction,
  handleSetLogoutLoading: (isLoading: boolean) => void
) => {
  handleSetLogoutLoading(true);
  localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE_KEY);
  setTimeout(() => {
    navigate("/login", { replace: true });
  }, 1000);
};

export default Header;
