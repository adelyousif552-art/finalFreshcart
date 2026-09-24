interface PageLoaderProps {
  label?: string;
  fullScreen?: boolean;
}

export default function PageLoader({ label = 'Loading', fullScreen = true }: PageLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 bg-white ${
        fullScreen ? 'fixed inset-0 z-50' : 'py-24'
      }`}
    >
      <div className="relative flex size-20 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-green-100 border-t-green-500" />
        <span className="absolute inset-[10px] animate-pulse rounded-full bg-green-50" />
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative text-green-600"
        >
          <path d="M4 5h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.3h8.1a1.5 1.5 0 0 0 1.5-1.2L21 8H7" />
          <circle cx="10" cy="20" r="1.3" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[15px] font-semibold text-gray-900">
          Fresh<span className="text-green-500">Cart</span>
        </p>
        <p className="flex items-center gap-1 text-[13px] text-gray-400">
          {label}
          <span className="flex gap-0.5">
            <span className="size-1 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]" />
            <span className="size-1 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]" />
            <span className="size-1 animate-bounce rounded-full bg-gray-300" />
          </span>
        </p>
      </div>
    </div>
  );
}
