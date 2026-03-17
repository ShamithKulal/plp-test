"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/auth";

export async function login(password: string) {
    if (password !== process.env.ADMIN_PASSWORD) {
        return { success: false, error: "Incorrect password" };
    }

    // Set the session cookie
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await encrypt({ admin: true, expires });

    (await cookies()).set("admin_session", session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });

    redirect("/admin");
}

export async function logout() {
    (await cookies()).set("admin_session", "", { expires: new Date(0) });
    redirect("/admin/login");
}
