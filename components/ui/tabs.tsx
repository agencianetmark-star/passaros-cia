"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  currentValue: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  currentValue: string;
  children: React.ReactNode;
  className?: string;
}

function Tabs({ children }: TabsProps) {
  return <div>{children}</div>;
}

function TabsList({ children, className }: TabsListProps) {
  return <div className={cn("inline-flex rounded-xl border bg-white p-1", className)}>{children}</div>;
}

function TabsTrigger({ value, currentValue, onValueChange, children }: TabsTriggerProps) {
  const active = value === currentValue;
  return (
    <button
      type="button"
      onClick={() => onValueChange(value)}
      className={cn(
        "rounded-lg px-3 py-1.5 text-sm transition",
        active ? "bg-primary text-primary-foreground shadow-card" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, currentValue, children, className }: TabsContentProps) {
  if (value !== currentValue) return null;
  return <div className={className}>{children}</div>;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
