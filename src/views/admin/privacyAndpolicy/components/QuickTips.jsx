import React from "react";

const QuickTips = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
      <h3 className="mb-3 text-lg font-semibold">💡 Quick Tips</h3>
      <ul className="space-y-2 text-sm opacity-90">
        <li>• Save versions regularly</li>
        <li>• Use preview before publishing</li>
        <li>• Export backups periodically</li>
        <li>• Keep content clear and concise</li>
        <li>• Include contact information</li>
        <li>• Update policy when needed</li>
      </ul>
    </div>
  );
};

export default QuickTips;
