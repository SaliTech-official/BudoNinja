import { cn } from "../../../lib/utils.ts";
import { useState } from "react";

const tabs = ["همه مسابقات", "ثبت نام باز", "در حال برگزاری", "پایان یافته"];

export function FilterTabs({ itemCount }: { itemCount: number }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="border-b border-neutral-200">
      <div className="flex items-center justify-between">
        <div className="flex-grow overflow-x-auto whitespace-nowrap scrollbar-hide">
          <nav className="inline-flex gap-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === tab
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <p className="hidden lg:block text-sm text-neutral-500">نمایش {itemCount} مورد</p>
      </div>
    </div>
  );
}