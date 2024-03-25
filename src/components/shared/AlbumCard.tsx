import React from 'react'
import PlayButton from '../pages/home/PlayButton'
import Link from 'next/link'
import Image from 'next/image';

type Props = {
    name_: string;
    artist_name: string;
    id_: number;
    img_?: string;
}

function AlbumCard({ name_, artist_name, id_, img_ }: Props) {
    return (
        <div className="moods__item play-button-container">
                <div className="thumb mb-16 ralt transition overhid">
                <Image
                    width={200}
                    height={0}
                    src={`/img22/img/album/${img_}`}
                    className="w-100 round50 transition overhid h-auto"
                    alt="img"
                />
                <PlayButton
                    audioTrack={null}
                    isPlaying={false}
                    onClick={() => { }}
                />
            </div>
            <div className="content">
                <h5 className="mb-2">
                    <Link href={`/album-allsong?album=${name_}&album_id=${id_}`} className="white">
                        {name_}
                    </Link>
                </h5>
                <span className="pra fs-14 bodyfont d-block">{artist_name}</span>
            </div>
        </div>
    )
}

export default AlbumCard