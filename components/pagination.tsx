"use client"

import { useMatchStore } from "@/store/match-store"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  totalMatches: number
  matchesPerPage: number
}

export default function Pagination({ totalMatches, matchesPerPage }: PaginationProps) {
  const { currentPage, setCurrentPage } = useMatchStore()

  const totalPages = Math.ceil(totalMatches / matchesPerPage)

  if (totalPages <= 1) return null

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="flex justify-center items-center mt-10 space-x-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-md transition-all duration-300 ${
          currentPage === 1
            ? "text-gray-600 cursor-not-allowed"
            : "text-white hover:bg-[rgba(var(--neon-blue),0.2)] border border-transparent hover:border-[rgba(var(--neon-blue),0.5)] hover:neon-border"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="px-4 py-2 bg-[rgba(var(--dark-bg),0.7)] rounded-md border border-[rgba(var(--neon-blue),0.3)] neon-border">
        <span className="font-medium">
          {currentPage} <span className="text-[rgb(var(--neon-blue))]">/</span> {totalPages}
        </span>
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md transition-all duration-300 ${
          currentPage === totalPages
            ? "text-gray-600 cursor-not-allowed"
            : "text-white hover:bg-[rgba(var(--neon-blue),0.2)] border border-transparent hover:border-[rgba(var(--neon-blue),0.5)] hover:neon-border"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
