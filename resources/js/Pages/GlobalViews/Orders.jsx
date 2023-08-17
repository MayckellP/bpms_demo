import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import moment from "moment";
import SearchRegister from "@/Components/SearchRegister";
import SearchRegisterMobile from "@/Components/SearchRegisterMobile";
import ConfirmToDeliverModal from "@/Components/ConfirmToDeliverModal";

export default function Orders({
    auth,
    completeTable,
    myOrdersCompleted,
    myClients,
    allCompleteTable,
    allMyOrdersCompleted,
    allOrdersInProcess,
}) {
    console.log(completeTable);
    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).role;
    if (roleName !== "Client") {
        completeTable = allCompleteTable;
        myOrdersCompleted = allMyOrdersCompleted;
    }
    var visibilityOrdersInProcess;
    var widthSearch;
    if (roleName !== "Client") {
        visibilityOrdersInProcess = "visible";
    } else {
        visibilityOrdersInProcess = "invisible";
        widthSearch = "w-100";
    }

    const [myOrders, setMyOrders] = useState(completeTable);
    const [filteredMyOrders, setFilteredMyOrders] = useState(completeTable);
    const [activeOrderCompleted, setActiveOrderCompleted] = useState(false);
    const [activeDate, setActiveDate] = useState(false);
    const [filteredDateOrClient, setFilteredDateOrClient] = useState(false);
    const [filteredShowMyOrders, setFilteredShowMyOrders] = useState();
    const [titleStatus, setTitleStatus] = useState("New Order");

    const inputOrderInProcessRef = useRef(null);
    var inputOrderInProcess = inputOrderInProcessRef.current;
    const inputOrderInProcessRefBG = useRef(null);
    var inputOrderInProcessBG = inputOrderInProcessRefBG.current;

    const inputOrderCompletedRef = useRef(null);
    var inputOrderCompleted = inputOrderCompletedRef.current;
    const inputOrderCompletedRefBG = useRef(null);
    var inputOrderCompletedBG = inputOrderCompletedRefBG.current;

    const ordersInProcess = () => {
        console.log(inputOrderInProcessBG);
        if (inputOrderInProcess.checked) {
            inputOrderCompleted.checked = false;
            inputOrderInProcessBG.style.backgroundColor = "#c9ad83";
            inputOrderCompletedBG.style.backgroundColor = "white";
            setActiveOrderCompleted(true);
            setMyOrders(allOrdersInProcess);
            setFilteredMyOrders(allOrdersInProcess);
            setTitleStatus("In Process");
        } else if (!inputOrderInProcess.checked) {
            inputOrderInProcessBG.style.backgroundColor = "white";
            setActiveOrderCompleted(false);
            setMyOrders(completeTable);
            setFilteredMyOrders(completeTable);
            setTitleStatus("New Order");
        }
    };

    const ordersCompleted = () => {
        if (inputOrderCompleted.checked) {
            inputOrderInProcess.checked = false;
            inputOrderCompletedBG.style.backgroundColor = "rgb(169, 247, 146)";
            inputOrderInProcessBG.style.backgroundColor = "white";
            setActiveOrderCompleted(true);
            setMyOrders(myOrdersCompleted);
            setFilteredMyOrders(myOrdersCompleted);
        } else if (!inputOrderCompleted.checked) {
            inputOrderCompletedBG.style.backgroundColor = "white";
            setActiveOrderCompleted(false);
            setMyOrders(completeTable);
            setFilteredMyOrders(completeTable);
        }
    };

    const showFilteredDate = (e) => {
        const myDate = e.target.value;
        setFilteredDateOrClient(myDate);
        setActiveDate(true);
        console.log(myDate);
    };

    const showFilteredClient = (e) => {
        const myClient = e.target.value;
        if (myClient !== "") {
            setFilteredDateOrClient(myClient);
        } else {
            setFilteredDateOrClient(false);
        }
        console.log(myClient);
    };

    const goToSearch = (e) => {
        var finalRegister;
        if (activeOrderCompleted === false) {
            if (filteredDateOrClient === false || filteredDateOrClient === "") {
                finalRegister = myOrders.filter((itemRegister) =>
                    itemRegister.model.toLowerCase().includes(e.toLowerCase())
                );
            } else {
                if (activeDate === false && filteredDateOrClient) {
                    finalRegister = myOrders.filter(
                        (itemRegister) =>
                            itemRegister.model
                                .toLowerCase()
                                .includes(e.toLowerCase()) &&
                            itemRegister.user_id &&
                            itemRegister.user_id ===
                                parseInt(filteredDateOrClient)
                    );
                } else {
                    finalRegister = myOrders.filter(
                        (itemRegister) =>
                            itemRegister.model
                                .toLowerCase()
                                .includes(e.toLowerCase()) &&
                            itemRegister.confirmed &&
                            moment(itemRegister.confirmed).format("YYYY-MM") ===
                                filteredDateOrClient
                    );
                }
            }
        } else {
            if (filteredDateOrClient === false) {
                finalRegister = myOrders.filter((itemRegister) =>
                    itemRegister.model.toLowerCase().includes(e.toLowerCase())
                );
            } else {
                if (activeDate === false) {
                    finalRegister = myOrders.filter(
                        (itemRegister) =>
                            itemRegister.model
                                .toLowerCase()
                                .includes(e.toLowerCase()) &&
                            itemRegister.user_id &&
                            itemRegister.user_id ===
                                parseInt(filteredDateOrClient)
                    );
                } else {
                    finalRegister = myOrders.filter(
                        (itemRegister) =>
                            itemRegister.model
                                .toLowerCase()
                                .includes(e.toLowerCase()) &&
                            itemRegister.confirmed &&
                            moment(itemRegister.confirmed).format("YYYY-MM") ===
                                filteredDateOrClient
                    );
                }
            }
        }

        setFilteredMyOrders(finalRegister);
    };

    useEffect(() => {
        const showMyOrders = filteredMyOrders.map((item, index) => (
            <tr key={index}>
                <td className="tbl-index">{index + 1}</td>
                <td className="tbl-item">{item.model}</td>
                <td className="tbl-td">{item.quantity}</td>
                {item.sent_to != null ? (
                    <td className="tbl-td text-success fw-bold">
                        Delivered <i className="bi bi-check-lg"></i>
                    </td>
                ) : (
                    <td className="tbl-td fw-bold" style={{ color: "#5569cd" }}>
                        {roleName === "Client" || roleName === "Warehouse"
                            ? "In process"
                            : titleStatus}
                    </td>
                )}
                <td className="tbl-td">
                    {item.confirmed != null
                        ? moment(item.confirmed).format("YYYY-MM-DD")
                        : "--"}
                </td>
                <td className="tbl-td">
                    {item.sent_to != null
                        ? moment(item.sent_to).format("YYYY-MM-DD")
                        : "--"}
                </td>
                <td className="tbl-td">
                    {item.receiver ? item.receiver : "--"}
                </td>
                <td className="action-order-tbl">
                    {roleName === "Logistic" && item.confirmed === null && (
                        <ConfirmToDeliverModal
                            dataOrder={item}
                            dataUser={auth.user}
                            btn_class="btn-start-proccess"
                            title="START"
                            icon="/images/icons/claim.svg"
                            altIcon="claim_order"
                            modalTitle="Claim Title"
                            headerModal="headerModal"
                            cont_titleModal="cont_titleModal"
                            img_class="w-75"
                            logoModal="/images/0.log_view/NewLogo-black.svg"
                            slogan_class="slogan_class"
                        />
                    )}
                    <Link href={route("orders.show", item.id)}>
                        <Button className="btn-details-tbl">
                            Show details
                        </Button>
                    </Link>
                </td>
            </tr>
        ));
        setFilteredShowMyOrders(showMyOrders);
    }, [filteredMyOrders]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={roleName !== "Client" ? "Orders" : "My Orders"}
        >
            <Head title="Orders" />

            <div className="cont-global-register">
                <div className="cont-filter-register">
                    <div className="cont-date-search">
                        <div
                            className={`cont-orderInProcess ${visibilityOrdersInProcess}`}
                            id="color-orders-process"
                            ref={inputOrderInProcessRefBG}
                        >
                            <Form.Check
                                type="checkbox"
                                id="checkbox-ordersProcess-input"
                                ref={inputOrderInProcessRef}
                                onClick={ordersInProcess}
                                label="Orders in process"
                                className="filter-orderCompleted-check"
                            />
                            <span className="count-order-completed">
                                {allOrdersInProcess.length}
                            </span>
                        </div>
                        <SearchRegister onSearch={goToSearch} />
                    </div>

                    <div className="cont-orderCompleted-date">
                        <div
                            className="cont-orderCompleted"
                            id="color-orderCompleted"
                            ref={inputOrderCompletedRefBG}
                        >
                            <Form.Check
                                type="checkbox"
                                id="checkbox-orderComplete-input"
                                ref={inputOrderCompletedRef}
                                onClick={ordersCompleted}
                                label="Order Completed"
                                className="filter-orderCompleted-check"
                            />
                            <span className="count-order-completed">
                                {myOrdersCompleted.length}
                            </span>
                        </div>
                        {roleName === "Warehouse" && (
                            <div className="cont-register-inventar">
                                <div className="btn-register-inventar">
                                    <Link href={route("orders.index")}>
                                        <Button
                                            className="btn-orders"
                                            id="btn-track"
                                        >
                                            <span>ORDERS</span>
                                        </Button>
                                    </Link>

                                    <Link
                                        href={route(
                                            "warehouse.show",
                                            auth.user.id
                                        )}
                                    >
                                        <Button
                                            className="btn-inventar"
                                            id="btn-inventar"
                                        >
                                            <span>STOCK</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {roleName === "Client" ? (
                            <Form.Control
                                type="month"
                                className="filter-date-register"
                                onChange={showFilteredDate}
                            />
                        ) : (
                            <Form.Select
                                aria-label="Floating label select example"
                                className="swicht-input h-75 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                onChange={showFilteredClient}
                                required
                            >
                                <option value={""}>All Clients</option>
                                {myClients.map((client, index) => (
                                    <option key={index} value={client.user_id}>
                                        {client.name}
                                    </option>
                                ))}
                            </Form.Select>
                        )}

                        {/* <SearchRegisterMobile onSearch={goToSearch} /> */}
                    </div>
                </div>
                <div className="cont-table-register">
                    {activeOrderCompleted === false &&
                        roleName !== "Client" && (
                            <h3 className="title-newOrders">
                                New Orders{" "}
                                <span className="count-title-newOrders">
                                    {filteredShowMyOrders === undefined
                                        ? "0"
                                        : filteredShowMyOrders.length}
                                </span>
                            </h3>
                        )}
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="tbl-header py-2 ">#</th>
                                <th className="tbl-header py-2 ">Product</th>
                                <th className="tbl-header py-2 ">Quantity</th>
                                <th className="tbl-header py-2 ">Status</th>
                                <th className="tbl-header py-2 ">Created</th>
                                <th className="tbl-header py-2 ">Sent</th>
                                <th className="tbl-header py-2 ">Receiver</th>
                                <th className="tbl-header py-2 ">Action</th>
                            </tr>
                        </thead>
                        <tbody>{filteredShowMyOrders}</tbody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
