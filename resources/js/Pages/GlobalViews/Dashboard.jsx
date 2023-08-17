import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ClientOrder } from "@/Components/Charts/ClientOrder";
import { OrdersPrice } from "@/Components/Charts/OrdersPrice";
import { ProductRequested } from "@/Components/Charts/ProductRequested";
import ButtonCreate from "@/Components/ButtonCreate";
import PrimaryButton from "@/Components/PrimaryButton";
import ModalClaim from "@/Components/ModalClaim";
import moment from "moment";

export default function Dashboard({
    auth,
    filterChart,
    productsChartLogistic,
    productsSold,
    productsRequested,
    monthlyCosts,
}) {
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).role;
    var countClaim = 0;
    var countSolution = 0;

    const addMonthlyCostes = [];
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    month.map((months, index) => {
        monthlyCosts.map((mCost) => {
            if (moment(mCost.month).format("MMMM") === months) {
                const monthPrice = mCost.total_price;
                addMonthlyCostes.push(monthPrice);
            }
        });
        if (addMonthlyCostes[index] === undefined) {
            addMonthlyCostes.push(0);
        }
    });

    //console.log(addMonthlyCostes);

    //DESIGN
    const monthlyPrice = {
        labels: month,
        datasets: [
            {
                label: "Total Monthly",
                data: addMonthlyCostes,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "white",
                color: "Black",
            },
        ],
    };

    //!--------------------------------------------------------CHART (DATA & DESIGN) CLIENT
    //VARIABLES ARRAY FOR CHART
    var quantityDelivered = [];
    var orderDelivered = [];
    var colorOrder = [];

    //TO PUSH THE VARIABLES ARRAY
    filterChart.map((item) => {
        orderDelivered.push(`${item.model}`);
        quantityDelivered.push(item.total_cantidad);
        colorOrder.push(item.color);
    });

    //DESIGN
    const dataPie = {
        labels: orderDelivered,
        datasets: [
            {
                data: quantityDelivered,
                backgroundColor: colorOrder,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    //!--------------------------------------------------------CHART (DATA & DESIGN) LOGISTIC
    //VARIABLES ARRAY FOR CHART
    var product = [];
    var quantityProductProduced = [];
    var colorProduct = [];

    //TO PUSH THE VARIABLES ARRAY
    productsChartLogistic.map((item) => {
        product.push(`${item.model}`);
        quantityProductProduced.push(item.total_quantity);
        colorProduct.push(item.color);
    });

    //DESIGN
    const dataPieProduct = {
        labels: product,
        datasets: [
            {
                data: quantityProductProduced,
                backgroundColor: colorProduct,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    //!--------------------------------------------------------CHART (DATA & DESIGN) WAREHOUSE
    //VARIABLES ARRAY FOR CHART
    var productSold = [];
    var quantityProductSold = [];
    var colorProductSold = [];

    //TO PUSH THE VARIABLES ARRAY
    productsSold.map((item) => {
        productSold.push(item.model);
        quantityProductSold.push(item.total_quantity);
        colorProductSold.push(item.color);
    });

    //DESIGN
    const dataPieWarehouse = {
        labels: productSold,
        datasets: [
            {
                data: quantityProductSold,
                backgroundColor: colorProductSold,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    //-------------------------------DATA AND DESIGN FOR PIE CHART PRODUCTS
    //VARIABLES ARRAY FOR CHART
    var productRequested = [];
    var quantityProductRequested = [];
    var colorProductRequested = [];

    //TO PUSH THE VARIABLES ARRAY
    productsRequested.map((item) => {
        productRequested.push(item.model);
        quantityProductRequested.push(item.total_quantity);
        colorProductRequested.push(item.color);
    });

    //DESIGN
    const dataPieProductRequested = {
        labels: productRequested,
        datasets: [
            {
                data: quantityProductRequested,
                backgroundColor: colorProductRequested,
                borderColor: "white",
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="cont-global">
                {/* --------------------------------------------------------------------LEFT SIDE */}
                {roleName === "Client" ? (
                    <div className="cont-left">
                        <div className="cont-chart-order">
                            <div className="cont-title-chart">
                                <h2 className="title-chart-order">
                                    Most popular Orders
                                </h2>
                            </div>
                            <div className="subCont-chart-order">
                                <ClientOrder data={dataPie} />
                            </div>
                        </div>

                        <div className="cont-btn-order-rate">
                            <Link href={route("client.create")}>
                                <PrimaryButton className="btn-generate-order">
                                    <div className="btn-vector-order py-2 text-white">
                                        <span>Quick Purchase</span>
                                        <img
                                            src="/images/icons/code.svg"
                                            alt="generate_order"
                                        />
                                    </div>
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="cont-left">
                        <div className="cont-chart-logistic">
                            <div className="cont-title-chart">
                                <h2 className="title-chart-order">
                                    {roleName === "Logistic"
                                        ? "Vehicle Location"
                                        : "Top selling products"}
                                </h2>
                            </div>
                            <div className="subCont-chart-logistic px-2">
                                {roleName === "Logistic" ? (
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.7469127821605!2d8.5403226!3d47.377857899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08cc0e6e41%3A0xf5c698b65f8c52a7!2sZurich%20HB!5e0!3m2!1ses-419!2sch!4v1688121380531!5m2!1ses-419!2sch"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                ) : (
                                    <ProductRequested data={dataPieWarehouse} />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --------------------------------------------------------------------RIGHT SIDE */}
                {roleName === "Client" ? (
                    <div className="cont-right">
                        <div className="cont-chart-rate">
                            <div
                                className="d-flex align-items-center p-2"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <OrdersPrice dataBar={monthlyPrice} />
                            </div>
                        </div>
                        <div className="cont-btn-graph">
                            <div className="cont-chart-claim ">
                                <div className="pt-3 text-center w-50 d-flex flex-column p-0">
                                    <h3 className="chart-claim-title">
                                        Claims
                                    </h3>
                                    <span className="chart-claim-counter">
                                        {countClaim}
                                    </span>
                                </div>
                                <div className=" pt-3 text-center w-50 d-flex flex-column border-start">
                                    <h3 className="chart-claim-title">
                                        Solutions
                                    </h3>
                                    <span className="chart-claim-counter">
                                        {countSolution}
                                    </span>
                                </div>
                            </div>
                            <div className="cont-btn-claim-rate">
                                {/* <ModalRate
                                data={myOrders}
                                btn_class="btn-rate-order-mobile border-0"
                                div_class="btn-vector-rate-mobile py-2"
                                title="Rate Order"
                                icon="/images/icons/rate.svg"
                                altIcon="generate_order"
                                headerModal="headerModal"
                                cont_titleModal="cont_titleModal"
                                img_class="w-75"
                                logoModal="/images/0.log_view/NewLogo-black.svg"
                                slogan_class="slogan_class"
                                sloganContent="Your Feedback is important to us!"
                            ></ModalRate>*/}
                                <ModalClaim
                                    /* data={myOrders} */
                                    btn_class="btn-claim-order border-0"
                                    div_class="btn-vector-claim py-2"
                                    title="Claim Order"
                                    icon="/images/icons/claim.svg"
                                    altIcon="claim_order"
                                    modalTitle="Claim Title"
                                    headerModal="headerModal"
                                    cont_titleModal="cont_titleModal"
                                    img_class="w-75"
                                    logoModal="/images/0.log_view/NewLogo-black.svg"
                                    slogan_class="slogan_class"
                                    sloganContent="Your Feedback is important to us!"
                                ></ModalClaim>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cont-right-logistic">
                        <div className="cont-chart-logistic-product">
                            <div className="cont-title-chart">
                                <h2 className="title-chart-order">
                                    {roleName === "Logistic"
                                        ? "Products Delivered"
                                        : "Products Requested"}
                                </h2>
                            </div>
                            <div className="chart-product-logistic">
                                {roleName === "Logistic" ? (
                                    <ProductRequested data={dataPieProduct} />
                                ) : (
                                    <ProductRequested
                                        data={dataPieProductRequested}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="cont-btn-order-rate">
                            {roleName === "Logistic" ? (
                                <Link
                                    href={route("logistic.show", auth.user.id)}
                                >
                                    <PrimaryButton className="btn-generate-order w-100">
                                        <div className="btn-vector-order py-2 text-white">
                                            <span>Show Routes</span>
                                            <img
                                                src="/images/icons/trucker_icon.svg"
                                                alt="generate_order"
                                            />
                                        </div>
                                    </PrimaryButton>
                                </Link>
                            ) : (
                                <Link
                                    href={route("warehouse.show", auth.user.id)}
                                >
                                    <PrimaryButton className="btn-generate-order w-100">
                                        <div className="btn-vector-order py-2 text-white">
                                            <span>Show Inventar</span>
                                            <img
                                                src="/images/icons/code.svg"
                                                alt="generate_order"
                                            />
                                        </div>
                                    </PrimaryButton>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
