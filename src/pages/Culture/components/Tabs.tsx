import React from "react";

type Tab = "먹거리" | "즐길거리";

interface TabsProps {
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
}

export default function CultureTabs({ selectedTab, onSelectTab }: TabsProps) {
  const tabs: Tab[] = ["먹거리", "즐길거리"];

  return (
    <div className="flex items-center justify-center bg-grayscale-0 rounded-lg p-[6px] mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
            selectedTab === tab
              ? "bg-main-30 text-white"
              : "text-grayscale-30"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
