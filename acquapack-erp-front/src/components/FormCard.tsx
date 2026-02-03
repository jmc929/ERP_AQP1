import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormCardProps {
  title: string;
  children: ReactNode;
}

const FormCard = ({ title, children }: FormCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">{children}</CardContent>
    </Card>
  );
};

export default FormCard;

