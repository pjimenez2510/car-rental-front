import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, PhoneCall, ThumbsUp, Users } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col  text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <Badge
            variant="outline"
            className="rounded-full border-red-500 bg-red-500/10 text-red-700 dark:text-red-300"
          >
            Nuevo
            <span className="ml-2 text-gray-900 dark:text-white">
              ¡Servicio mejorado!
            </span>
          </Badge>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl">
          Descubre la experiencia
          <br />
          <span className="text-red-600 dark:text-red-400">RentCar</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Más que un servicio de alquiler, somos tu compañero de viaje. Descubre
          por qué miles de clientes confían en nosotros para sus aventuras sobre
          ruedas.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="min-w-[200px] bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Reservar ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] border-red-600 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950"
          >
            Conoce más
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-center">Sobre RentCar</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                En RentCar, nos enorgullecemos de ofrecer un servicio de
                alquiler de vehículos excepcional desde 1995. Nuestra misión es
                hacer que cada viaje sea inolvidable, proporcionando vehículos
                de calidad y un servicio al cliente inigualable.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Con una flota diversa que abarca desde económicos hasta lujosos,
                y ubicaciones en todo el país, estamos preparados para
                satisfacer todas tus necesidades de movilidad.
              </p>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Nuestros Valores</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />{" "}
                  Calidad en cada vehículo
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />{" "}
                  Atención personalizada
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
                  Transparencia en precios
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-red-600 dark:text-red-400" />
                  Compromiso con la seguridad
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-center">
            ¿Por Qué Elegir RentCar?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Atención Personalizada",
                description:
                  "Nuestro equipo está dedicado a hacer tu experiencia perfecta",
              },
              {
                icon: ThumbsUp,
                title: "Vehículos de Calidad",
                description:
                  "Flota moderna y bien mantenida para tu seguridad y comodidad",
              },
              {
                icon: Award,
                title: "Mejor Precio Garantizado",
                description:
                  "Ofrecemos tarifas competitivas sin comprometer la calidad",
              },
              {
                icon: PhoneCall,
                title: "Soporte 24/7",
                description:
                  "Estamos aquí para ayudarte, en cualquier momento, en cualquier lugar",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full"
              >
                <CardContent className="p-6">
                  <feature.icon className="mb-4 h-12 w-12 text-red-600 dark:text-red-400" />
                  <h3 className="mb-2 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-3xl font-bold text-center">
            Recomendaciones para tu Viaje
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Planifica con Anticipación
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Reserva tu vehículo con al menos una semana de antelación para
                  asegurar la mejor selección y tarifas.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Elige el Vehículo Adecuado
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Considera el tipo de viaje, número de pasajeros y equipaje
                  para seleccionar el vehículo ideal.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Revisa las Políticas
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Familiarízate con nuestras políticas de combustible,
                  kilometraje y seguros para evitar sorpresas.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <h3 className="mb-4 text-xl font-semibold">
                  Aprovecha Nuestras Ofertas
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Suscríbete a nuestro boletín para recibir ofertas exclusivas y
                  descuentos especiales en tus reservas.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Descubre la libertad de viajar con RentCar. Reserva hoy y disfruta
            de nuestro servicio premium.
          </p>
          <Button
            size="lg"
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Comienza tu reserva
          </Button>
        </div>
      </div>
    </div>
  );
}
