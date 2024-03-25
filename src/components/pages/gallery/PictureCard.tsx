import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowNarrowRight } from '@tabler/icons-react'

type Props = {
    name_: string;
    source: string;
    url_: string;
    date_taken: Date
}

function PictureCard({ url_, date_taken }: Props) {
    return (
        <div className="swiper-slide trending__item round16 p-8">

            <div className="thumb ralt overhid transition">
                <Image
                    src={`/img22${url_}`}
                    width={390}
                    height={390}
                    className="transition h-auto"
                    alt="img"
                />
                <div className="artist__popup d-flex align-items-center justify-content-between">
                    <div className="content">
                        <h5 className="mb-1">
                            {new Date(date_taken).toLocaleDateString()}
                        </h5>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PictureCard