import { ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}
export default function Container(props: SideBarProps) {
  return (
    <div className="overflow-hidden p-4 rounded-lg bg-white shadow w-full h-auto">
      {props.children}
    </div>
  );
}
