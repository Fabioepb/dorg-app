import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onRefresh: () => void;
  isFetching: boolean;
  title?: string;
  className?: string;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  isFetching,
  title = "Refresh",
  className = "",
}) => {
  return (
    <button
      onClick={onRefresh}
      disabled={isFetching}
      className={`p-2 rounded-lg bg-accent hover:bg-accent/80 disabled:opacity-50 transition-colors cursor-pointer ${className}`}
      title={title}
    >
      <RefreshCw
        className={`w-4 h-4 text-white ${isFetching ? "animate-spin" : ""}`}
      />
    </button>
  );
};

export default RefreshButton;
