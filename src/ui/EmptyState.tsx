import { DocumentIcon } from "./icons";

interface SimpleEmptyStateProps {
  message: string;
  subMessage?: string;
  className?: string;
}

export function SimpleEmptyState({ message, subMessage, className = "" }: SimpleEmptyStateProps) {
  return (
    <div className={`px-6 py-12 text-center ${className}`}>
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        <DocumentIcon className="h-6 w-6 text-gray-400" />
      </div>
      <p className="text-sm text-gray-600">{message}</p>
      {subMessage && <p className="mt-1 text-xs text-gray-600">{subMessage}</p>}
    </div>
  );
}
