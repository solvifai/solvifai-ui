interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function LoadingSpinner({
  size = 'md',
  message,
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div role="status" className={`flex items-center justify-center ${className}`}>
      <div className='text-center'>
        <div
          className={`mx-auto motion-safe:animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}
        />
        {message && <p className='mt-4 text-gray-600'>{message}</p>}
      </div>
    </div>
  );
}
