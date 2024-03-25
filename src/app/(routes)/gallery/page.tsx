'use client'
import PictureCard from '@/components/pages/gallery/PictureCard'
import Search from '@/components/pages/home/Search'
import Loader from '@/components/shared/Loader'
import api from '@/lib/api'
import { Metadata } from 'next'
import React, { useEffect, useState } from 'react'

type Props = {}

function Gallery({ }: Props) {
    const [gallery, setGallery] = useState([])

    useEffect(() => {
        document.title = "Gallery"
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await api.server.GET('/data/gallery?page=1&pageSize=12', '')
                const data = await res.json()
                if (!data.status) return getData()
                console.log(data)
                setGallery(data.gallery)
            } catch (error) {
                console.log("Error occurred", error.message)
            }
        }

        getData()
    }, [])
    return (
        <div className='h-auto p-5 mt-5'>
            <div className='d-flex flex-column align-items-center justify-content-center w-100 mt-5' style={{ gap: '1em' }}>
                <span className="fs-1 text-capitalize headfont d-block">Explore Gallery</span>
                <span>All the world&apos;s celebrities short are collected here.</span>
                <Search />
            </div>
            <div className='d-flex row w100'>
                {

                    !gallery.length ? (
                        <div className="w100 d-flex justify-content-center">
                            <Loader />
                        </div>
                    ) :
                        gallery.map((item, index) => (
                            <div className='col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6' key={index} >
                                <PictureCard {...item} />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Gallery