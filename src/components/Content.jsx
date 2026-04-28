import {Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import Chapter from "../pages/Chapter";
import Genre from "../pages/Genre";
import Home from "../pages/Home";
import List from "../pages/List";
import Manga from "../pages/Manga";
import Latest from "../pages/Latest";
import Popular from "../pages/Popular";
import SearchResult from "../pages/SearchResult";
import Trending from "../pages/Trending";

export default function Content() {
    return (
        <div className="w-full h-auto">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/list" element={<List/>}/>
                <Route path="/popular" element={<Popular/>}/>
                <Route path="/latest" element={<Latest/>}/>
                <Route path="/trending" element={<Trending/>}/>
                <Route path="/search" element={<SearchResult/>}/>
                <Route path="/genre/:genre" element={<Genre/>}/>
                <Route path="/manga/:slug" element={<Manga/>}/>
                <Route path="/chapter/:slug" element={<Chapter/>}/>   
            </Routes>
        </div>
    )
}