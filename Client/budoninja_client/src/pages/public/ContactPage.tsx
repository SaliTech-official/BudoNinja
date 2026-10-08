import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/UI/InputField";
import { Button } from "../../components/UI/Button";
import { Phone, Mail, MapPin, Instagram, Send } from "lucide-react";
import { useCreateTicket } from "../../hooks/mutations/useCreateTicket";
import {
  contactFormSchema,
  type ContactFormValues,
} from "../../validations/contact.schema";

const ContactInfoItem = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600">
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <h3 className="text-sm text-neutral-400">{title}</h3>
      <p className="text-base md:text-xl font-semibold text-neutral-900">
        {text}
      </p>
    </div>
  </div>
);

export function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      title: "",
      content: "",
    },
  });

  const createTicket = useCreateTicket({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    createTicket.mutate(values);
  };

  const isLoading = createTicket.isPending || isSubmitting;

  return (
    <div className="bg-neutral-50">
      <div className="flex flex-col lg:flex-row gap-20 px-6 md:px-20 py-16 md:py-20">
        {/* Form */}
        <div className="order-last lg:order-first w-full text-neutral-600">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              ارسال پیام مستقیم
            </h2>

            <InputField
              id="full_name"
              label="نام و نام خانوادگی"
              placeholder="مثلاً: علی محمدی"
              errorMessage={errors.full_name?.message}
              {...register("full_name")}
            />

            <InputField
              id="phone_number"
              label="شماره تماس"
              type="tel"
              placeholder="09123456789"
              inputMode="numeric"
              maxLength={11}
              autoComplete="tel"
              errorMessage={errors.phone_number?.message}
              {...register("phone_number")}
            />

            <InputField
              id="title"
              label="موضوع پیام"
              placeholder="مثلاً: درخواست همکاری"
              errorMessage={errors.title?.message}
              {...register("title")}
            />

            <InputField
              id="content"
              as="textarea"
              label="متن پیام"
              placeholder="پیام خود را اینجا بنویسید..."
              rows={5}
              errorMessage={errors.content?.message}
              {...register("content")}
            />

            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>در حال ارسال...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>ارسال پیام</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Info */}
        <div className="order-first lg:order-last space-y-10 w-full p-4 md:p-10 border border-neutral-200 shadow-md rounded-3xl">
          <div className="space-y-6">
            <ContactInfoItem
              icon={<MapPin />}
              title="آدرس دفتر مرکزی"
              text="تهران، مجموعه ورزشی آزادی، دفتر مرکزی سبک"
            />
            <div className="w-full h-px bg-neutral-200"></div>
            <ContactInfoItem
              icon={<Phone />}
              title="تلفن تماس"
              text="۰۲۱-۱۲۳۴۵۶۷۸"
            />
            <div className="w-full h-px bg-neutral-200"></div>
            <ContactInfoItem
              icon={<Mail />}
              title="پست الکترونیک"
              text="info@budoninja.ir"
            />
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
            <iframe
              title="نقشه دفتر مرکزی"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.880521406566!2d51.26880481525946!3d35.70453988018885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8dfbe294136437%3A0x4ab383416e7884a!2sAzadi%20Sport%20Complex!5e0!3m2!1sen!2s!4v1620000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col gap-4 items-start">
            <h3 className="text-base text-neutral-900 font-semibold">
              ما را در شبکه‌های اجتماعی دنبال کنید
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام"
              >
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700"
                >
                  <Instagram width={24} height={24} />
                </Button>
              </a>
              <a href="mailto:info@budoninja.ir" aria-label="ایمیل">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700"
                >
                  <Mail width={24} height={24} />
                </Button>
              </a>
              <a href="tel:02112345678" aria-label="تماس تلفنی">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700"
                >
                  <Phone width={24} height={24} />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
