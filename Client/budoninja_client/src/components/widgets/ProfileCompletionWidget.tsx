import { Link } from 'react-router-dom';
import { Button } from '../UI/Button';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const ProgressBar = ({ percentage }: { percentage: number }) => (
  <div className="w-full bg-neutral-200 rounded-full h-2.5">
    <div 
      className="bg-primary-600 h-2.5 rounded-full transition-all duration-500" 
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);


interface ProfileCompletionWidgetProps {
  isProfileComplete: boolean;
  completionPercentage: number;
}

export function ProfileCompletionWidget({ isProfileComplete, completionPercentage }: ProfileCompletionWidgetProps) {
  
  if (isProfileComplete) {
    return (
      <div className="rounded-lg bg-success-50 p-6 flex items-center gap-4 border border-success-200">
        <div className="flex-shrink-0">
          <CheckCircle2 className="h-10 w-10 text-success-600" />
        </div>
        <div>
          <h3 className="font-bold text-success-800">احراز هویت شما تکمیل شده است!</h3>
          <p className="text-sm text-success-700 mt-1">
            اکنون می‌توانید برای دریافت احکام و شرکت در رویدادها اقدام کنید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-primary-50 border-primary-200",
      "border",
    )}>
      <div className="flex-shrink-0">
        <AlertTriangle className={cn(
            "h-10 w-10 text-primary-500",
        )} />
      </div>
      
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-neutral-800">پروفایل شما ناقص است</h3>
            <span className="text-sm font-semibold text-primary-600">{completionPercentage}%</span>
        </div>
        <ProgressBar percentage={completionPercentage} />
        <p className="text-sm text-neutral-600 mt-2">
          برای دسترسی به تمام امکانات، لطفاً اطلاعات پروفایل خود را تکمیل کنید.
        </p>
      </div>

      <div className="w-full sm:w-auto flex-shrink-0">
        <Button className="w-full">
          <Link to="profile">تکمیل اطلاعات</Link>
        </Button>
      </div>
    </div>
  );
}