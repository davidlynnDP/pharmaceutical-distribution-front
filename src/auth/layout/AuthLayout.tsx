import { FC, ReactNode } from "react"

import './AuthLayout.css';


interface AuthLayoutProps {
    children: ReactNode;
}
  
export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  )
}