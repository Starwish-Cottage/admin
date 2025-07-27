import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const isActivePath = (subpath: string) => {
    const currPath = location.pathname.split("/")[2];
    return currPath === subpath;
  };

  return (
    <Navbar>
      <NavbarBrand>
        <p>星愿小屋</p>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem isActive={isActivePath("materials")}>
          <Link to="/dashboard/materials">
            <p>素材管理</p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActivePath("orders")}>
          <Link to="/dashboard/orders">
            <p>订单管理</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <p>登出</p>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
