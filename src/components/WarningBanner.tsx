import type { PropsWithChildren } from "react";

interface WarningBannerProps {
  className?: string;
}

const WarningBanner = ({
  className,
  children,
}: PropsWithChildren<WarningBannerProps>) => {
  return (
    <div
      className={`bg-accent text-white p-4 rounded-md shadow-md shadow-background inset-shadow-xs inset-shadow-background ${className}`}
    >
      {children}
    </div>
  );
};

export default WarningBanner;
