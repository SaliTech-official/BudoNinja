import { useState } from 'react';
import { DashboardStatCard } from '../../components/cards/DashboardStatCard';
import { Button } from '../../components/UI/Button';
import { Award, Star, Plus, X, Trophy, ClipboardPlus, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileCompletionWidget } from '../../components/widgets/ProfileCompletionWidget';
import membershipCardImage from '../../assets/MembershipCard.jpg'; 

export function DashboardHomePage() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const userProfileStatus = { isComplete: false, percentage: 35 };

  return (
    <>
      <div className="space-y-12">
        
        <div className="flex h-60 gap-6">
          
          <div className="w-[400px] flex-shrink-0">
            <button 
              onClick={() => setIsCardModalOpen(true)} 
              className="h-full w-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 ring-primary-500 ring-offset-2"
              aria-label="بزرگنمایی کارت عضویت"
            >
              <img src={membershipCardImage} alt="کارت عضویت دیجیتال" className="h-full w-full object-cover" />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            
            <div className="flex gap-6 h-[130px]">
              <DashboardStatCard IconComponent={Star} value="۵" label="امتیاز استارژ" className="flex-1" />
              <DashboardStatCard IconComponent={Trophy} value="۱۲" label="تعداد مسابقات" className="flex-1" color='blue'/>
              <DashboardStatCard IconComponent={Award} value="۸" label="تعداد کورای دوری" className="flex-1" color='green'/>
            </div>
            
            <div className="flex-1 flex gap-6">
              <Button variant="primary" className="flex-1 h-full shadow-sm gap-2 bg-neutral-50 text-primary-600 hover:bg-primary-100">ثبت نام مسابقه جدید<Plus className="ml-2 h-4 w-4" /></Button>
              <Button variant="primary" className="flex-1 h-full shadow-sm gap-2 bg-neutral-50 text-blue-600 hover:bg-blue-100">تمدید آنلاین کارت<RefreshCw className="ml-2 h-4 w-4" /></Button>
              <Button variant="primary" className="flex-1 h-full shadow-sm gap-2 bg-neutral-50 text-green-600 hover:bg-green-100">درخواست حکم<ClipboardPlus className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>
        </div>

        <ProfileCompletionWidget 
          isProfileComplete={userProfileStatus.isComplete}
          completionPercentage={userProfileStatus.percentage}
        />
      </div>

      <AnimatePresence>
        {isCardModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCardModalOpen(false)}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <img 
                src={membershipCardImage} 
                alt="کارت عضویت"
                className="max-w-[90vw] max-h-[80vh] rounded-2xl"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-white"
                onClick={() => setIsCardModalOpen(false)}
              >
                <X />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}