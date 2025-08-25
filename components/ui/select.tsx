"use client";
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;
export function SelectTrigger(props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) {
  const { className, ...rest } = props;
  return <SelectPrimitive.Trigger className={cn("flex h-10 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600", className)} {...rest} />;
}
export function SelectContent(props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
  const { className, ...rest } = props;
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={cn("z-50 min-w-[8rem] overflow-hidden rounded-xl border bg-white text-gray-900 shadow-md", className)} {...rest}>
        <SelectPrimitive.Viewport className="p-1" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
export const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(({ className, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none data-[highlighted]:bg-gray-100", className)} {...props}><SelectPrimitive.ItemText /></SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";