import * as React from "react";
import { cn } from "@/lib/utils";
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("rounded-2xl border border-gray-200 bg-white shadow-sm", className)} {...props} />; }
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("p-6 pb-0", className)} {...props} />; }
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn("p-6", className)} {...props} />; }
export { Card, CardHeader, CardContent };