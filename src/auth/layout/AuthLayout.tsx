import { FC, ReactNode } from "react"

import styles from './AuthLayout.module.css';


interface AuthLayoutProps {
    children: ReactNode;
}
  
export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={ styles.auth__container }>
      { children }
    </div>
  )
}