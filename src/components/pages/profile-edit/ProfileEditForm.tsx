'use client'
import api from "@/lib/api";
import { RootState } from "@/redux/store";
import { updateUser } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileEditForm = () => {


  const { user } = useSelector((state: RootState) => state.user)
  const [profile, setProfile] = useState(
    {
      email: user?.email,
      fullName: `${user?.first_name} ${user?.last_name}`,
      phone: user?.phone,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  )
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    (user && (user.phone !== null && user.phone != "null")) ? setProfile(prev => ({ ...prev, phone: user.phone })) : setProfile(prev => ({ ...prev, phone: '' }))
  }, [user.phone, user])

  const handleProfileChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await api.server.PUT(`/users/user?id=${user?.id_}`, {
      ...Object.fromEntries(
        Object.entries(profile || {})
          .filter(([_, value]) => value !== null && value !== '')
      )
    }, user?.access_token || '');
    const data = await res.json();
    toast(data.message, { theme: 'dark', autoClose: 3000 })
    if (data.status) {
      dispatch(updateUser({ ...data.user }))
      router.push('/profile')
    }
    try {

    } catch (error: any) {
      toast(error.message, { theme: 'dark', autoClose: 3000 })
    }
  }
  return (
    <section className="profile__section custom__space mt-40 pr-24 pl-24 pb-80">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="event__createcover">
              <form action="#0" className="cover__form" onSubmit={(e) => handleProfileChange(e)}>
                <h3 className="white mb-30 text-center">Edit Profile</h3>
                <div className="row g-4">
                  <h4 className="white mb-0 pb-0">Profile Details</h4>
                  <div className="col-lg-6">
                    <div className="cover__grp">
                      <label
                        htmlFor="emails"
                        className="mb-16 fs-18 d-block fw-500 bodyfont"
                      >
                        Email Address <span className="base2">*</span>
                      </label>
                      <input type="email" name="email" value={profile.email} onChange={(e) => handleChange(e)} id="emails" placeholder="Email" />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="cover__grp">
                      <label
                        htmlFor="phoneNumber"
                        className="mb-16 fs-18 d-block fw-500 bodyfont"
                      >
                        Phone Number<span className="base2">*</span>
                      </label>
                      <input type="text" id="phoneNumber" name="phone" value={profile.phone} onChange={(e) => handleChange(e)} placeholder="Phone Number" />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="cover__grp">
                      <label
                        htmlFor="fullName"
                        className="mb-16 fs-18 d-block fw-500 bodyfont"
                      >
                        Full Name <span className="base2">*</span>
                      </label>
                      <input type="text" id="fullName" placeholder="Rolex" value={profile.fullName} name="fullName" onChange={(e) => handleChange(e)} />
                    </div>
                  </div>
                  <h4 className="white mb-0 pb-0 mt-60">Profile Details</h4>
                  {
                    !user?.googleId ? (
                      <>
                        <div className="col-lg-6">
                          <div className="cover__grp">
                            <label
                              htmlFor="oldpas"
                              className="mb-16 fs-18 d-block fw-500 bodyfont"
                            >
                              Old Password <span className="base2">*</span>
                            </label>
                            <input type="text" id="oldpas" name="oldPassword" value={profile.oldPassword} onChange={(e) => handleChange(e)} placeholder="****" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="cover__grp">
                            <label
                              htmlFor="newpas"
                              className="mb-16 fs-18 d-block fw-500 bodyfont"
                            >
                              New Password <span className="base2">*</span>
                            </label>
                            <input type="text" id="newpas" name="newPassword" value={profile.newPassword} onChange={(e) => handleChange(e)} placeholder="****" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="cover__grp">
                            <label
                              htmlFor="conffpas"
                              className="mb-16 fs-18 d-block fw-500 bodyfont"
                            >
                              Confirm New Password <span className="base2">*</span>
                            </label>
                            <input type="text" name="newPasswordConfirm" value={profile.newPasswordConfirm} onChange={(e) => handleChange(e)} id="conffpas" placeholder="****" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-5">
                        you Can not change password since you signed in with google.
                      </div>
                    )
                  }
                  {/* <div className="col-lg-12">
                    <div className="profile__editcheck">
                      <div className="pay__check mb-16 d-flex align-items-center gap-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="flexCheckDefault"
                          checked
                        />
                        <label
                          className="form-check-label mt-1 fs-16 fw-400 bodyfont pra"
                          htmlFor="flexCheckDefault"
                        >
                          Share my registration data with Ersy content
                          providers for marketing purposes.
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-lg-12">
                    <div className="cover__grp profile__cancel d-flex justify-content-end">
                      <Link
                        href="/profile"
                        className="fs-16 cancel__btn fw-500 bodyfont d-block pra"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        aria-label="submit button"
                        className="cmn--btn"
                      >
                        <span>Save profile</span>
                      </button>
                    </div>
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

export default ProfileEditForm;
