import { NewsCard } from "../../cards/NewsCard";
import NewsCardPicture from "../../../assets/NewsCard.png";
import { Link } from "react-router-dom";

const sampleNewsData = [
  {
    id: 1,
    imageUrl: NewsCardPicture,
    category: "مسابقات",
    date: "۲۰ آبان ۱۴۰۳",
    title: "تیم ملی نینجوتسو قهرمان جهان شد",
    excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
    link: "/news/1",
  },
  {
    id: 1,
    imageUrl: NewsCardPicture,
    category: "مسابقات",
    date: "۲۰ آبان ۱۴۰۳",
    title: "تیم ملی نینجوتسو قهرمان جهان شد",
    excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
    link: "/news/2",
  },
  {
    id: 1,
    imageUrl: NewsCardPicture,
    category: "مسابقات",
    date: "۲۰ آبان ۱۴۰۳",
    title: "تیم ملی نینجوتسو قهرمان جهان شد",
    excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
    link: "/news/3",
  },
];

export function NewsSection() {
  return (
    <section className="bg-bg-secondary py-24">
      <div className="flex flex-col justify-center px-6 md:px-20">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">آخرین اخبار و رویدادها</h2>
          <Link 
              to="/news" 
              className="text-sm font-medium text-primary-400 hover:text-primary-600 transition-colors flex items-center gap-2"
          >
              مشاهده آرشیو اخبار
              <span>&larr;</span>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {sampleNewsData.map((news) => (
            <NewsCard key={news.id} {...news} />
          ))}
        </div>

      </div>
    </section>
  );
}