"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
        });

        if (res.ok) {
            window.location.href = "/";
        } else {
            console.error("Logout failed");
        }
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
