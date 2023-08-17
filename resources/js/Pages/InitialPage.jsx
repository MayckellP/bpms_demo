import React from "react";
import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const InitialPage = ({ auth, myCart }) => {
    useEffect(() => {
        const roleName = JSON.parse(sessionStorage.getItem("currentUser")).role;
        const timer = setTimeout(() => {
            window.location.href = route("client.index");
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    var currentUser = {
        name: auth.user.name,
        role: "Client",
        email: auth.user.email,
    };
    var currentMyCart = {};

    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    sessionStorage.setItem("myCurrentCart", JSON.stringify(myCart));
    return (
        <AuthenticatedLayout user={auth.user} header={"Dashboard"}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 text-center m-auto">
                            <h2>Redirecting...!</h2>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default InitialPage;
