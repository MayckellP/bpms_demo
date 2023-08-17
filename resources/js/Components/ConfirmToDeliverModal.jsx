import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputError from "@/Components/InputError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import moment from "moment";

function ConfirmToDeliverModal(props) {
    var Orderdata = props.dataOrder;
    var UserData = props.dataUser;
    if (Orderdata == undefined) {
        Orderdata = [""];
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data, setData, post, processing, errors, reset } = useForm({
        model: Orderdata.model,
        color: Orderdata.color,
        quantity: Orderdata.quantity,
        comment: "N/A",
        order_id: Orderdata.id,
        driver: UserData.name,
        auto: "",
        route_address: Orderdata.address,
    });

    const submit = (e) => {
        //console.log("POST:  ", data);
        e.preventDefault();
        post(route("logistic.store"));
    };
    return (
        <>
            <div onClick={handleShow} className={props.btn_class}>
                <span>{props.title}</span>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className={props.headerModal}>
                    <Modal.Title className={props.cont_titleModal}>
                        <img
                            src={props.logoModal}
                            alt={props.altLogo}
                            className={props.img_class}
                        />
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={submit} className="w-100">
                        <div className="w-100 d-flex justify-between">
                            <Form.Control
                                type="text"
                                className="form-order-input bg-secondary bg-white border-none text-black rounded-3 py-0 mb-3"
                                value={data.model}
                                onChange={(e) =>
                                    setData("model", e.target.value)
                                }
                                required
                            />

                            <Form.Control
                                type="text"
                                className="form-order-input bg-secondary bg-white border-none text-black rounded-3 py-0"
                                value={data.color}
                                onChange={(e) =>
                                    setData("color", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="w-100 d-flex align-items-center">
                            <Form.Control
                                type="number"
                                className="form-order-input bg-secondary bg-white border-none text-black rounded-3 py-0 mb-3"
                                style={{ width: "35%" }}
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                required
                            />
                            <p className="ms-2 fs-3 fw-bold">PCS</p>
                        </div>
                        <FloatingLabel
                            controlId="floatingComment"
                            className="mb-3"
                            style={{ width: "100%", height: "8rem" }}
                        >
                            <Form.Control
                                type="text"
                                className="form-order-input d-flex align-items-baseline bg-secondary w-100 h-100 bg-white border-none text-black rounded-3 py-0"
                            />
                        </FloatingLabel>

                        <Form.Control
                            type="text"
                            className="form-order-input bg-secondary w-100 bg-white border-none text-black rounded-3 py-0 mb-3"
                            value={data.route_address}
                            onChange={(e) =>
                                setData("route_address", e.target.value)
                            }
                            required
                        />

                        <Form.Control
                            type="text"
                            className="form-order-input bg-secondary w-100 bg-white border-none text-black rounded-3 py-0 mb-3"
                            value={data.auto}
                            onChange={(e) => setData("auto", e.target.value)}
                            placeholder="Car license plate"
                            required
                        />

                        <div className="w-100 d-flex justify-end">
                            <Button
                                type="submit"
                                onClick={handleClose}
                                className="btn-rate"
                            >
                                Assign!
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ConfirmToDeliverModal;
