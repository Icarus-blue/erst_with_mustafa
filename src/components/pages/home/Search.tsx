import { IconSearch } from '@tabler/icons-react'
import React from 'react'

type Props = {}

function Search({ }: Props) {
    return (
        <div className='w-100 d-flex justify-content-center'>
            <div className='p-3 d-flex justify-content-center  w-50'>
                {/* <IconSearch className='bg-primary  h-100 text-light pl-2' /> */}
                <input className='w-100 p-3 bg-light text-dark rounded-left' placeholder='Search ...' />
                <button className='p-3 bg-primary text-light rounded-right'>Find</button>
            </div>
        </div>
    )
}

export default Search