import * as React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SurfaceCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn("border-border/60 bg-card shadow-card", className)}
    {...props}
  />
));

SurfaceCard.displayName = "SurfaceCard";

export { SurfaceCard };
