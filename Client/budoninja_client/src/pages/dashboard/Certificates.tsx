import CertificateCard from '../../components/cards/CertificateCard'
import { Button } from '../../components/UI/Button'
import { FilterGroup } from '../../components/UI/FilterGroup'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Certificates() {

    const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-8 relative'>
        {/* هدر فیلترها */}
        <div className='w-full flex justify-between items-center'>
            <FilterGroup
                options={[
                    { id: "all", label: "همه" },
                    { id: "fani", label: "احکام فنی" },
                    { id: "champion", label: "احکام قهرمانی" },
                ]}
                defaultValue="all"
                onChange={(value) => console.log(value)}
            />
            
            {/* دکمه دسکتاپ: در موبایل مخفی (hidden) و در دسکتاپ نمایش داده می‌شود (md:flex) */}
            <Button size="lg" className='hidden md:flex gap-2' onClick={() => navigate("/dashboard/certificates/request")}>
                <Plus className='w-5 h-5'/>
                <span>درخواست حکم جدید</span>
            </Button>
        </div>

        {/* کارت‌ها */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
            <CertificateCard
                title="کمربند سبز"
                code="A-10234"
                date={{ year: "1403", month: "05", day: "12" }}
            />
        </div>
        <Button variant="primary" className='md:hidden fixed bottom-6 left-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50' onClick={() => navigate("/dashboard/certificates/request")}>
            <Plus className='w-8 h-8' />
        </Button>
    </div>
  )
}
