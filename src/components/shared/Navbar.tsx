
/* eslint-disable @next/next/no-img-element */
"use client";
import { mainNavbarData, sideBarData } from "@/../public/data/navBarData";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/userSlice";
import { handleLinkClick } from "@/utils/handleLinkClick";
import { navbarContext } from "@/utils/reactContext";
import {
  IconBell,
  IconChecks,
  IconChevronDown,
  IconDots,
  IconMinus,
  IconPlus,
  IconSearch,
  IconShoppingCart,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(navbarContext);
  const { authenticated, user } = useSelector((state: RootState) => state.user)

  const [isSubDropDownOpen, setSubDropDownOpen] = useState(false);
  const [isSubMenuOpen, setSubMenuOpen] = useState<string | null>(
    sideBarData[0].id
  );
  const pathName = usePathname();
  const { quantity } = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch()
  return (
    // <!-- Header Here -->
    <>
      <div className="header__section__attachment">
        <div className="container-fluid p-0-fluid p-0">
          <div className="d-flex">
            <div
              className={`sidebar-wrapper mainbg ${isSidebarOpen && "active"}`}
            >
              <div className="d-flex logo__wrap align-items-center justify-content-between position-relative">
                <Link
                  href="/"
                  className="logo"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Image
                    width={180}
                    height={52}
                    src="/img/logo/logo.png"
                    alt="img"
                  />
                </Link>
                <div
                  className="position-absolute  menu-close-button d-xl-none"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <IconX />
                </div>
              </div>
              <div className="sidebar__wrapbox">
                <ul className="sidebar__menu">
                  {/*==============side menu===== */}
                  {authenticated && sideBarData.map(
                    ({ id, menuTitle, icon, className, path, menuItems }) => {
                      let isActive = menuItems?.some(
                        (path) => pathName == path.dropDownPath
                      );
                      return menuItems ? (
                        <li key={id} className={`liclick ${className}`}>
                          <span className="d-flex align-items-center">
                            <Link
                              onClick={() =>
                                setSubMenuOpen((prev) =>
                                  prev == id ? null : id
                                )
                              }
                              href="#"
                              className={`mclick d-flex hcolor align-items-center w-100 justify-content-between ${isActive ? "navbar-item-active" : ""
                                }`}
                            >
                              <span className="d-flex click__title fs-16 bodyfont d-flex align-items-center gap-2">
                                {icon}
                                {menuTitle}
                              </span>
                              <span className="d-flex click__title align-items-center">
                                {isSubMenuOpen == id ? (
                                  <IconMinus />
                                ) : (
                                  <IconPlus />
                                )}
                              </span>
                            </Link>
                          </span>
                          <div
                            className={` menucontent menucontent-show ${isSubMenuOpen == id ? "active" : ""
                              }`}
                          >
                            <ul>
                              {menuItems.map(({ id, title, dropDownPath }) => {
                                return (
                                  <li
                                    key={id}
                                    onClick={() => setIsSidebarOpen(false)}
                                  >
                                    <Link
                                      className={`${pathName === dropDownPath
                                        ? "navbar-item-active"
                                        : ""
                                        }`}
                                      href={dropDownPath}
                                    >
                                      {title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </li>
                      ) : (
                        <li key={id} onClick={() => setIsSidebarOpen(false)}>
                          <Link
                            onClick={() => setSubMenuOpen(null)}
                            href={path}
                            className={`d-flex hcolor align-items-center gap-2 ${pathName === path ? "navbar-item-active" : ""
                              }`}
                          >
                            {icon}
                            {menuTitle}
                          </Link>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
            <div
              className={`header-wrapper mainbg menu-fixed ${isSidebarOpen && "body-collapse"
                }`}
            >
              {/*==============main menu===== */}
              <ul className={`main-menuone d-flex align-items-center ${!authenticated && 'w-100 '} justify-content-end`}>
                {/* <li className="small__logo">
                  <Link href="/">
                    <Image
                      width={68}
                      height={51}
                      src="/img/logo/favicon-small.png"
                      alt="img"
                    />
                  </Link>
                </li> */}
                {
                  authenticated && (
                    <li className="search__show">
                      <form action="#0" className="d-flex align-items-center">
                        <button aria-label="submit button">
                          <IconSearch />
                        </button>
                        <input
                          type="text"
                          placeholder="Search songs, podcasts, albums..."
                        />
                      </form>
                    </li>

                  )
                }

                {
                  !authenticated ? (
                    <div className="">
                      <li className="auth-btns">
                        <Link href="signin" className="cmn--btn cmn--btnone">
                          <span>Sign in</span>
                        </Link>
                        <Link href="signup" className="cmn--btn cmn--btntwo">
                          <span>Signup</span>
                        </Link>
                      </li>
                    </div>
                  ) : null
                }

              </ul>
              {
                authenticated && (
                  <div className="menu__right__components d-flex align-items-center">
                    <div className="menu__components d-flex align-items-center">
                      <Link href="cart" className="shop__tolley">
                        <IconShoppingCart className="pra fs-30" />
                        <span className="shop__badge">{quantity}</span>
                      </Link>
                      <div className="dropdown profie__dropdown">
                        <Link
                          href="#0"
                          className="link user__active d-flex align-items-center"
                          data-bs-toggle="dropdown"
                          data-bs-offset="0,16"
                          aria-expanded="true"
                        >
                          <img
                            src={user ? (user?.img_?.split('.')[1] ? `/img22/img/users/${user?.img_}` : `${user?.img_}`) : ''}
                            alt="image"
                            className="img-fluid profile__img rounded-circle objec-fit-cover h-5"
                            width={'100%'}
                            height={'100%'}
                          />
                          <span className="d-flex fs-14 fw-500 pra align-items-center gap-1 d-none d-sm-block">
                            {user?.first_name} {user?.last_name}
                            <IconChevronDown />
                          </span>
                        </Link>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          data-popper-placement="bottom-end"
                        >
                          <div className="p-6">
                            <div className="d-flex align-items-center mb-24 gap-3 max-width">
                              {/* <div className="jerny__uer ralt">
                                <Image
                                  width={200}
                                  height={200}
                                  src="/img/mood/mood1.jpg"
                                  alt="image"
                                  className="img-fluid jenny rounded-circle object-fit-cover flex-shrink-0"
                                />
                                <IconChecks className="checks" />
                              </div> */}
                              <div className="flex-grow-1">
                                <h5 className="fs-20 fw-600 white  mb-0">
                                  {user?.first_name} {user?.last_name}
                                </h5>
                                <span className="d-block fw-400 pra fs-16">
                                  {user?.email}
                                </span>
                              </div>
                            </div>
                            <ul className="list">
                              <li className="mb-16">
                                <Link
                                  href="profile"
                                  className="link d-flex align-items-center gap-2 dropdown-item"
                                >
                                  <i className="bi bi-bell fs-20"></i>
                                  <span className="d-block fs-16 pra fw-500 ">
                                    {" "}
                                    Profile{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="mb-16">
                                <Link
                                  href="#"
                                  className="link d-flex align-items-center gap-2 dropdown-item"
                                >
                                  <i className="bi bi-bell fs-20"></i>
                                  <span className="d-block fs-16 pra fw-500 ">
                                    {" "}
                                    Theme{" "}
                                  </span>
                                </Link>
                              </li>
                            </ul>
                            <ul className="list">
                              <li className="mb-16">
                                <Link
                                  href="#"
                                  className="link d-flex align-items-center gap-2 dropdown-item"
                                >
                                  <i className="bi bi-credit-card-2-back fs-20"></i>
                                  <span className="d-block fs-16 pra fw-500 ">
                                    {" "}
                                    Help{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="mb-16">
                                <Link
                                  href="#"
                                  className="link d-flex align-items-center gap-2 dropdown-item"
                                >
                                  <i className="bi bi-credit-card-2-back fs-20"></i>
                                  <span className="d-block fs-16 pra fw-500 ">
                                    {" "}
                                    Send Feedback{" "}
                                  </span>
                                </Link>
                              </li>
                              <li className="mb-16">
                                <Link
                                  href="#"
                                  className="link d-flex align-items-center gap-2 dropdown-item"
                                >
                                  <i className="bi bi-gear fs-20"></i>
                                  <span className="d-block fs-16 pra fw-500 ">
                                    {" "}
                                    Settings{" "}
                                  </span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="#"
                                  onClick={() => {
                                    dispatch(logout(""))
                                  }}
                                  className="link d-flex align-items-center gap-2 dropdown-item"
                                >
                                  <i className="bi bi-file-earmark-plus fs-20"></i>
                                  <span className="d-block fs-16 pra fw-500 ">
                                    {" "}
                                    Log Out{" "}
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="dropdown notification__dropdown">
                        <Link
                          href="#"
                          className="link glose__icon"
                          data-bs-toggle="dropdown"
                          data-bs-offset="0,14"
                          aria-expanded="true"
                        >
                          <IconBell />
                        </Link>
                        <NotificationDropdown />
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
