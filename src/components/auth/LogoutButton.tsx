"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const LogoutButton = () => {
    const handleLogout = async () => {
        try{
            await fetch("/api/auth/logout", {
                method: "POST",
            });
            toast.success("logout successfully!");
            window.location.href = "/";
        } catch(error: any) {
            toast.error(error.error)
        }
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
