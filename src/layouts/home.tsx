import { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode
}

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="min-h-full min-w-full bg-white p-6">
      {children}
    </div>
  )
}

export default HomeLayout;
