import { NavMenu } from "./NavMenu";

export function Layout({ children }) {
    return (
      <>
        <NavMenu />
        <div>
          {children}
        </div>
      </>
    );
  }