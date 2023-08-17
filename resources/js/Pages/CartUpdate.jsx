import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CartUpdate({ auth, myCart }) {
    {
        /* ---------------------------------------------------------------------FUNCTION TO UPDATE THE LOCAL STORAGE */
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = route("store.create");
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    var currentMyCart = {};
    sessionStorage.setItem("myCurrentCart", JSON.stringify(myCart));

    return (
        <AuthenticatedLayout user={auth.user} header={"Store"}>
            <Head title="Store" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 d-flex flex-column justify-center">
                            <h2>Updating Cart...</h2>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
