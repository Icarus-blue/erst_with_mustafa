"use client";
import PasswordField from "@/components/shared/PasswordField";
import api from "@/lib/api";
import { login } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Cookie from 'js-cookie'



const SignInForm = () => {

  const form = useRef<any>(null)
  const router = useRouter();
  const dispatch = useDispatch()
  useEffect(() => {

    if (localStorage.getItem('access_token')) {
      router.push('/home')
    }
  }, [])
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(form.current)
      const email = formData.get('email')
      const password = formData.get('password')
      const res = await api.server.POST('/auth/login', { email, password }, '')
      const data = await res.json();
      if (!data.status) return toast(data.message, { autoClose: 3000, theme: 'dark' })

      // dispatch(login({ ...data.user, access_token: data.access_token }));
      console.log(data)
      dispatch(login({ ...data.user, last_name: data.user.fullName?.split(' ')[0], first_name: data.user.fullName?.split(' ')[1], access_token: data.access_token }))
      Cookie.set('access_token', data.access_token)
      window.location.href = "/home"
    } catch (error: any) {
      toast(error.message, {
        autoClose: 3000,
        theme: 'dark'
      })
    }
  }

  const continueWithGoogle = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
  }
  return (
    <section className="signin__section pr-24 pl-24 pb-80">
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-6">
            <div className="event__createcover checkout__wrapper">
              <h3 className="white white text-center mb-30">Sign In</h3>
              <form action="#shanta" className="cover__form" onSubmit={handleLogin} ref={form}>
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="cover__grp">
                      <label
                        htmlFor="eemail"
                        className="mb-16 fs-18 d-block fw-500 white bodyfont"
                      >
                        Email Address <span className="base2">*</span>
                      </label>
                      <input type="email" name="email" id="eemail" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <PasswordField />
                  </div>
                  <div className="col-lg-12">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <div className="pay__check remember__radio mb-16 d-flex align-items-center gap-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label mt-1 fs-16 fw-400 bodyfont pra"
                          htmlFor="flexCheckDefault"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link href="/reset-password" className="base fs-14 fw-500 bodyfont">
                        Forget Password?
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="cover__grp mb-30 sign__inbtn">
                      <button
                        type="submit"
                        aria-label="submit button"
                        className="cmn--btn d-block w-100"
                      >
                        <span>Sign In Now</span>
                      </button>
                      <div style={{ textAlign: 'center', padding: '0.5rem' }}>
                        or
                      </div>
                      <button type="button" className="cmn--btn d-block w-100"
                        onClick={() => continueWithGoogle()}
                      >
                        <span>Continue with Google</span>
                      </button>
                    </div>
                    <p className="ffs-16 text-center bodyfont pra fw-500">
                      Don’t have an account?{" "}
                      <Link href="signup" className="base">
                        Sign up now!
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
