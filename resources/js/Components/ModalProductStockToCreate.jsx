import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ModalProductStockToEdit(props) {
    const [image, setImage] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        model: "",
        category: "",
        description: "",
        color: "",
        quantity: "",
        price: "",
        image: "",
    });

    const showImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imgUrl = reader.result;
            setImage(imgUrl);
            //console.log(event.target.files);
        };

        reader.readAsDataURL(file);
        setData("image", file);
    };

    const submit = (e) => {
        //console.log(data);
        e.preventDefault();
        post(route("warehouse.store"));
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button onClick={handleShow} className={props.btn_class}>
                {props.title}
            </Button>

            <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
                <Modal.Header className={props.headerModal}>
                    <Modal.Title>
                        <img
                            src={props.logoModal}
                            alt={props.altLogo}
                            className={props.img_class}
                        />
                    </Modal.Title>
                    <span className={props.slogan_class}>
                        {props.sloganContent}
                    </span>
                </Modal.Header>

                <Modal.Body>
                    <div className="cont-product-detail">
                        <div className="cont-product-foto">
                            {image && (
                                <img
                                    src={image}
                                    className="cont-newFoto-stock"
                                ></img>
                            )}
                        </div>
                        <div className="cont-detail-product">
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                <div className="d-flex w-100">
                                    <Form.Control
                                        type="text"
                                        className="form-product-quantity me-2 w-100 bg-white rounded-3 py-2 text-black "
                                        placeholder="Model"
                                        value={data.model}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                    />

                                    <Form.Control
                                        type="text"
                                        className="form-product-quantity me-2 w-100 bg-white rounded-3 py-2 text-black "
                                        placeholder="Category"
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="d-flex align-items-center w-100 mt-3">
                                    <Form.Control
                                        type="text"
                                        className="form-product-quantity me-2 mb-3 w-50 bg-white rounded-3 py-2 text-black "
                                        placeholder="Color"
                                        value={data.color}
                                        onChange={(e) =>
                                            setData("color", e.target.value)
                                        }
                                    />

                                    <div className="w-50 ms-2 d-flex align-items-center justify-content-center">
                                        <input
                                            type="file"
                                            className="form-product-quantity w-100 bg-white rounded-3 py-2 text-black"
                                            onChange={showImage}
                                            id="foto"
                                            hidden
                                        />
                                        <label
                                            htmlFor="foto"
                                            className=" fs-4 w-75"
                                        >
                                            <i className="bi bi-camera-fill">
                                                {" "}
                                            </i>
                                            Upload Image!
                                        </label>
                                    </div>
                                </div>

                                <textarea
                                    type="text"
                                    className="form-product-quantity bg-white w-100 border-none text-black rounded-3 p-2 mt-3"
                                    style={{ width: "100%", height: "8rem" }}
                                    placeholder="Description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                <div className="cont-quantity-btn mt-3">
                                    <div className="d-flex w-50">
                                        <Form.Control
                                            type="number"
                                            className="form-product-quantity me-2 w-75 bg-white rounded-3 py-0 text-black "
                                            value={data.quantity}
                                            placeholder="0"
                                            min={1}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <span className="quantity-order fs-5 align-self-end">
                                            PCS
                                        </span>
                                    </div>

                                    <div className="d-flex w-50 justify-content-end">
                                        <span className="quantity-order">
                                            $
                                        </span>
                                        <Form.Control
                                            type="number"
                                            className="form-product-quantity ms-1 w-75 bg-white rounded-3 py-0 text-black "
                                            value={data.price}
                                            placeholder="0"
                                            min={1}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-100 text-center">
                                    <Button
                                        type="submit"
                                        onClick={handleClose}
                                        disabled={processing}
                                        className="btn-addCart bg-success mt-3"
                                    >
                                        Create Product
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalProductStockToEdit;
