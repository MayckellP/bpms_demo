import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import ButonCreate from "@/Components/ButtonCreate";
import Footer from "@/Components/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavbarMobile from "@/Components/NavbarMobile";

export default function Authenticated({ user, header, children }) {
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).role;

    /*-------------------------------------------------------------------------EDIT BACKGROUND & ROLENAME COLOR  */
    var roleNameColor;
    var textSwicht;
    var background;
    if (window.location.pathname == "/client/create") {
        textSwicht = "text-white";
        background = "bg-view-order";
        roleNameColor = "roleName-quickPurchase";
    } else if (window.location.pathname == "/support") {
        roleNameColor = "roleName";
        $;
        background = "bg-view-support";
    } else {
        roleNameColor = "roleName";
        background = "bg-view";
    }
    /*-------------------------------------------------------------------------FUNCTION LINKS  */
    var linkDashboard;

    //------------------------- ROLE "CLIENT"
    if (roleName === "Client") {
        linkDashboard = route("client.index");

        //------------------------- ROLE "ADMIN"
    } else if (roleName === "Logistic") {
        linkDashboard = route("logistic.index");
    } else if (roleName === "Warehouse") {
        linkDashboard = route("warehouse.index");
    }

    /*-------------------------------------------------------------------------CART SHOP  */
    const cartDetails = JSON.parse(sessionStorage.getItem("myCurrentCart"));
    console.log("variable:", cartDetails);
    const myNewCart = cartDetails.map((item) => (
        <div className="cart-item" key={item.id}>
            <div className="cont-img-product mb-4">
                <img src={item.image} alt={item.image} />
            </div>
            <div className="cont-details-product">
                <h3 className="product-title">{item.model}</h3>
                <p>{item.quantity} PCS</p>
                <div className="d-flex">
                    <div
                        className="color"
                        style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.color}</span>
                </div>
            </div>
            <div className="cont-delete-product">
                <Link
                    href={route("store.destroy", item.id)}
                    method="delete"
                    as="button"
                >
                    <div className="cont-img-delete">
                        <img src="/images/icons/trash.svg" alt="Phrase_Login" />
                    </div>
                </Link>
            </div>
        </div>
    ));

    /*-------------------------------------------------------------------------NOTIFY CART  */
    const notifyCount = cartDetails.length;
    var contNotify;
    console.log(notifyCount);
    if (cartDetails.length < 1) {
        contNotify = "d-none";
    } else {
        contNotify = "notify";
    }

    const [show, setShow] = useState(false);

    const closeCart = () => setShow(false);
    const showCart = () => setShow(true);

    const changeRole = (e) => {
        if (e.target.value !== "#") {
            var newRole = e.target.value;
            var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            currentUser.role = newRole;
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

            window.location.href = route(`${newRole.toLowerCase()}.index`);
        }
    };

    return (
        <div className="bg-global">
            {/* ---------------------------------------------------------------------NAVBAR */}
            <div className="side-navbar">
                <div className="cont-top-navbar">
                    {/* ---------------------------------------------------------------------NAVBAR - TOP -> IMG LOGO */}
                    <div className="cont-logo-client">
                        {user.logo === null ? (
                            <img
                                src="/images/logo_img/Client_logo_default.svg"
                                alt="Logo User"
                            />
                        ) : (
                            <img
                                src={`/images/logo_img/${user.logo}`}
                                alt="Logo User"
                            />
                        )}
                    </div>
                </div>
                <div className="cont-mid-navbar">
                    {/* ---------------------------------------------------------------------NAVBAR - MID -> LINKS */}
                    <ul>
                        <li>
                            <NavLink
                                href={linkDashboard}
                                className="link-navbar"
                            >
                                <img
                                    src="/images/icons/Navbar/home.svg"
                                    alt="Phrase_Login"
                                />
                                Dashboard
                            </NavLink>
                        </li>

                        {roleName === "Client" && (
                            <li>
                                <NavLink
                                    href={route("store.create")}
                                    className="link-navbar"
                                >
                                    <img
                                        src="/images/icons/Navbar/store.svg"
                                        alt="Phrase_Login"
                                    />
                                    Store
                                </NavLink>
                            </li>
                        )}

                        <li>
                            <NavLink
                                href={route("orders.index")}
                                className="link-navbar"
                            >
                                <img
                                    src="/images/icons/Navbar/register.svg"
                                    alt="Phrase_Login"
                                />
                                {roleName === "Client" ? "My Orders" : "Orders"}
                            </NavLink>
                        </li>

                        <li>
                            <div className="divi-navbar"></div>
                        </li>
                        <li>
                            <NavLink
                                href={route("support.index")}
                                className="link-navbar"
                            >
                                <img
                                    src="/images/icons/Navbar/support.svg"
                                    alt="Phrase_Login"
                                />
                                Support
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="cont-bot-navbar">
                    {/* ---------------------------------------------------------------------NAVBAR - BOT -> IMG LOGO */}
                    <div className="cont-img-logo">
                        <img
                            src="/images/0.log_view/NewLogo.svg"
                            alt="Phrase_Login"
                        />
                    </div>
                </div>
            </div>

            <div className={background}>
                {/* ---------------------------------------------------------------------BODY VIEW */}
                <NavbarMobile
                    name={user.name}
                    myCart={myNewCart}
                    contNotify={contNotify}
                    notifyCount={notifyCount}
                    user={user}
                    linkDashboard={linkDashboard}
                    roleName={roleName}
                />
                {header && (
                    <header className="cont-title-view">
                        <div className="title-view">
                            {header}{" "}
                            <span className={roleNameColor}>{roleName}</span>
                        </div>
                        <div className="cont-profile-cart">
                            {/* ---------------------------------------------------------------------CART & PROFILE */}
                            <div className="cont-img-user">
                                {user.foto === null ? (
                                    <img
                                        src="/images/profile_img/profile_default.jpg"
                                        alt="Photo User"
                                    />
                                ) : (
                                    <img
                                        src={`/images/profile_img/${user.foto}`}
                                        alt="Photo User"
                                    />
                                )}
                                <span>
                                    {/* ---------------------------------------------------------------------PROFILE */}
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span>
                                                <button
                                                    type="button"
                                                    className="dropdown-account ms-2 text-white-500 hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </span>
                            </div>

                            <div className="cont-img-cart">
                                <div className={contNotify}>{notifyCount}</div>
                                <button onClick={showCart} className="btn-cart">
                                    <img
                                        src="/images/icons/Navbar/cart.svg"
                                        alt="Phrase_Login"
                                        className="img-cart"
                                    />
                                </button>

                                <Offcanvas
                                    show={show}
                                    onHide={closeCart}
                                    placement="end"
                                    className="canvas"
                                >
                                    <Offcanvas.Header>
                                        <Offcanvas.Title className="w-100">
                                            <h2 className="cart-title">
                                                Your Order
                                            </h2>
                                        </Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div className="cart-body">
                                            {myNewCart}
                                        </div>
                                        <div className="btn-order">
                                            <ButonCreate
                                                title="Order"
                                                styleBtn=" rounded-5 bg-success w-50 border-0"
                                                styleLink="text-white fw-bold text-decoration-none fs-5"
                                                link={route("store.index")}
                                            />
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </div>
                    </header>
                )}

                <main className="select-swicht">
                    <h3 className={`swicht-title ${textSwicht}`}>
                        Switch account to:
                    </h3>
                    <Form.Select
                        aria-label="Floating label select example"
                        className="swicht-input  bg-secondary bg-white border-none text-black rounded-3 py-0"
                        onChange={changeRole}
                        value={roleName}
                        required
                    >
                        <option value={""}>Account</option>
                        <option value={"Client"}>Client</option>
                        <option value={"Logistic"}>Logistic</option>
                        <option value={"Warehouse"}>Warehouse</option>
                    </Form.Select>
                </main>
                <main className="cont-body-view">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
