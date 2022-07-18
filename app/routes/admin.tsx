import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import AdminFooter from "~/components/admin/AdminFooter";
import AdminHeader from "~/components/admin/AdminHeader";
import { requireUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request);
    return null;
};

export default function Admin() {
    return (
        <>
            <AdminHeader />
            <Outlet />
            <AdminFooter />
        </>
    )
}