'use client'
import { topSongData } from "@/../public/data/topSongData";
import SelectBox from "@/components/shared/SelectBox";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import MoodsCard from "../home/MoodsCard";
import { toast } from "react-toastify";
import api from "@/lib/api";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import VideoCard from "../home/VideoCard";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchData } from "@/utils/fetchData";

const artists = [
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const genres = [
  { label: "All Artists" },
  { label: "New Artists" },
  { label: "Expert Artists" },
];

const MusicSection = () => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [query, setQuery] = useState(null)
  const sq = useSearchParams();
  const router = useRouter()



  // const getMusicVideos = async (page: number, pageSize: number, q?: string) => {
  //   setIsLoading(true)
  //   try {
  //     // let res = null
  //     // if (query && !q) {
  //     //   res = await api.server.GET(`/data/videos?page=${page}&pageSize=${pageSize}&query=${query}`, '')
  //     // } else if (q) {
  //     //   res = await api.server.GET(`/data/videos?page=${page}&pageSize=${pageSize}&query=${q}`, '')

  //     // } else {
  //     //   res = await api.server.GET(`/data/videos?page=${page}&pageSize=${pageSize}`, '')
  //     // }

  //     const res = await api.server.GET(`/data/videos?page=${page}&pageSize=${pageSize}`, '')
  //     const data = await res.json();
  //     if (data.status) {
  //       setVideos((prev: any) => {
  //         return [...prev, ...data.videos]
  //       })
  //       setCurrentPage(prev => prev + 1)
  //       return data
  //     }

  //     toast(data.message, { theme: 'dark' })
  //   } catch (error: any) {
  //     // toast(error.message, { theme: 'dark' })
  //     console.log('Error:', error.message)
  //   } finally {
  //     setIsLoading(false)
  //   }

  // }



  useEffect(() => {
    const run = async () => {
      setIsLoading(true)
      const q = sq.get('query')
      if (q) setQuery(q)
      const data = await fetchData(`/data/videos`, 1, 12, q ? q : null)
      data.status && setVideos(data.videos)
      setCurrentPage(prev => prev + 1)
      setIsLoading(false)
    }
    run()
  }, [sq])

  const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    setIsLoading(true)
    router.push(`?query=${query}`)
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = await fetchData(`/data/videos`, 1, 12, formData.get('query') as string)
    setVideos(data.videos)
    try {
    } catch (error: any) {
      toast(error.message, { theme: 'dark' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="trending__section hotsong__section pr-24 pl-24 pb-100">
      <div className="trending__selected mb-30 d-flex align-items-center justify-content-lg-between justify-content-center">
        <div className="select__lefts d-flex align-items-center">
          <form
            onSubmit={handleSearch}
            className="d-flex align-items-center justify-content-between"
          >
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search..." />
            <button type="submit" aria-label="submit button">
              <IconSearch />
            </button>
          </form>
          {/* <SelectBox options={artists} /> */}
          {/* <SelectBox options={genres} /> */}
        </div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              aria-label="home-tab"
            >
              Featured
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
              aria-label="profile-tab"
            >
              Popular
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tab"
              aria-label="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Newest
            </button>
          </li>
        </ul>
      </div>
      <div className="container-fluid">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row g-2">
              {videos.map(({ id, ...props }: any) => (
                <div
                  key={id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <VideoCard key={id} {...props} link="album-allsong" />
                </div>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="row g-2">
              {videos.map(({ id, ...props }) => (
                <div
                  key={props.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <VideoCard key={props.id} {...props} />
                </div>
              ))}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-2">
              {videos.map(({ id, ...props }) => (
                <div
                  key={id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <VideoCard key={id} {...props} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-60 " >
        <Link href="#" onClick={async (e) => {
          e.preventDefault()
          setIsLoading(true)
          const data = await fetchData('/data/videos', currentPage === 0 ? 3 : currentPage + 1, 12)
          setVideos(prev => ([...prev, ...data.videos]))
          setCurrentPage(prev => prev + 1)
          setIsLoading(false)
        }} className="cmn__simple2" >
          {isLoading ? 'loading...' : 'Load More'}
        </Link>
      </div>
    </section>
  );
};

export default MusicSection;
