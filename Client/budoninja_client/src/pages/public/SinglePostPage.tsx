import { Sidebar } from '../../components/Public/NewsArchive/Sidebar';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Folder, Share2 } from 'lucide-react';
import { NewsCard } from '../../components/cards/NewsCard';
import { Badge } from '../../components/UI/Badge';
import { Button } from '../../components/UI/Button';
import NewsCardPicture from '../assets/NewsCard.png';

const postData = {
  slug: "team-champion",
  title: "تیم ملی نینجوتسو ایران قهرمان مسابقات جهانی ژاپن شد",
  imageUrl: NewsCardPicture,
  author: "روابط عمومی",
  date: "۲۰ آبان ۱۴۰۳",
  category: "مسابقات بین‌المللی",
  views: 254,
  content: `
    <p>تیم ملی نینجوتسو جمهوری اسلامی ایران پس از چهار روز رقابت فشرده با برترین‌های جهان در شهر توکیو، با کسب ۱۰ مدال طلا، ۵ نقره و ۳ برنز، مقتدرانه بر سکوی نخست جهان ایستاد. این موفقیت بزرگ، حاصل ماه‌ها تلاش بی‌وقفه ورزشکاران و کادر فنی بود.</p>
    <p>به گزارش روابط عمومی سبک، این مسابقات که با حضور بیش از ۴۰ کشور و ۵۰۰ ورزشکار در استایل‌های مبارزاتی، کاتا و دفاع شخصی برگزار شد، سطح فنی بسیار بالایی داشت. استاد اکبر فرجی، رئیس سبک، در پیامی این قهرمانی را به جامعه ورزش کشور تبریک گفت.</p>
    <img src=${NewsCardPicture} alt="Meditation pose" class="w-full my-8 rounded-lg shadow-md" />
    <h3>جزئیات مدال‌ها</h3>
    <p>در بخش هنرهای فردی، آقای رضا حسینی با اجرای بی‌نقص کاتای شمشیر، توانست بالاتر از رقیب ژاپنی خود قرار بگیرد و مدال طلای این بخش را از آن خود کند. همچنین در بخش بانوان، تیم ایران در استایل مبارزات گروهی عملکردی خیره‌کننده داشت و تمامی رقبای خود را شکست داد.</p>
    <ul>
      <li>مدال طلا: ۱۰</li>
      <li>مدال نقره: ۵</li>
      <li>مدال برنز: ۳</li>
    </ul>
  `,
  tags: ["تیم_ملی", "قهرمانی", "ژاپن", "نینجوتسو"],
};

const relatedNews = [
  { id: 4, title: "اعزام تیم به مسابقات آسیایی", excerpt: "تیم منتخب برای مسابقات آسیایی مشخص شد...", imageUrl: NewsCardPicture , category: "اخبار", date: "۱۸ آبان", link: "/news/4" },
  { id: 5, title: "کارگاه دانش‌افزایی داوران", excerpt: "کارگاه جدید داوری با حضور مدرس بین‌المللی...", imageUrl: NewsCardPicture , category: "آموزش", date: "۱۵ آبان", link: "/news/5" },
//   { id: 6, title: "نتایج مسابقات استانی تهران", excerpt: "نفرات برتر مسابقات استانی تهران معرفی شدند...", imageUrl: NewsCardPicture, category: "مسابقات", date: "۱۲ آبان", link: "/news/6" },
];
// --------------------

export function SinglePostPage() {
  // const { slug } = useParams();
  // const { data: postData, isLoading } = useQuery(...)

  return (
    <>
      <div className="bg-white text-neutral-900">
        <div className="px-6 md:px-8 py-16">
          
          

          <div className="flex gap-12 max-w-7xl mx-auto items-start">

            <div className="hidden lg:block lg:sticky lg:top-28">
              <Sidebar />
            </div>
            
            <article className="lg:col-span-2">
                <nav className="text-sm text-neutral-500 mb-8 max-w-7xl mx-auto">
                    <Link to="/" className="hover:text-primary-600">صفحه اصلی</Link>
                    <span className="mx-2">/</span>
                    <Link to="/news" className="hover:text-primary-600">اخبار</Link>
                    <span className="mx-2">/</span>
                    <span className="text-neutral-700 font-medium truncate max-w-xs">{postData.title}</span>
                </nav>
              <img 
                src={postData.imageUrl} 
                alt={postData.title} 
                className="w-full h-auto rounded-xl object-cover aspect-video shadow-lg" 
              />
              
              <div className="mt-6">
                <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
                  <div className="flex items-center gap-2"><User size={16} /><span>{postData.author}</span></div>
                  <div className="flex items-center gap-2"><Calendar size={16} /><span>{postData.date}</span></div>
                  <div className="flex items-center gap-2"><Folder size={16} /><span>{postData.category}</span></div>
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-neutral-900 leading-tight">
                  {postData.title}
                </h1>
              </div>

              <div 
                className="article-content prose-lg max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
              
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center flex-wrap gap-2">
                    {postData.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-neutral-600 bg-neutral-100 border-neutral-100">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className='bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 hover:text-neutral-700'><Share2 width={24} height={24} /></Button>
                  </div>
                </div>
              </div>
            </article>

            
          </div>
        </div>

        <div className="bg-neutral-100 mt-16 py-20">
          <div className="container mx-auto px-6 md:px-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">اخبار مرتبط</h2>
            <div className="flex justify-center items-center flex-wrap gap-8 max-w-6xl mx-auto">
              {relatedNews.map(news => <NewsCard key={news.id} {...news} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}