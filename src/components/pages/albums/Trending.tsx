'use client'
import { moodsCardData } from "@/../public/data/moodsCardData";
import MoodsCard from "../home/MoodsCard";
import { useEffect, useState } from "react";
import { fetchData } from "@/utils/fetchData";
import AlbumCard from "@/components/shared/AlbumCard";
import { toast } from "react-toastify";

const Trending = () => {
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData('/data/albums', 1, 12)
        if (data.status) return setAlbums(data.albums)
        toast(data.message)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)

      }

    }

    getData()
  }, [])

  const loadMore = async () => {
    try {
      setIsLoading(true)
      const data = await fetchData('/data/albums', (albums.length <= 12) ? albums.length+1 : albums.length / 12, 12)
      data.status ? setAlbums(prev => ([...prev, ...data.albums])) : null
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    // <!--genres section-->
    <section className="trending__section hotsong__section pr-24 pl-24 pb-100">
      <div className="trending__selected mb-30 d-flex align-items-center">
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
              Mix
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
              Classic
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
              Rock
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tabjozz"
              aria-label="contact-tabjozz"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-panejozz"
              type="button"
              role="tab"
              aria-controls="contact-tab-panejozz"
              aria-selected="false"
            >
              Jozz
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="contact-tabother"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-paneother"
              type="button"
              role="tab"
              aria-controls="contact-tab-paneother"
              aria-selected="false"
              aria-label="contact-tabother"
            >
              Other
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
              {albums.map(({ ...props }) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <AlbumCard {...props} link="album-allsong" />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"

                  onClick={loadMore}
                >
                  {isLoading ? 'loading' : 'Load More'}
                </button>
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
              {albums.map(({ ...props }) => (
                <div
                  key={props.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <AlbumCard key={props.id} {...props} link="album-allsong" />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"

                  onClick={loadMore}
                >
                  {isLoading ? 'loading' : 'Load More'}
                </button>
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
              {albums.map(({ ...props }) => (
                <div
                  key={props.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <AlbumCard key={props.id} {...props} link="album-allsong" />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"

                  onClick={loadMore}
                >
                  {isLoading ? 'loading' : 'Load More'}
                </button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-panejozz"
            role="tabpanel"
            aria-labelledby="contact-tabjozz"
          >
            <div className="row g-4">
              {albums.map(({ ...props }) => (
                <div
                  key={props.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <AlbumCard key={props.id} {...props} link="album-allsong" />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"

                  onClick={loadMore}
                >
                  {isLoading ? 'loading' : 'Load More'}
                </button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-paneother"
            role="tabpanel"
            aria-labelledby="contact-tabother"
          >
            <div className="row g-4">
              {albums.map(({ ...props }) => (
                <div
                  key={props.id}
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6"
                >
                  <AlbumCard key={props.id} {...props} link="album-allsong" />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2"

                  onClick={loadMore}
                >
                  {isLoading ? 'loading' : 'Load More'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending;
