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
import { Users, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const provinceData = {
  Tehran: {
    mainInstructor: { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "تهران", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" },
    otherInstructors: [
      { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "تهران", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" },
      { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "تهران", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" }
    ]
  },
  Esfahan: {
    mainInstructor: { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "اصفهان", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" },
    otherInstructors: [
      { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "اصفهان", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" },
      { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "اصفهان", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" }
    ]
  },
  Alborz: {
    mainInstructor: { name: "استاد علی اکبری", rank: "نماینده استان - دان ۷", city: "اصفهان", avatarUrl: "https://placehold.co/100x100/1E293B/FFFFFF?text=A.A" },
    otherInstructors: []
  },
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

      <div className="container mx-auto flex flex-wrap-reverse lg:flex-nowrap gap-12 items-start">
        <div className="rounded-2xl bg-white p-10 shadow-lg lg:w-[480px] w-full min-full flex flex-col justify-center">
          {displayData ? (
            <div className="animate-fade-in flex flex-col gap-8">
              <h2 className='text-3xl text-primary-600'>استان <span>{displayData.mainInstructor.city}</span></h2>
              <div>
                <label className="text-sm font-medium text-neutral-500 mb-3 block">
                  نماینده ارشد سبک
                </label>
                <InstructorCard {...displayData.mainInstructor} />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-500 mb-3 block">
                  نمایندگان و مربیان فعال
                </label>
                
                <div className="flex flex-col gap-4">
                  {
                    displayData.otherInstructors.length ? (
                      displayData.otherInstructors.map((instructor, index) => (
                        <InstructorCard key={index} {...instructor} />
                      ))
                    ) : (
                      <p className='text-neutral-500 text-lg text-center mt-4'>نماینده فعالی در استان انتخابی شما وجود ندارد !</p>
                    )
                  }
                </div>
              </div>
              
              <Link 
                to={`/representatives/${selectedProvince}`}
                className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center justify-end gap-2"
              >
                مشاهده همه نمایندگان
                <ChevronLeft size={16} />
              </Link>

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