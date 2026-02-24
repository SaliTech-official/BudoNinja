import { Input } from '../../components/UI/Input';
import { TextArea } from '../../components/UI/TextArea';
import { Button } from '../../components/UI/Button';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';

const ContactInfoItem = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600">
      {icon}
    </div>
    <div className='flex flex-col gap-1'>
      <h3 className="text-sm text-neutral-400">{title}</h3>
      <p className="text-base md:text-xl font-semibold text-neutral-900">{text}</p>
    </div>
  </div>
);


export function ContactPage() {
  return (
    <>
      <div className="bg-neutral-50">
          <div className="flex flex-col lg:flex-row gap-20 px-6 md:px-20 py-16 md:py-20">
            <div className="order-last lg:order-first w-full text-neutral-600">
              <form className="space-y-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">ارسال پیام مستقیم</h2>
                <label htmlFor="fullName">نام و نام خانوادگی :</label>
                <Input id="fullName" placeholder="مثلاً: علی"  className='mt-1.5'/>
                <label htmlFor="phone">شماره تماس :</label>
                <Input type="phone" id="phone" placeholder="09000000000"  className='mt-1.5'/>
                <label htmlFor="subject">موضوع پیام :</label>
                <Input id="subject" placeholder="موضوع پیام شما"  className='mt-1.5'/>
                <label htmlFor="message">متن پیام :</label>
                <TextArea
                  id="message"
                  placeholder="پیام خود را اینجا بنویسید..."
                  rows={5} 
                  className='mt-1.5'
                />
                <Button type="submit" className="w-full" size="lg">
                  ارسال پیام
                </Button>
              </form>
            </div>

            <div className="order-first lg:order-last space-y-10 w-full p-4 md:p-10 border border-neutral-200 shadow-md rounded-3xl">
              <div className="space-y-6">
                <ContactInfoItem 
                  icon={<MapPin />} 
                  title="آدرس دفتر مرکزی" 
                  text="تهران، مجموعه ورزشی آزادی، دفتر مرکزی سبک" 
                />
                <div className='w-full h-px bg-neutral-200'></div>
                <ContactInfoItem 
                  icon={<Phone />} 
                  title="تلفن تماس" 
                  text="۰۲۱-۱۲۳۴۵۶۷۸" 
                />
                <div className='w-full h-px bg-neutral-200'></div>
                <ContactInfoItem 
                  icon={<Mail />} 
                  title="پست الکترونیک" 
                  text="info@budoninja.ir" 
                />
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.880521406566!2d51.26880481525946!3d35.70453988018885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfbe294136437%3A0x4ab383416e7884a!2sAzadi%20Sport%20Complex!5e0!3m2!1sen!2s!4v1620000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className='flex flex-col gap-4 items-start'>
                <h3 className='text-base text-neutral-900 font-semibold'>ما را در شبکه های اجتماعی دنبال کنید</h3>
                <div className='flex gap-3'>
                <Button size="icon" variant="ghost" className='bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700'><Phone width={24} height={24} /></Button>
                <Button size="icon" variant="ghost" className='bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700'><Phone width={24} height={24} /></Button>
                <Button size="icon" variant="ghost" className='bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700'><Phone width={24} height={24} /></Button>
                </div>
              </div>
            </div>

          </div>
      </div>
    </>
  );
}