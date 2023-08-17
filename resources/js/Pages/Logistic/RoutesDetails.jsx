import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";
import ModalProductDelivered from "@/Components/ModalProductDelivered";

export default function EmployeeDetails({
    auth,
    routesCountDate,
    routes,
    routesCountAuto,
}) {
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;
    var clientPoint = [];
    var newRoutes = [...routes].reverse();

    //console.log("Autos: ", routesCountAuto);
    //console.log(routes);
    //console.log(routesCountDate[0].date);
    //console.log(moment().format("YYYY/MM/DD"));

    /* const myRoutes = routesCount.map((route, index) =>
        auth.user.name === route.driver ? (
            <div className="cont-banner-routeDetails" key={index}>
                <div className="cont-routeBanner-img-title">
                    <div className="cont-left-img">
                        <img
                            src="/images/icons/Auto.svg"
                            alt="generate_order"
                        />
                    </div>
                    <div className="cont-carDetail">
                        <h4>{route.driver}</h4>
                        <div className="autoDetails">
                            <h4>{route.auto}</h4>
                        </div>
                    </div>
                </div>
                <div className="cont-endPoints">
                    <div className="cont-companysEnd">
                        {newRoutes.map(
                            (endPoint, indexEndPoint) =>
                                route.auto === endPoint.auto && (
                                    <div
                                        className="cont-flag"
                                        key={indexEndPoint}
                                    >
                                        <div
                                            className={
                                                endPoint.sent_to === null
                                                    ? "flagCompany opacity-50"
                                                    : "flagCompany"
                                            }
                                        >
                                            {endPoint.sent_to === null && (
                                                <ModalProductDelivered
                                                    btn_class="btn-deliver-product"
                                                    div_class=""
                                                    title="+"
                                                    icon=""
                                                    altIcon=""
                                                    headerModal="headerModal"
                                                    cont_titleModal="cont_titleModal"
                                                    img_class="w-75"
                                                    logoModal="/images/0.log_view/NewLogo-black.svg"
                                                    slogan_class="d-none"
                                                    sloganContent=""
                                                    img=""
                                                    imgError="/images/3.warehouse_view/error_image.png"
                                                    infoImg=""
                                                    category={endPoint.category}
                                                    model={endPoint.model}
                                                    id={endPoint.id}
                                                    quantity={endPoint.quantity}
                                                    infoProduct="Nada..."
                                                    color={endPoint.color}
                                                />
                                            )}
                                            <div className="content-company">
                                                <Form.Select
                                                    className="products-content"
                                                    aria-label="Floating label select example"
                                                    style={{
                                                        height: "2.5rem",
                                                    }}
                                                >
                                                    <option>
                                                        {endPoint.model}
                                                    </option>
                                                    <option>
                                                        {endPoint.color}
                                                    </option>
                                                    <option>
                                                        {endPoint.quantity}
                                                    </option>
                                                </Form.Select>

                                                <h5>{endPoint.client}</h5>
                                            </div>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <div class="alert alert-success text-xl" role="alert">
                You do not have assigned routes
            </div>
        )
    ); */

    const myRoutes = routesCountDate.map((route, index) => (
        <div key={index} className="mb-5">
            <div className="dateRoute">
                <span className="todayRoute">
                    {moment().format("YYYY-MM-DD") === route.date
                        ? "Today"
                        : moment(route.date).format("dddd")}
                </span>
                {moment().format("YYYY-MM-DD") !== route.date ? (
                    <h5 className="routeDate">
                        <span className="routeDate-2">
                            {moment(route.date).fromNow()}
                        </span>{" "}
                        - {route.date}
                    </h5>
                ) : (
                    <h5 className="routeDate">{route.date}</h5>
                )}
            </div>
            {routesCountAuto.map(
                (autoItem, autoIndex) =>
                    autoItem.date === route.date && (
                        <div
                            className="cont-banner-routeDetails"
                            key={autoIndex}
                        >
                            <div className="cont-routeBanner-img-title">
                                <div className="cont-left-img">
                                    <img
                                        src="/images/icons/Auto.svg"
                                        alt="generate_order"
                                    />
                                </div>
                                <div className="cont-carDetail">
                                    <h4>{auth.user.name}</h4>
                                    <div className="autoDetails">
                                        <h4>{autoItem.auto}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="cont-endPoints">
                                <div className="cont-companysEnd">
                                    {newRoutes.map(
                                        (endPoint, endPointIndex) =>
                                            endPoint.auto === autoItem.auto &&
                                            moment(endPoint.confirmed).format(
                                                "YYYY-MM-DD"
                                            ) === autoItem.date && (
                                                <div
                                                    className="cont-flag"
                                                    key={endPointIndex}
                                                >
                                                    <div
                                                        className={
                                                            endPoint.sent_to ===
                                                            null
                                                                ? "flagCompany opacity-50"
                                                                : "flagCompany"
                                                        }
                                                    >
                                                        {endPoint.sent_to ===
                                                            null && (
                                                            <ModalProductDelivered
                                                                btn_class="btn-deliver-product"
                                                                div_class=""
                                                                title="+"
                                                                icon=""
                                                                altIcon=""
                                                                headerModal="headerModal"
                                                                cont_titleModal="cont_titleModal"
                                                                img_class="w-75"
                                                                logoModal="/images/0.log_view/NewLogo-black.svg"
                                                                slogan_class="d-none"
                                                                sloganContent=""
                                                                img=""
                                                                imgError="/images/3.warehouse_view/error_image.png"
                                                                infoImg=""
                                                                category={
                                                                    endPoint.category
                                                                }
                                                                model={
                                                                    endPoint.model
                                                                }
                                                                id={endPoint.id}
                                                                quantity={
                                                                    endPoint.quantity
                                                                }
                                                                infoProduct="Nada..."
                                                                color={
                                                                    endPoint.color
                                                                }
                                                            />
                                                        )}
                                                        <div className="content-company">
                                                            <Form.Select
                                                                className="products-content"
                                                                aria-label="Floating label select example"
                                                                style={{
                                                                    height: "2.5rem",
                                                                }}
                                                            >
                                                                <option>
                                                                    {
                                                                        endPoint.model
                                                                    }
                                                                </option>
                                                                <option>
                                                                    {
                                                                        endPoint.color
                                                                    }
                                                                </option>
                                                                <option>
                                                                    {
                                                                        endPoint.quantity
                                                                    }
                                                                </option>
                                                            </Form.Select>
                                                            <h5>
                                                                {
                                                                    endPoint.client
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        </div>
                    )
            )}
        </div>
    ));

    return (
        <AuthenticatedLayout user={auth.user} header={"Routes Details"}>
            <Head title="Routes" />

            <div className="cont-global-routeDetails">
                <div className="cont-btn-routeDetails">
                    <Link
                        href={route("logistic.index")}
                        className="text-decoration-none"
                    >
                        <Button className="btn-backToRegister border-0">
                            <img
                                src="/images/icons/arrow_left.svg"
                                alt="generate_order"
                            />

                            <span>Back</span>
                        </Button>
                    </Link>
                </div>
                <div className="cont-routeDetails">
                    {myRoutes.length === 0 ? (
                        <div
                            className="alert alert-success text-xl"
                            role="alert"
                        >
                            You do not have assigned routes
                        </div>
                    ) : (
                        myRoutes
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
