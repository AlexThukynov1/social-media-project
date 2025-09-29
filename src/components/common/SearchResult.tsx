import type { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultProps = {
    isSearchFetching: boolean;
    searchedPost: Models.Document[];

}


export default function SearchResult({isSearchFetching, searchedPost}: SearchResultProps) {

if(isSearchFetching) return <Loader/>

if(searchedPost && searchedPost.length > 0) {
  return (
    <GridPostList
        posts={searchedPost}
    />
  )  
}
  return (
    <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}
