import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../UI/Select.tsx"
import { IranMap } from '../../map/IranMap';
import { InstructorCard } from '../../cards/InstructorCard';
import { Users } from 'lucide-react';

const provinceData = {
  Tehran: { instructor: { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", province: "تهران", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" } },
  Esfahan: { instructor: { name: "استاد محمد رضایی", rank: "نماینده استان - دان ۶", province: "اصفهان", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=M.R" } },
  Alborz: { instructor: { name: "استاد کریمی", rank: "نماینده استان - دان ۵", province: "البرز", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=K" } },
};

const provinceNames = Object.keys(provinceData);

export function MapSection() {
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const displayData = selectedProvince ? provinceData[selectedProvince as keyof typeof provinceData] : null;

  const handleProvinceClick = (provinceName: string) => {
    setSelectedProvince(prev => (prev === provinceName ? null : provinceName));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName || null);
  };

  return (
    <section className="py-16 px-6 lg:py-24 lg:px-20" style={{ backgroundColor: 'var(--color-neutral-100)' }}>
      <div className="container mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold text-neutral-900">نمایندگان و باشگاه‌های فعال</h2>
        <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
          با بردن موس روی نقشه، استان‌ها را ببینید و برای مشاهده اطلاعات، روی استان مورد نظر کلیک کنید.
        </p>
      </div>

      <div className="container mx-auto flex flex-wrap-reverse lg:flex-nowrap gap-12 items-start">
        <div className="rounded-2xl bg-white p-8 shadow-lg lg:w-[480px] w-full min-full flex flex-col justify-center">
          {displayData ? (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                اطلاعات استان <span className="text-primary-600">{selectedProvince}</span>
              </h3>
              <InstructorCard {...displayData.instructor} />
            </div>
          ) : (
            <div className="text-center text-neutral-500 animate-fade-in">
              <Users size={48} className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold">نماینده‌ای انتخاب نشده است</h3>
              <p className="text-sm mt-2">برای مشاهده اطلاعات، روی استان مورد نظر کلیک کنید.</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-neutral-800 shadow-lg w-full max-w-[760px] px-6 py-8 lg:px-16 lg:py-24 h-fit">
          <IranMap 
            hoveredProvince={hoveredProvince}
            selectedProvince={selectedProvince}
            onProvinceHover={setHoveredProvince}
            onProvinceClick={handleProvinceClick}
          />

          <div className="mt-8 lg:hidden">
            <Select
              value={selectedProvince || undefined}
              onValueChange={(value) => setSelectedProvince(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="انتخاب کنید..." />
              </SelectTrigger>
              <SelectContent>
                {provinceNames.map(name => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}