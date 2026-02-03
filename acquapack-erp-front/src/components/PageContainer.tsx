import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="container mx-auto p-4 md:p-6 space-y-4 md:space-y-6 max-w-full">{children}</div>;
};

export default PageContainer;

