import GridPostList from "@/components/common/GridPostList";
import Loader from "@/components/common/Loader";
import SearchResult from "@/components/common/SearchResult";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPostsMutation, useSearchPostsMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import {useInView} from 'react-intersection-observer'


export default function ExplorePage() {
  const [searchValue, setSearchValue] = useState('');
  const {ref, inView} = useInView()

  const {data: posts, fetchNextPage, hasNextPage} = useGetPostsMutation()
  const debauncedValue = useDebounce(searchValue, 500)
  const {data: searchedPost, isFetching: isSearchFetch} = useSearchPostsMutation(debauncedValue)

  const showShowSearchResults = searchValue !== '';
  const shouldShowPosts = !showShowSearchResults 
        && posts?.pages.every((item) => item?.documents.length === 0)
  
  if(!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader/>
      </div>
    )
  }

  useEffect(()=>{
    if(inView && !searchValue) fetchNextPage()
  }, [inView, searchValue])

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2> 
        <div className="flex gap-1 px-4 w-full bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
         <h2 className="body-bold md:h3-bold">Popular today</h2>
         <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
         </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {showShowSearchResults ? (
          <SearchResult
            isSearchFetching={isSearchFetch}
            searchedPost={searchedPost?.documents ?? []}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ): posts.pages.map((item, index) =>
          item ? (
            <GridPostList
              key={`page-${index}`}
              posts={item.documents}
            />
          ) : null
        )}
      </div>

      {hasNextPage && searchValue && (
        <div ref={ref} className="mt-10">
          <Loader/>
        </div>
      )}
    </div>
  )
}
