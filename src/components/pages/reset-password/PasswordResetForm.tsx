'use client'
import api from "@/lib/api";
import { logout } from "@/redux/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

const PasswordResetForm = () => {

  const [email, setEmail] = useState('')
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false)
  const [code, setCode] = useState({
    code: '',
    isValid: false
  })
  const [newPassword, setNewPassword] = useState('')

  const resetPassword = async () => {
    const res = await api.server.POST('/users/reset-password', { password: newPassword, email }, '')
    const data = await res.json();

    toast(data.message, { theme: 'dark' })
    if (data.status) dispatch(logout(''))
    try {
    } catch (error: any) {
      toast(error.message, { theme: 'dark' })
    }
  }

  const checkCode = async () => {
    const res = await api.server.POST('/users/check-code', { code: code.code, email }, '')
    const data = await res.json();

    toast(data.message, { theme: 'dark' })
    if (data.status) setCode({ ...code, isValid: true })
    try {
    } catch (error: any) {
      toast(error.message, { theme: 'dark' })
    }
  }
  const sendPasswordResetCode = async () => {
    try {


      const res = await api.server.POST('/users/send-password-reset-code', { password: newPassword, email }, '')
      const data = await res.json();
      if (data.status) setIsEditing(true)
      toast(data.message, { theme: 'dark' })
    } catch (error: any) {
      toast(error.message, { theme: 'dark', autoClose: 3000 })
    }
  }
  return (
    <section className="signin__section pr-24 pl-24 pb-80">
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-6">
            <div className="event__createcover checkout__wrapper">
              <h3 className="white white text-center mb-30">Reset Password</h3>
              <form action="" className="cover__form" onSubmit={(e) => e.preventDefault()}>
                <div className="row g-4">
                  <div className="col-lg-12">
                    <p className="ffs-16 mb-5 text-center bodyfont white fw-500">
                      We will send a password reset code to your Email
                    </p>
                    <div className="cover__grp">
                      <label
                        htmlFor="eemail"
                        className="mb-16 fs-18 d-block fw-500 white bodyfont"
                      >
                        Email Address <span className="base2">*</span>
                      </label>
                      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} id="eemail" placeholder="Email" />
                    </div>
                  </div>
                  {/* <div className="col-lg-12">
                    <div className="d-flex">
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
                          I agree to the{" "}
                          <span className="base">Privacy Policy</span>
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="cover__grp mb-30 sign__inbtn">
                      <button
                        onClick={() => sendPasswordResetCode()}
                        type="submit"
                        aria-label="submit button"
                        className="cmn--btn d-block w-100"
                      >
                        <span>Send</span>
                      </button>
                    </div>

                  </div>
                </div>
              </form>

              {
                isEditing && (
                  <>

                    <div className="mt-5 w-full">
                      <div className="cover__grp">
                        <label
                          htmlFor="code"
                          className="mb-16 fs-18 d-block fw-500 bodyfont"
                        >
                          code <span className="base2">*</span>
                        </label>
                        <input type="text" value={code.code} onChange={(e) => setCode((prev: any) => ({ ...prev, code: e.target.value }))} name="code" id="code" placeholder="Password Reset Code" />
                      </div>

                      <div className="col-lg-12 mt-4">
                        <div className="cover__grp mb-30 sign__inbtn">
                          <button
                            onClick={() => checkCode()}
                            className="cmn--btn d-block w-100"
                          >
                            <span>Check Code</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  </>
                )
              }

              {

                (isEditing && code.isValid) && (
                  <>

                    <div className="mt-5 w-full">
                      <div className="cover__grp">
                        <label
                          htmlFor="newpas"
                          className="mb-16 fs-18 d-block fw-500 bodyfont"
                        >
                          New Password <span className="base2">*</span>
                        </label>
                        <input type="text" minLength={6} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="newPassword" id="newpas" placeholder="****" />
                      </div>

                      <div className="col-lg-12 mt-4">
                        <div className="cover__grp mb-30 sign__inbtn">
                          <button
                            onClick={() => resetPassword()}
                            className="cmn--btn d-block w-100"
                          >
                            <span>Reset Password</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordResetForm;
