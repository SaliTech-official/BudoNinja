import { useState } from 'react';
import { DashboardStatCard } from '../../components/cards/DashboardStatCard';
import { Button } from '../../components/UI/Button';
import { Award, Star, Plus, X, Trophy, ClipboardPlus, RefreshCw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProfileCompletionWidget } from '../../components/widgets/ProfileCompletionWidget';
import { useNavigate } from 'react-router-dom';

import membershipCardImage from '../../assets/MembershipCard.jpg'; 

export function DashboardHomePage() {
  const navigate = useNavigate()

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const userProfileStatus = { isComplete: false, percentage: 35 };

  return (
    <>
      <div className="space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 h-60 lg:h-auto">
            <button 
              onClick={() => setIsCardModalOpen(true)} 
              className="w-full h-full rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 ring-primary-500 ring-offset-2"
              aria-label="بزرگنمایی کارت عضویت"
            >
              <img src={membershipCardImage} alt="کارت عضویت دیجیتال" className="w-full h-full object-cover" />
            </button>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <DashboardStatCard IconComponent={Star} value="۵" label="امتیاز استارژ" />
              <DashboardStatCard IconComponent={Trophy} value="۱۲" label="تعداد مسابقات" color='blue'/>
              <DashboardStatCard IconComponent={Award} value="۸" label="تعداد کورای دوری" color='green'/>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="outline" onClick={() => navigate('certificates/request')} className="h-16 justify-center text-sm gap-2">
                <span>
                  درخواست حکم 
                </span>
                <Plus className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate('membership/renew')} className="h-16 justify-center text-sm gap-2 border-blue-600 text-blue-600 hover:bg-blue-600 active:bg-blue-400">
                <span>
                  تمدید کارت 
                </span>
                <RefreshCw className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => navigate('events')} className="h-16 justify-center text-sm gap-2 border-green-600 text-green-600 hover:bg-green-600 active:bg-green-400">
                <span>
                  ثبت نام مسابقه 
                </span>
                <ClipboardPlus className="ml-2 h-4 w-4" />
              </Button>
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
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={membershipCardImage} 
                alt="کارت عضویت"
                className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-2xl shadow-2xl cursor-default"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full"
                onClick={() => setIsCardModalOpen(false)}
                aria-label="بستن"
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