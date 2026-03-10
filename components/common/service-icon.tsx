import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Blocks,
  Gauge,
  MonitorCog,
  QrCode,
  Workflow,
} from "lucide-react";

import type { ServiceIconKey } from "@/lib/site-config";

const iconMap = {
  support: MonitorCog,
  optimization: Gauge,
  web: Blocks,
  qr: QrCode,
  systems: Workflow,
} satisfies Record<ServiceIconKey, LucideIcon>;

type ServiceIconProps = LucideProps & {
  icon: ServiceIconKey;
};

export function ServiceIcon({ icon, ...props }: ServiceIconProps) {
  const Icon = iconMap[icon];

  return <Icon {...props} />;
}
