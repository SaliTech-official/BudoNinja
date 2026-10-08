import { cn } from "../../../lib/utils.ts";
import type { EventTab } from "../../../hooks/useEventFilters";

interface Tab {
  id: EventTab;
  label: string;
}

const tabs: Tab[] = [
  { id: "all", label: "همه مسابقات" },
  { id: "open", label: "ثبت نام باز" },
  { id: "closed", label: "پایان یافته" },
];

interface FilterTabsProps {
  activeTab: EventTab;
  onTabChange: (tab: EventTab) => void;
  itemCount: number;
}

export function FilterTabs({
  activeTab,
  onTabChange,
  itemCount,
}: FilterTabsProps) {
  return (
    <div className="border-b border-neutral-200">
      <div className="flex items-center justify-between">
        <div className="flex-grow overflow-x-auto whitespace-nowrap scrollbar-hide">
          <nav className="inline-flex gap-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "py-4 px-1 border-b-2 font-medium text-sm",
                  activeTab === tab.id
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <p className="hidden lg:block text-sm text-neutral-500">
          نمایش {itemCount} مورد
        </p>
      </div>
    </div>
  );
}
