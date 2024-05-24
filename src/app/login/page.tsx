"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./login.module.css";

function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (user.email && user.password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onLogin();
    };

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user, {
                withCredentials: true // This ensures that cookies are sent with the request
            });
            console.log("Login success", response.data);
            toast.success(response.data.message || "Login successful");

            router.push(`/profile/user`);
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h2 className={styles.title}>Login</h2>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className={styles.label}>
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={user.email}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className={styles.label}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={user.password}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`${styles.button} ${buttonDisabled ? styles.buttonDisabled : styles.buttonEnabled}`}
                            disabled={buttonDisabled}
                        >
                            Login
                        </button>
                        <div className={styles.link}>
                            <Link href="/signup">
                                Visit Signup Page
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
