import { useState } from "react"
import { Sidebar } from "../components/Public/NewsArchive/Sidebar"
import { NewsList } from "../components/Public/NewsArchive/NewsList"
import { Filter } from "lucide-react"
import { Button } from "../components/UI/Button"
import { div } from "framer-motion/client"
import { AnimatePresence } from 'framer-motion';
import { FilterModal } from "../components/Public/NewsArchive/FilterModal"

export default function NewsArchivePage() {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <>
    
    <div className="flex flex-col items-center px-6 lg:px-20 py-16 lg:py-24 gap-12 bg-neutral-50">
        <div className="md:hidden w-full">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Filter className="ml-2 h-4 w-4" />
            فیلتر و دسته‌بندی‌ها
          </Button>
        </div>

        <div className="flex justify-center gap-12">
            <div className="hidden md:block">
                <Sidebar/>
            </div>
            <NewsList />
        </div>
    </div>
    <AnimatePresence>
        {isFilterModalOpen && (
          <FilterModal onClose={() => setIsFilterModalOpen(false)} />
        )}
    </AnimatePresence>
    </>
    
  )
}
