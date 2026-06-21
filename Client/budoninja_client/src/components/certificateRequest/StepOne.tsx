import { useState } from "react";
import { CertificateTypeCard } from "../cards/CertificateTypeCard";
import { Button } from "../UI/Button";
import { Star, GraduationCap, Scale, ChevronLeft } from "lucide-react";

interface Props {
  onNext: () => void;
}

export default function StepOne({ onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <div className="flex flex-wrap justify-center gap-6">
        <CertificateTypeCard
          icon={<Star size={40} />}
          title="ارتقا کمربند"
          description="صدور احکام آزمون‌های فنی کیو و دان"
          isActive={selected === "belt"}
          onClick={() => setSelected("belt")}
        />
        <CertificateTypeCard
          icon={<GraduationCap size={40} />}
          title="حکم مربیگری"
          description="درخواست صدور و ارتقاء درجات مربیگری"
          isActive={selected === "coach"}
          onClick={() => setSelected("coach")}
        />
        <CertificateTypeCard
          icon={<Scale size={40} />}
          title="حکم داوری"
          description="درخواست صدور و تمدید دفترچه داوری"
          isActive={selected === "judge"}
          onClick={() => setSelected("judge")}
        />
      </div>

      <div className="w-full flex justify-between max-w-[830px]">
        <Button variant="outline" size="lg">انصراف</Button>
        <Button 
            size="lg" 
            onClick={onNext}
            disabled={!selected}
            className="gap-2"
        >
            <span>مرحله بعد</span>
            <ChevronLeft size={24}/>
        </Button>
      </div>
    </div>
  );
}
