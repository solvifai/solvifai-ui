import type { ComponentPropsWithRef } from "react";

import { cn } from "./cn";
import "./Table.css";

export function Table({ className, ...props }: ComponentPropsWithRef<"table">) {
  return <table {...props} className={cn("ui-table w-full text-left text-sm", className)} />;
}
