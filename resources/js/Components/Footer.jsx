import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import TranslateSelect from "./TranslateSelect";

const Footer = () => {
    return (
        <div className="bg-bot">
            <div className="list-bot">
                <ul>
                    <li className="copyRight">© MP-Solutions</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Help</li>
                </ul>
            </div>
            <div className="cont-dropdown">
                <TranslateSelect />
            </div>
        </div>
    );
};

export default Footer;
