import { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileFoto({ className = "" }) {
    const [image, setImage] = useState(null);

    const roleName = JSON.parse(sessionStorage.getItem("currentUser")).rolename;
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            foto: "",
            id: user.id,
        });

    const showImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const imgUrl = reader.result;
            setImage(imgUrl);
        };

        reader.readAsDataURL(file);
        setData("foto", file);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("profile.addImage"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Foto
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile foto.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div>
                    <label htmlFor="foto">Profile Foto</label>
                    <input
                        type="file"
                        id="foto"
                        className="mt-1 block w-full"
                        onChange={showImage}
                    />
                </div>
                {image && <img src={image} className="cont-foto-logo"></img>}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        className="save-profile shadow"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 text-success fw-bold">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
