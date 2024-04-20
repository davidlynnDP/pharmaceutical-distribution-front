import { FC, ReactNode } from "react";


interface PharmaceuticalLayoutProps {
    children: ReactNode;
}

export const PharmaceuticalLayout: FC<PharmaceuticalLayoutProps> = ({ children }) => {
  return (
    <div>
      { children }
    </div>
  )
}
