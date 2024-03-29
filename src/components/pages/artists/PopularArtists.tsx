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
  const router = useRouter();

  const [queryobj, setQueryObj] = useState({
    genre: 'All',
    sortMode: 'Views',
    filter: {
      gender: [],
      age: [],
      groupType: [],
      labels: []
      // other filter categories
    }
  });

  useEffect(() => {
    const str = JSON.stringify(queryobj);
    console.log(str);
    const getData = async () => {
      let data = await fetchData('/data/artists', 1, 12, str)
      data.artists && setArtists(data.artists)
      console.log(data.artists);
    }
    getData()
  }, [queryobj])

  const handleGenreChange = (newGenre: any) => {
    setQueryObj(prevState => ({
      ...prevState,
      genre: newGenre
    }));
  };

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;

    setQueryObj(prevState => {
      // Create a copy of the current filter state
      const updatedFilters = { ...prevState.filter };

      // Update the category (e.g., gender, age) with the new selection
      // Since we're enforcing a single selection, we replace the existing array with one containing only the new value
      updatedFilters[name] = [value];

      return {
        ...prevState,
        filter: updatedFilters
      };
    });
  };

  const handleSortChange = (newSortMode: { label: string }) => {
    console.log(newSortMode);
    setQueryObj(prevState => ({
      ...prevState,
      sortMode: newSortMode.label, // assuming you want the sortMode in a specific format
    }));
  };

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
    if (formData.get('query') == '') {
      const data = await fetchData('/data/artists', 1, 12)
      setArtists(data.artists)
    } else {
      const data = await fetchData('/data/artists', 1, 12, formData.get('query') as string)
      setArtists(data.artists)
    }
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

  return (
    // <!--genres section-->
    <section className="trending__section pr-24 pl-24 pb-100">
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item bg-transparent">
          <h2
            // className="accordion-header bg-transparent"
            id="flush-headingOne"
          >
            <button
              className="accordion-button  collapsed cmn--btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <span>
                <IconFilter />
                Filter
              </span>
            </button>
          </h2>
        </div>
      </div>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse px-3"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <h5 className="fw-800">
            <span>
              {" "}
              &nbsp;
              <IconFilter />
              Advanced Filters
            </span>
          </h5>
          <div className="row mt-4">
            <div className="col-lg-6 mb-4">
              <div className="fw-600 mb-2">GENDER</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  Male
                  <input type="radio" name="gender" value="male" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Female
                  <input type="radio" name="gender" value="female" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  None
                  <input type="radio" name="gender" value="none" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="fw-600 mb-2">AGE</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  {"< 20"}
                  <input type="radio" name="age" value="<20" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  20 - 30
                  <input type="radio" name="age" value="20-30" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  30 - 40
                  <input type="radio" name="age" value="30-40" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  {"> 40"}
                  <input type="radio" name="age" value=">40" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fw-600 mb-2">GROUP TYPE</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  Solo
                  <input type="radio" name="groupType" value="solo" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Group
                  <input type="radio" name="groupType" value="group" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fw-600 mb-2">LABELS</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  Interscope Records
                  <input type="radio" name="labels" value='interscope' />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Atlantic Records
                  <input type="radio" name="labels" value='Atlantic' />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Bear Records
                  <input type="radio" name="labels" value='Bear' />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Fox Records
                  <input type="radio" name="labels" value='Fox' />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Rabbit Records
                  <input type="radio" name="labels" value='Rabbit' />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            value={queryobj.sortMode}
            onChange={(newValue) => handleSortChange(newValue)} // Handle changes
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
              onClick={() => handleGenreChange('All')}
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => handleGenreChange('HIP HOP')}
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
              onClick={() => handleGenreChange('ROCK')}
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
              onClick={() => handleGenreChange('POP')}
              className="nav-link "
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#pop-tab-pane"
              type="button"
              role="tab"
              aria-controls="pop-tab-pane"
              aria-selected="true"
              aria-label="home-tab"
            >
              POP
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => handleGenreChange('REGGAE')}
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#reggae-tab-pane"
              type="button"
              role="tab"
              aria-controls="reggae-tab-pane"
              aria-selected="false"
              aria-label="profile-tab"
            >
              REGGAE
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => handleGenreChange('JAZZ')}
              className="nav-link"
              id="contact-tab"
              aria-label="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#jazz-tab-pane"
              type="button"
              role="tab"
              aria-controls="jazz-tab-pane"
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

              {artists && (
                <>
                  {artists.map((props) => (
                    <div
                      key={props.id_}
                      className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <ArtistsSliderCard {...props} />
                    </div>
                  ))}
                </>
              )}
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
              {artists && (
                <>
                  {artists.map((props) => (
                    <div
                      key={props.id_}
                      className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <ArtistsSliderCard {...props} />
                    </div>
                  ))}
                </>
              )}
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
              {artists && (
                <>
                  {artists.map((props) => (
                    <div
                      key={props.id_}
                      className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <ArtistsSliderCard {...props} />
                    </div>
                  ))}
                </>
              )}
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
            id="pop-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
              {artists && (
                <>
                  {artists.map((props) => (
                    <div
                      key={props.id_}
                      className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <ArtistsSliderCard {...props} />
                    </div>
                  ))}
                </>
              )}
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
            id="reggae-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
              {artists && (
                <>
                  {artists.map((props) => (
                    <div
                      key={props.id_}
                      className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <ArtistsSliderCard {...props} />
                    </div>
                  ))}
                </>
              )}
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
            id="jazz-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
              {artists && (
                <>
                  {artists.map((props) => (
                    <div
                      key={props.id_}
                      className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <ArtistsSliderCard {...props} />
                    </div>
                  ))}
                </>
              )}
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
