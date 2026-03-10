import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("shell-container", className)} {...props} />;
}
