import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SearchRegister = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const dataCaptured = (e) => {
        setSearchText(e.target.value);
    };

    const goToSearch = () => {
        onSearch(searchText);
    };
    return (
        <div className="register-cont-search">
            <Form.Control
                type="text"
                className="register-search-text"
                value={searchText}
                onChange={dataCaptured}
                placeholder="Search Product"
            />
            <Button className="register-cont-lupe" onClick={goToSearch}>
                <img src="/images/icons/lupe.svg" alt="searcher" />
                <span className="title-search">Search filter</span>
            </Button>
        </div>
    );
};

export default SearchRegister;
