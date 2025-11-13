import React from "react";

const VersionHistory = ({
  savedVersions,
  currentVersion,
  loadVersion,
  deleteVersion,
}) => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Saved Versions
      </h3>
      <div className="max-h-96 space-y-2 overflow-y-auto">
        {savedVersions.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500">
            No saved versions yet
          </p>
        ) : (
          savedVersions.map((version) => (
            <div
              key={version.id}
              className={`rounded-lg border-2 p-3 transition-all ${
                currentVersion === version.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => loadVersion(version.id)}
                  className="flex-1 text-left"
                >
                  <p className="text-sm font-medium text-gray-800">Version</p>
                  <p className="text-xs text-gray-500">{version.date}</p>
                </button>
                <button
                  onClick={() => deleteVersion(version.id)}
                  className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VersionHistory;
