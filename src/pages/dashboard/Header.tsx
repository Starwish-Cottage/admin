import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const isActivePath = (subpath: string) => {
    const currPath = location.pathname.split("/")[2];
    return currPath === subpath;
  };

  return (
    <Navbar className="mb-4">
      <NavbarBrand>
        <img src="/icon.jpg" width={54} className="rounded-full" />
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem
          isActive={isActivePath("materials")}
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
      </NavbarContent>
      <NavbarContent justify="end">
        <Button color="success">登出</Button>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
