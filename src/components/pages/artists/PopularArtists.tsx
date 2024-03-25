'use client'
import { artistCardData } from "@/../public/data/artistsCardData";
import LoadMore from "@/components/shared/LoadMore";
import SelectBox from "@/components/shared/SelectBox";
import {IconFilter, IconSearch } from "@tabler/icons-react";
import ArtistsSliderCard from "../home/ArtistsSliderCard";
import { fetchData } from "@/utils/fetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/api";

const sortMode = [
  { label: "Most Item First" },
  { label: "RIP" },
  { label: "Views" },
  { label: "A-Z" },
  { label: "Z-A" },
  { label: "Youngest to Oldest" },
  { label: "Oldest to Youngest" },
  { label: "Recently Updated" },
  { label: "Birthday" },
  { label: "Monthly Listners" },
  { label: "Social Followers" },
  { label: "Most Photos" },
  { label: "Following" },
];

const genres = [
  { label: "All Artists" },
  { label: "New Artists" },
  { label: "Expert Artists" },
];
const PopularArtists = () => {

  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [query, setQuery] = useState('')
  const sq = useSearchParams();
  const router = useRouter()
  const [selectedSort, setSelectedSort] = useState(sortMode[2]);

  useEffect(() => {
    console.log(selectedSort);
  }, [selectedSort])

  useEffect(() => {

    const getData = async () => {
      let data = await fetchData('/data/artists', 1, 12)
      data.artists && setArtists(data.artists)
      console.log(data.artists);

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

  const handleFilterChange = async (e) => {
    const filterData = {
      gender: e.target.name === 'gender' ? e.target.value : undefined,
      ageFilter: e.target.name === 'age' ? e.target.value : undefined,
      groupType: e.target.name === 'groupType' ? e.target.value : undefined,
    };
    filterArtists(filterData);
  };

  const filterArtists = async (filterData) => {
    try {
      const res = await api.server.POST(
        `/data/artists/filter`,
        filterData,
        ""
      );
      const data = await res.json();
      if (data.status) setArtists(data.artists);
      console.log("Filtered artists:", data.artists);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <SelectBox
            options={sortMode}
          />
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
              All
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
              HIP-HOP
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
              ROCK
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link "
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              aria-label="home-tab"
            >
              POP
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
              REGGAE
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
              JAZZ
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
                  onClick={async () => {
                    const data = await fetchData('/data/artists', (artists.length <= 12) ? 2 : artists.length / 12, 12)
                    data.status ? setArtists(prev => ([...prev, ...data.artists])) : null
                  }}
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
                  onClick={async () => {
                    const data = await fetchData('/data/artists', (artists.length <= 12) ? 2 : artists.length / 12, 12)
                    data.status ? setArtists(prev => ([...prev, ...data.artists])) : null
                  }}
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
                  onClick={async () => {
                    const data = await fetchData('/data/artists', (artists.length <= 12) ? 2 : artists.length / 12, 12)
                    data.status ? setArtists(prev => ([...prev, ...data.artists])) : null
                  }}
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
