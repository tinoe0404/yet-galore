'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';

interface FilterBarProps {
  categories: { name: string; slug: string }[];
}

export function FilterBar({ categories }: FilterBarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useQueryState('q', { defaultValue: '' });
  const [sortValue, setSortValue] = useQueryState('sort', { defaultValue: 'newest' });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const debouncedSearch = useDebounce(localSearch, 300);

  React.useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      setSearchQuery(debouncedSearch || null);
    }
  }, [debouncedSearch, setSearchQuery, searchQuery]);

  return (
    <div className="w-full border-b border-border mb-12 bg-background">
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center py-4 px-6 border-b border-border">
        <button 
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="flex items-center gap-2 font-sans text-sm uppercase tracking-widest"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filter & Sort
        </button>
      </div>

      <div className={cn(
        "flex-col md:flex-row items-start md:items-center justify-between py-6 px-6 md:px-12",
        isMobileFiltersOpen ? "flex" : "hidden md:flex"
      )}>
        {/* Left: Categories */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mb-6 md:mb-0">
          <Link 
            href="/catalogue"
            className={cn(
              "px-4 py-2 font-sans text-xs tracking-widest uppercase transition-colors duration-200",
              pathname === '/catalogue' 
                ? "bg-black text-white" 
                : "bg-transparent text-black border border-border hover:border-black hover:bg-black hover:text-white"
            )}
          >
            All
          </Link>
          {categories.map(cat => {
            const isActive = pathname === `/catalogue/${cat.slug}`;
            return (
              <Link 
                key={cat.slug}
                href={`/catalogue/${cat.slug}`}
                className={cn(
                  "px-4 py-2 font-sans text-xs tracking-widest uppercase transition-colors duration-200",
                  isActive 
                    ? "bg-black text-white" 
                    : "bg-transparent text-black border border-border hover:border-black hover:bg-black hover:text-white"
                )}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text"
              placeholder="Search pieces..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 font-sans text-sm border border-border bg-transparent focus:outline-none focus:border-black transition-colors rounded-none"
            />
          </div>
          <select 
            value={sortValue || 'newest'}
            onChange={(e) => setSortValue(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 font-sans text-sm border border-border bg-transparent focus:outline-none focus:border-black transition-colors rounded-none appearance-none pr-8 cursor-pointer"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'/%3e%3c/svg%3e")', 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'right 0.5rem center', 
              backgroundSize: '1em' 
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
