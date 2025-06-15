
import React from "react";

const options = [
  { label: "All", value: "all" },
  { label: "Followed", value: "followed" },
  { label: "Same Streak Level", value: "same-streak" },
];

export default function FeedSortBar() {
  const [selected, setSelected] = React.useState("all");

  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selected === opt.value
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }
          `}
          onClick={() => setSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
