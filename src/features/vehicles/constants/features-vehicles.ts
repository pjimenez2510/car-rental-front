import { Users, Fuel, MapPin, CheckCircle2, LucideIcon } from "lucide-react";

interface Feature {
  [key: string]: InfoFeature[];
}

interface InfoFeature {
  text: string;
  icon: LucideIcon;
}

export const features = (key: string): InfoFeature[] => {
  const features: Feature = {
    Sedan: [
      { icon: Users, text: "5 Pasajeros" },
      { icon: Fuel, text: "Bajo consumo" },
      { icon: MapPin, text: "GPS integrado" },
      { icon: CheckCircle2, text: "Bluetooth" },
      { icon: CheckCircle2, text: "Cámara 360°" },
      { icon: CheckCircle2, text: "Asientos calefactables" },
    ],
    SUV: [
      { icon: Users, text: "7 Pasajeros" },
      { icon: Fuel, text: "Alto rendimiento" },
      { icon: MapPin, text: "GPS integrado" },
      { icon: CheckCircle2, text: "Bluetooth" },
      { icon: CheckCircle2, text: "Cámara 360°" },
      { icon: CheckCircle2, text: "Asientos calefactables" },
    ],
    Van: [
      { icon: Users, text: "12 Pasajeros" },
      { icon: Fuel, text: "Alto rendimiento" },
      { icon: MapPin, text: "GPS integrado" },
      { icon: CheckCircle2, text: "Bluetooth" },
      { icon: CheckCircle2, text: "Cámara 360°" },
      { icon: CheckCircle2, text: "Asientos calefactables" },
    ],
    Luxury: [
      { icon: Users, text: "5 Pasajeros" },
      { icon: Fuel, text: "Alto rendimiento" },
      { icon: MapPin, text: "GPS integrado" },
      { icon: CheckCircle2, text: "Bluetooth" },
      { icon: CheckCircle2, text: "Cámara 360°" },
      { icon: CheckCircle2, text: "Asientos calefactables" },
    ],
    "Sports Car": [
      { icon: Users, text: "2 Pasajeros" },
      { icon: Fuel, text: "Alto rendimiento" },
      { icon: MapPin, text: "GPS integrado" },
      { icon: CheckCircle2, text: "Bluetooth" },
      { icon: CheckCircle2, text: "Cámara 360°" },
      { icon: CheckCircle2, text: "Asientos calefactables" },
    ],
  };

  return features[key] || features.Sedan;
};
