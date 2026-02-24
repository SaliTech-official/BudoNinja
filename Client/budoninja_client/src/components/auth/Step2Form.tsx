import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/UI/Select";
import { SegmentedControl } from "../UI/SegmentedControl";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Step2FormProps {
  onNext: () => void;
  onBack: () => void;
}

export function Step2Form({ onNext, onBack }: Step2FormProps) {
    const [gender, setGender] = useState('male');

    const genderOptions = [
      { label: 'آقا', value: 'male' },
      { label: 'خانم', value: 'female' },
    ];
  

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="flex flex-col gap-6">
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-sm text-neutral-500">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="birth-date">تاریخ تولد:</label>
                    <Input id="birth-date" placeholder="روز / ماه / سال"/>
                </div>
            
                <div className="flex flex-col gap-1.5">
                    <label>استان:</label>
                    <Select>
                    <SelectTrigger className="text-neutral-400 bg-bg-tertiary"><SelectValue placeholder="استان" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="esfahan">اصفهان</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label>شهر:</label>
                    <Select>
                    <SelectTrigger className="text-neutral-400 bg-bg-tertiary"><SelectValue placeholder="شهر" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tehran">تهران</SelectItem>
                        <SelectItem value="esfahan">اصفهان</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div  className="flex flex-col gap-1.5">
                    <label>جنسیت:</label>
                    <SegmentedControl 
                        options={genderOptions}
                        value={gender}
                        onValueChange={setGender}
                    />
                </div>
            </div>

            <div className="flex gap-4">
                <Button onClick={onBack} variant="outline" className="w-full gap-2 hover:bg-primary-100 hover:text-primary-600">
                    <ChevronRight size={24} />
                    بازگشت به قبل
                </Button>
                <Button type="submit" className="w-full gap-2">
                مرحله بعدی
                <ChevronLeft size={24} />
                </Button>
            </div>
        </div>
        <div className="flex justify-center gap-1 text-sm">
            <span className="text-neutral-500">حساب دارید؟</span>
            <Link to="/login" className="font-semibold text-primary-600">ورود</Link>
        </div>
    </form>
  );
}