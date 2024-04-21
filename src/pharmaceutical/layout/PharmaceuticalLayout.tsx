import { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCheckAuth } from "../../hooks";

interface NavItem {
  path: string;
  text: string;
}

interface PharmaceuticalLayoutProps {
    children: ReactNode;
}

const navItems: NavItem[] = [
  { path: "/", text: "Home" },
  { path: "/products", text: "Products" },
  { path: "/suppliers", text: "Suppliers" },
  { path: "/clients", text: "Clients" },
  { path: "/sales", text: "Sales" },
];

export const PharmaceuticalLayout: FC<PharmaceuticalLayoutProps> = ({ children }) => {

  const navigate = useNavigate();
  const { handleLogout, isLoading } = useCheckAuth();

  const logout = () => {
    handleLogout();
    navigate('/auth/sign-in')
  };

  return (
    <div>
      <nav>
        <ul>
          {
            navItems.map(({ path, text }) => (
              <li key={ path }>
                <Link to={ path }>{ text }</Link>
              </li>
            ))
          }
          <li>
            <button 
              onClick={ logout }
              disabled={ isLoading } >
                Logout
            </button>
          </li>
        </ul>
      </nav>

      <div>
        { children }
      </div>
    
    </div>
  );
}
