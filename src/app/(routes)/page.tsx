import Artists from '@/components/pages/home/Artists'
import Banner from '@/components/pages/home/Banner'
import Search from '@/components/pages/home/Search'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <div className='h-auto p-5 mt-5'>
            <div className='d-flex flex-column align-items-center justify-content-center w-100 mt-5' style={{gap:'1em'}}>
                <span className="fs-1 text-capitalize headfont d-block">Search over 1000+ artists</span>
                <span>An extensive library of music artist, videos, interviews and more.</span>
                <Search />
            </div>

            
            <div className='mt-5'>
                <Artists />
            </div>
        </div>
    )
}

export default page