import { NewsCard } from "../../cards/NewsCard";
import NewsCardPicture from "../../../assets/NewsCard.png"
import { Button } from "../../UI/Button";

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
          id: 2,
          imageUrl: NewsCardPicture,
          category: "مسابقات",
          date: "۲۰ آبان ۱۴۰۳",
          title: "تیم ملی نینجوتسو قهرمان جهان شد",
          excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
          link: "/news/2",
        },
        {
          id: 3,
          imageUrl: NewsCardPicture,
          category: "مسابقات",
          date: "۲۰ آبان ۱۴۰۳",
          title: "تیم ملی نینجوتسو قهرمان جهان شد",
          excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
          link: "/news/3",
        },
        {
          id: 4,
          imageUrl: NewsCardPicture,
          category: "مسابقات",
          date: "۲۰ آبان ۱۴۰۳",
          title: "تیم ملی نینجوتسو قهرمان جهان شد",
          excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
          link: "/news/4",
        },
        {
          id: 5,
          imageUrl: NewsCardPicture,
          category: "مسابقات",
          date: "۲۰ آبان ۱۴۰۳",
          title: "تیم ملی نینجوتسو قهرمان جهان شد",
          excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
          link: "/news/5",
        },
        {
          id: 6,
          imageUrl: NewsCardPicture,
          category: "مسابقات",
          date: "۲۰ آبان ۱۴۰۳",
          title: "تیم ملی نینجوتسو قهرمان جهان شد",
          excerpt: "تیم ملی ایران با کسب ۱۰ مدال طلا در مسابقات جهانی ژاپن، بر سکوی نخست ایستاد.",
          link: "/news/6",
        },
      ];

export function NewsList() {

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-8">
        {sampleNewsData.map((news) => (
          <NewsCard className="max-w-full xl:max-w-[48%] w-full" key={news.id} {...news} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button 
          variant="outline" 
          className="w-full px-12 border-neutral-300 text-neutral-600 hover:bg-neutral-900/25 active:bg-neutral-900/35"
        >
          مشاهده بیشتر...
        </Button>
      </div>
    </div>
  );
}