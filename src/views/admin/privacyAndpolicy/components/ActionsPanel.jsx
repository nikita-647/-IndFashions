import React from "react";

const ActionsPanel = ({ exportHTML, importHTML, copyToClipboard, copied }) => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Actions</h3>
      <div className="space-y-3">
        <button
          onClick={exportHTML}
          className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-all hover:bg-blue-100"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export HTML
        </button>
        <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-all hover:bg-blue-100">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import HTML
          <input
            type="file"
            accept=".html"
            onChange={importHTML}
            className="hidden"
          />
        </label>
        <button
          onClick={copyToClipboard}
          className="flex w-full items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700 transition-all hover:bg-blue-100"
        >
          {copied ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
          {copied ? "Copied!" : "Copy HTML"}
        </button>
      </div>
    </div>
  );
};

export default ActionsPanel;
