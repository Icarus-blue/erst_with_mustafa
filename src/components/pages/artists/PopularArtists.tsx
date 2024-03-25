'use client'
import { artistCardData } from "@/../public/data/artistsCardData";
import LoadMore from "@/components/shared/LoadMore";
import SelectBox from "@/components/shared/SelectBox";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import ArtistsSliderCard from "../home/ArtistsSliderCard";
import { fetchData } from "@/utils/fetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/api";
const artists = [
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const genres = [
  { label: "All" },
  { label: "Hip Hop" },
  { label: "Rock" },
  { label: "Pop" },
  { label: "Reggae" },
  { label: "Jazz" },
];

const views = [
  { label: "Views" },
  { label: "Most Item First" },
  { label: "RIP" },
  { label: "A-Z" },
  { label: "Z-A" },
  { label: "youngest To Oldest" },
  { label: "Oldest To Youngest" },
  { label: "Recently Updated" },
  { label: "Birthday" },
  { label: "Monthly Listeners" },
  { label: "Social Followers" },
  { label: " Most Photos" },
  { label: "Following" }
]
const PopularArtists = () => {

  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [genreValue, setGenresValue] = useState('All')
  const [query, setQuery] = useState('')
  const sq = useSearchParams();
  const router = useRouter()

  console.log(artists)

  useEffect(() => {

    const getData = async () => {
      let data = await fetchData('/data/artists', 1, 12)
      data.artists && setArtists(data.artists)
    }

    getData()
  }, [])

  const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`?query=${query}`)
    const formData = new FormData(e.target)
    const data = await fetchData('/data/artists', 1, 12, formData.get('query') as string)
    setArtists(data.artists)
    // !data.status && toast(data.message)
    try {
    } catch (error: any) {
    }
  }


  useEffect(() => {
    const run = async () => {
      const q = sq.get('query')
      if (q) {
        setQuery(q)
        const data = await fetchData('/data/artists', 1, 1, q)
        data.status && setArtists(data.artists)
      }
    }
    run()
  }, [])

  const getArtistByGenres = async (vl: { label: string }, page?: number) => {
    try {
      const res = await api.server.POST(`/data/artists/genre`, { genre: vl?.label, page: page }, '')
      const data = await res.json()
      if (data.status) setArtists(data.artists)
      console.log('data', data.artists);
    } catch (error) {
      console.log(error.message)
    }
  }
  const getArtistsBySortingMode = async (vl: { label: string }, page?: number) => {
    try {
      const res = await api.server.POST(`/data/artists/sortmode`, { filter: vl?.label, page: page }, '')
      const data = await res.json()
      if (data.status) setArtists(data.artists)
      console.log('data', data.artists);
    } catch (error) {
      console.log(error.message)
    }
  }

  const loadMore = async () => {
    if (genreValue !== "All") {
      getArtistByGenres({ label: genreValue }, 2)
    } else {
      const data = await fetchData('/data/artists', (artists.length <= 12) ? 2 : artists.length / 12, 12)
      data.status ? setArtists(prev => ([...prev, ...data.artists])) : null
    }
  }

  return (
    // <!--genres section-->
    <section className="trending__section pr-24 pl-24 pb-100">
      <div className="trending__selected mb-30 d-flex align-items-center justify-content-center justify-content-lg-between">
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
          {/* <SelectBox onChange={(vl: { label: string }) => getArtistByGenres(vl)} options={genres} /> */}
          <SelectBox onChange={(vl: { label: string }) => getArtistsBySortingMode(vl)} options={views} />
        </div>


        <div className="rounded-5 bg-dark d-flex align-items-center">
          {genres.map((option, personIdx) => (
            <button key={personIdx} style={{padding:"12px 38px"}} className={`btn rounded-5 border-0 ${genreValue === option.label ? 'btn-success' : 'text-white'}`} onClick={() => { getArtistByGenres({ label: option.label }); setGenresValue(option.label) }}>{option.label}</button>
          ))}
        </div>


        {/* <div>
          <button className="cmn--btn">
            <span>
              <IconFilter />
              Filter
            </span>
          </button>
        </div> */}
        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
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
        </ul> */}
      </div>
      <div className="container-fluid">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row g-4">
              {artists.map((props) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ArtistsSliderCard {...props} />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"
                  onClick={loadMore}
                >
                  Load More</button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="row g-4">
              {artists.map((props) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ArtistsSliderCard {...props} />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"
                  onClick={loadMore}
                >Load More</button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
              {artists.map((props) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ArtistsSliderCard {...props} />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"
                  onClick={loadMore}
                >Load More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularArtists;
