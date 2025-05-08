import { NavMenu } from "./NavMenu";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
      <>
        <NavMenu />
        <div>
          <Outlet />
        </div>
      </>
    );
  }