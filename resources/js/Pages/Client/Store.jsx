import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardStore from "@/Components/CardStore";
import SearchStore from "@/Components/SearchStore";

export default function Store({
    auth,
    myCart,
    stockProduct,
    stockColor,
    clients,
    stockCategory,
    stockModel,
    mostPopularProduct,
}) {
    const mostPopular = [mostPopularProduct];
    const [myStore, setMyStore] = useState(stockProduct);
    const [filteredStore, setFilteredStore] = useState(stockProduct);
    const [activeMostPopular, setActiveMostPopular] = useState(false);
    const [activeCategory, setActiveCategory] = useState(false);
    const [categoryOrModel, setCategoryOrModel] = useState(false);
    const [showMyStore, setShowMyStore] = useState();

    const inputMostPopularRef = useRef(null);
    var inputMostPopular = inputMostPopularRef.current;
    const inputMostPopularRefBG = useRef(null);
    var inputMostPopularBG = inputMostPopularRefBG.current;

    const selectCategoryRef = useRef(null);
    var selectCategory = selectCategoryRef.current;

    const selectModelRef = useRef(null);
    var selectModel = selectModelRef.current;

    const ShowMostPopular = () => {
        if (inputMostPopular.checked) {
            inputMostPopularBG.style.backgroundColor = "#c9ad83";
            setActiveMostPopular(true);
            setMyStore(mostPopular);
            setFilteredStore(mostPopular);
            selectCategory.disabled = true;
            selectModel.disabled = true;
        } else if (!inputMostPopular.checked) {
            inputMostPopularBG.style.backgroundColor = "white";
            setActiveMostPopular(false);
            setMyStore(stockProduct);
            setFilteredStore(stockProduct);
            selectCategory.disabled = false;
            selectModel.disabled = false;
        }
    };

    const showCategory = (e) => {
        const myCategory = e.target.value;
        if (myCategory !== "") {
            setCategoryOrModel(myCategory);
            setActiveCategory(true);
            selectModel.value = "";
        } else {
            setCategoryOrModel(false);
        }
    };

    const showModel = (e) => {
        const myModel = e.target.value;
        if (myModel !== "") {
            setCategoryOrModel(myModel);
            setActiveCategory(false);
            selectCategory.value = "";
        } else {
            setCategoryOrModel(false);
        }
    };

    const goToSearch = (e) => {
        var finalStore;
        if (activeMostPopular === false) {
            finalStore = myStore.filter((itemStore) =>
                itemStore.model.toLowerCase().includes(e.toLowerCase())
            );
            if (activeCategory && categoryOrModel) {
                finalStore = myStore.filter(
                    (itemStore) =>
                        itemStore.model
                            .toLowerCase()
                            .includes(e.toLowerCase()) &&
                        itemStore.category === categoryOrModel
                );
            } else {
                if (categoryOrModel) {
                    finalStore = myStore.filter(
                        (itemStore) =>
                            itemStore.model
                                .toLowerCase()
                                .includes(e.toLowerCase()) &&
                            itemStore.model === categoryOrModel
                    );
                }
            }
        } else {
            finalStore = myStore.filter((itemStore) =>
                itemStore.model.toLowerCase().includes(e.toLowerCase())
            );
        }

        setFilteredStore(finalStore);
    };

    useEffect(() => {
        const productArray = filteredStore.map((item, index) => (
            <CardStore
                key={index}
                img={item.image}
                infoImg="foto-items"
                category={item.category}
                model={item.model}
                infoProduct={item.description}
                stockColor={stockColor}
                price={item.price}
                description={item.description}
                clients={clients}
            ></CardStore>
        ));
        setShowMyStore(productArray);
    }, [filteredStore]);

    const { data, setData, post, processing, errors, reset } = useForm({
        product: "",
        color: "",
        quantity: "",
    });

    const submit = (e) => {
        //console.log(data);
        e.preventDefault();
        post(route("store.store"));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={"Store"}>
            <Head title="Store" />
            <div className="cont-global-store">
                <div className="cont-product-store">
                    <div className="store-items row row-cols-1 row-cols-md-3 g-4 pb-2">
                        {showMyStore}
                    </div>
                </div>

                <div className="cont-filter-store">
                    <div className="cont-search-categories">
                        <SearchStore onSearch={goToSearch} />
                        <div className="cont-category-filter">
                            <div className="cont-title-category">
                                <h2>PRODUCT FILTRER</h2>
                            </div>
                            <div className="cont-selects-categories">
                                <div
                                    className="cont-mostPoppular w-75 py-2 mb-3"
                                    id="color-orders-process"
                                    ref={inputMostPopularRefBG}
                                >
                                    <Form.Check
                                        type="checkbox"
                                        id="checkbox-ordersProcess-input"
                                        ref={inputMostPopularRef}
                                        onClick={ShowMostPopular}
                                        label="Most Popular"
                                        className="filter-orderCompleted-check"
                                    />
                                    <span className="count-order-completed">
                                        {/* {allOrdersInProcess.length} */}
                                    </span>
                                </div>
                                <Form.Select
                                    aria-label="Floating label select example"
                                    className="form-order-input fs-6 w-75 mb-3 bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    style={{ height: "40px" }}
                                    onChange={showCategory}
                                    ref={selectCategoryRef}
                                >
                                    <option value={""}>All categories</option>
                                    {stockCategory.map((category, index) => (
                                        <option
                                            key={index}
                                            value={category.category}
                                        >
                                            {category.category}
                                        </option>
                                    ))}
                                </Form.Select>

                                <Form.Select
                                    aria-label="Floating label select example"
                                    className="form-order-input fs-6 w-75  bg-secondary bg-white border-none text-black rounded-3 py-0"
                                    style={{ height: "40px" }}
                                    onChange={showModel}
                                    ref={selectModelRef}
                                >
                                    <option value={""}>All Models</option>
                                    {stockModel.map((model, index) => (
                                        <option key={index} value={model.model}>
                                            {model.model}
                                        </option>
                                    ))}
                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
