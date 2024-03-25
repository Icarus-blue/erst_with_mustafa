"use client";
import api from "@/lib/api";
import { login } from "@/redux/userSlice";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie'
import AddProfileImage from "@/components/shared/AddProfileImageModal";
import PlayVideoModal from "@/components/shared/PlayVideoModal";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const sq = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();


  const getProfile = async () => {

    const token = localStorage.getItem('access_token') || ''
    const res = await api.server.GET('/users/profile', token)
    const data = await res.json();
    if (!data.status) {
      // dispatch(logout(""))
      return toast(data.message, { theme: 'dark' })
    }
    console.log(data)
    dispatch(login({ ...data.user, last_name: data.user.fullName?.split(' ')[0], first_name: data.user.fullName?.split(' ')[1], img_: data.user.img_, access_token: localStorage.getItem('access_token') }))

  }

  useEffect(() => {

    if (localStorage.getItem('access_token')) {
      getProfile();
    }
  }, [])

  useEffect(() => {

    if (sq.get('user')) {
      const user = sq.get('user') || ''
      dispatch(login({ ...JSON.parse(user), access_token: sq.get('access_token') }))
      router.push('/')
    }
  }, [sq])
  useEffect(() => {

    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <React.Fragment>
      {" "}
      {children}
      <AddProfileImage />
      <PlayVideoModal />
      <ToastContainer />
    </React.Fragment>
  );
}
