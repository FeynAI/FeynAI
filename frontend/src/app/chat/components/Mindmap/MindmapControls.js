export default function MindmapControls({ onZoomIn, onZoomOut, onCenter }) {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <button
        onClick={onZoomIn}
        className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
        aria-label="Zoom in"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
        aria-label="Zoom out"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <button
        onClick={onCenter}
        className="p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
        aria-label="Center view"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l-4 4m0 0l-4-4m4 4V3" />
        </svg>
      </button>
    </div>
  );
}