import { Input } from "../../UI/Input";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const categories = [
  { name: 'اخبار داخلی', count: 12 },
  { name: 'مسابقات', count: 8 },
  { name: 'بخشنامه‌ها', count: 5 },
  { name: 'فنی و آموزشی', count: 15 },
];

export function Sidebar() {
  return (
    <aside className="w-full md:w-80 flex-shrink-0 md:sticky md:top-28">
      <div className="space-y-8">
        
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">جستجو</h3>
          <div className="relative">
            <Input placeholder="جستجو در اخبار..." className="pr-10" />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">دسته‌بندی‌ها</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                <Link to="#" className="flex justify-between group items-center text-sm py-3 border-b border-neutral-200 text-neutral-600 hover:text-primary-600">
                  <span>{category.name}</span>
                  <span className="text-xs text-neutral-400 group-hover:text-primary-400">
                    {`(${category.count})`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </aside>
  );
}