import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  p-8">
      <Card className="w-full md:max-w-md">
        <CardHeader className="flex items-center justify-between">
          <Image
            priority
            src="/images/logo.avif"
            alt="RentCard logo"
            width={170}
            height={170}
            className="rounded-full"
          />
          <CardTitle className="text-2xl">RentCard</CardTitle>
          <CardDescription>
            Renta tu carro de forma rapida y segura
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
