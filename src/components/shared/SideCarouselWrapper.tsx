import { ReactNode } from "react";

interface TailwindCardProps {
  children: ReactNode;
  className?: string;
}

const SideCarouselWrapper = ({ children, className }: TailwindCardProps) => {
  return (
    <>
      <div className={`e-card playing ${className || ""}`}>
        <div
          className="infotop"
          style={{ maxHeight: "100%", overflowY: "auto" }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SideCarouselWrapper;
