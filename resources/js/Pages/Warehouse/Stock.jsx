import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import moment from "moment";
import SearchRegister from "@/Components/SearchRegister";
import ModalProductStock from "@/Components/ModalProductStock";
import ModalProductStockToEdit from "@/Components/ModalProductStockToEdit";
import ModalProductStockToCreate from "@/Components/ModalProductStockToCreate";

export default function Stock({ auth, myStock, alertStock }) {
    const [myStockToFilter, setMyStockToFilter] = useState(myStock);
    const [filteredData, setFilteredData] = useState(myStock);
    const [showFilter, setShowFilter] = useState();

    const inputStockAlertRef = useRef(null);
    var inputStockAlert = inputStockAlertRef.current;
    const inputStockAlertRefBG = useRef(null);
    var inputStockAlertBG = inputStockAlertRefBG.current;

    const stockAlert = () => {
        if (inputStockAlert.checked) {
            inputStockAlertBG.style.backgroundColor = "Red";
            setMyStockToFilter(alertStock);
            setFilteredData(alertStock);
        } else {
            inputStockAlertBG.style.backgroundColor = "White";
            setMyStockToFilter(myStock);
            setFilteredData(myStock);
        }
    };

    const goToSearch = (e) => {
        const finalRegister = myStockToFilter.filter((itemRegister) =>
            itemRegister.model.toLowerCase().includes(e.toLowerCase())
        );

        setFilteredData(finalRegister);
    };

    useEffect(() => {
        const showStock = filteredData.map((item, index) => (
            <tr key={index}>
                <td className="tbl-index">{index + 1}</td>
                <td className="tbl-item">{item.model}</td>
                <td
                    className={
                        item.quantity <= 5000
                            ? "tbl-td fw-bold text-danger"
                            : "tbl-td"
                    }
                >
                    {item.quantity}
                </td>
                <td className="tbl-td">{item.color}</td>
                <td className="tbl-td">
                    {item.created_at !== null
                        ? moment(item.confirmed).format("YYYY-MM-DD")
                        : "--"}
                </td>
                <td className="text-center">
                    <ModalProductStockToEdit
                        btn_class="btn-stock-edit-tbl"
                        div_class=""
                        title="Edit"
                        icon=""
                        altIcon=""
                        headerModal="headerModal"
                        cont_titleModal="cont_titleModal"
                        img_class="w-75"
                        logoModal="/images/0.log_view/NewLogo-black.svg"
                        slogan_class="d-none"
                        sloganContent=""
                        img={item.image}
                        imgError="/images/3.warehouse_view/error_image.png"
                        infoImg={item.model}
                        category={item.category}
                        description={item.description}
                        model={item.model}
                        quantity={item.quantity}
                        infoProduct="Nada..."
                        color={item.color}
                        id={item.id}
                    />
                </td>
                <td className="text-center">
                    <ModalProductStock
                        btn_class="btn-stock-details-tbl"
                        div_class=""
                        title="Details"
                        icon=""
                        altIcon=""
                        headerModal="headerModal"
                        cont_titleModal="cont_titleModal"
                        img_class="w-75"
                        logoModal="/images/0.log_view/NewLogo-black.svg"
                        slogan_class="d-none"
                        sloganContent=""
                        img={item.image}
                        imgError="/images/3.warehouse_view/error_image.png"
                        infoImg={item.model}
                        category={item.category}
                        model={item.model}
                        quantity={item.quantity}
                        infoProduct="Nada..."
                        color={item.color}
                    />
                </td>
            </tr>
        ));
        console.log("veamos que hay: ", showStock);
        setShowFilter(showStock);
    }, [filteredData]);

    console.log("filtrado: ", showFilter);
    return (
        <AuthenticatedLayout user={auth.user} header={"Stock"}>
            <Head title="Stock" />

            <div className="cont-global-register">
                <div className="cont-filter-register">
                    <div className="cont-date-search">
                        <div
                            className="cont-orderCompleted"
                            id="color-orderCompleted"
                            ref={inputStockAlertRefBG}
                        >
                            <Form.Check
                                type="checkbox"
                                id="checkbox-orderComplete-input"
                                ref={inputStockAlertRef}
                                onClick={stockAlert}
                                label="Stock alert"
                                className="filter-orderCompleted-check"
                            />
                            <span className="count-order-completed bg-danger">
                                {alertStock.length}
                            </span>
                        </div>
                        <SearchRegister onSearch={goToSearch} />
                    </div>

                    <div className="cont-allMonth-select">
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

                                <Link href={route("orders.index")}>
                                    <Button
                                        className="btn-inventar"
                                        id="btn-inventar"
                                    >
                                        <span>STOCK</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="register-cont-search-mobile">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Search Product"
                                className="register-search-input-mobile"
                            >
                                <Form.Control
                                    type="text"
                                    className="register-search-text-mobile h-100"
                                />
                            </FloatingLabel>
                            <Button className="register-cont-lupe-mobile">
                                <img
                                    src="/images/icons/lupe.svg"
                                    alt="searcher"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="cont-table-register">
                    <ModalProductStockToCreate
                        btn_class="btn-create-product"
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
                        category=""
                        model=""
                        quantity=""
                        infoProduct="Nada..."
                        color=""
                        id=""
                    />
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th className="tbl-header py-2 ">#</th>
                                <th className="tbl-header py-2 ">Product</th>
                                <th className="tbl-header py-2 ">Quantity</th>
                                <th className="tbl-header py-2 ">Color</th>
                                <th className="tbl-header py-2 ">Created</th>
                                <th colSpan={2} className="tbl-header py-2 ">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>{showFilter}</tbody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
