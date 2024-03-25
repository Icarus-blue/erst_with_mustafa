'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchData } from '@/utils/fetchData'

type Props = {}

function NotificationDropdown({ }: Props) {

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData('/notifications', 1, 3)
            data.status && setNotifications(data.notifications)
        }

        getData()
    }, [])
    return (
        <div
            className="dropdown-menu dropdown-menu-end "
            data-popper-placement="bottom-end"
        >
            <ul className="list">

                {
                    notifications?.map(notification => (
                        <li className="mb-16" key={notification.id_}>
                            <Link href="#0" className="link d-flex dropdown-item">
                                <Image
                                    width={200}
                                    height={200}
                                    src={notification?.cover || "/img/mood/mood2.jpg"}
                                    className="notification__thumb"
                                    alt="img"
                                />
                                <span className="notify__content">
                                    <span className="fs-16 d-block fw-600 white ">
                                        {notification?.type_}
                                    </span>
                                    <span className="fs-14 message d-block fw-500 pra ">
                                        {notification?.message_}
                                    </span>
                                    <span className="fs-10 fw-400 pra ">
                                        {new Date(notification?.date).toLocaleDateString()}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))
                }

                <li className="" >
                    <Link href="/notifications" className="link d-flex dropdown-item text-white">
                        More
                    </Link>
                </li>
            </ul>



        </div>
    )
}

export default NotificationDropdown