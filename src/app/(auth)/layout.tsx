import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  p-8">
      <Card className="w-full md:max-w-md">
        <CardHeader>
          <Link href="/" className="flex flex-col items-center justify-between">
            <Image
              priority
              src="/images/logo.avif"
              alt="RentCar logo"
              width={170}
              height={170}
              className="rounded-full"
            />
            <CardTitle className="text-2xl">RentCar</CardTitle>
            <CardDescription>
              Renta tu carro de forma rapida y segura
            </CardDescription>
          </Link>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
