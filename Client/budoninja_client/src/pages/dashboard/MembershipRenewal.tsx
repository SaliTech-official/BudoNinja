import { Button } from '../../components/UI/Button';
import membershipCardImage from '../../assets/MembershipCard.jpg'; 
import { CreditCard } from 'lucide-react';

export default function MembershipRenewal() {

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="w-full">
          <img 
            src={membershipCardImage} 
            alt="کارت عضویت" 
            className="w-full rounded-xl shadow-lg" 
          />
        </div>

        <div className="bg-neutral-50 p-6 rounded-xl border border-primary-100 shadow-sm flex flex-col gap-6">
          <div className='flex flex-col gap-2 items-center'>
            <h2 className="font-semibold text-neutral-500">مبلغ قابل پرداخت</h2>
            <h3 className='text-3xl text-primary-600'>۲۰۰,۰۰۰ تومان</h3>
          </div>
          <div className='w-full flex justify-center items-center p-3 bg-neutral-100 rounded-lg'>
            <p className='text-neutral-600 text-xs'>شامل هزینه حق عضویت سالانه و مالیات ارزش افزوده</p>
          </div>
          <Button className="w-full h-12 gap-2">
            <CreditCard size={24}/>
            پرداخت و تمدید
          </Button>
        </div>

      </div>
    </div>
  );
}
