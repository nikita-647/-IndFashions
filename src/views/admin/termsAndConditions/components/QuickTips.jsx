import React from "react";

const QuickTips = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
      <h3 className="mb-3 text-lg font-semibold">💡 Quick Tips</h3>
      <ul className="space-y-2 text-sm opacity-90">
        <li>• Define clear acceptance terms</li>
        <li>• Specify user responsibilities</li>
        <li>• Include limitation of liability</li>
        <li>• State refund/return policies</li>
        <li>• Update terms regularly</li>
        <li>• Keep language simple and clear</li>
      </ul>
    </div>
  );
};

export default QuickTips;
