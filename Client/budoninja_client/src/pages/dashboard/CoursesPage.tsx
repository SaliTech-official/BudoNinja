import { FilterGroup } from '../../components/UI/FilterGroup'
import CourseCard from '../../components/cards/CourseCard'

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-8">
      <FilterGroup
        options={[
          { id: "all", label: "همه" },
          { id: "professional", label: "فنی" },
          { id: "coach", label: "مربیگری" },
          { id: "referee", label: "داوری" },
        ]}
        defaultValue="all"
        onChange={(value) => console.log(value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
            title='دوره مربیگری سطح 1'
            coach='علی محمدی'
            time={48}
            capacity={50}
        />
        <CourseCard
            title='دوره مربیگری سطح 1'
            coach='علی محمدی'
            time={48}
            capacity={50}
        />
        <CourseCard
            title='دوره مربیگری سطح 1'
            coach='علی محمدی'
            time={48}
            capacity={50}
        />
        <CourseCard
            title='دوره مربیگری سطح 1'
            coach='علی محمدی'
            time={48}
            capacity={50}
        />
      </div>
    </div>
  )
}
