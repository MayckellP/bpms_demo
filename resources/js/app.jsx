import "./bootstrap";
import "../css/app.css";
import "bootstrap/dist/css/bootstrap.min.css";

/* CSS Files */
import "../css/layoutAuth.css";
import "../css/loginView.css";
import "../css/registerView.css";
import "../css/dashboardView.css";
import "../css/quickPurchaseView.css";
import "../css/storeView.css";
import "../css/ordersView.css";
import "../css/orderDetailsView.css";
import "../css/routeDetailsView.css";
import "../css/supportView.css";
import "../css/profileView.css";
import "../css/components/footer.css";
import "../css/components/modals.css";
import "../css/components/cardStore.css";
import "../css/components/navbarMobile.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
