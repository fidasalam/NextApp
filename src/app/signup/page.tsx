"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./signup.module.css";

function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState<string | null>(null); // State to store response message
  const [buttonDisabled, setButtonDisabled] = useState(true); 

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      setMessage(response.data.message); 
      toast.success("Signup successful!");
      setUser({
        username: "",
        email: "",
        password: ""
      });
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      setMessage(`Error: ${error.message}`);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className={styles.label}>
                User Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="family-name"
                required
                value={user.username}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
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
                autoComplete="new-password"
                required
                value={user.password}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={`${styles.button} ${buttonDisabled ? styles.buttonDisabled : styles.buttonEnabled}`}
                disabled={buttonDisabled}
              >
                Sign Up
              </button>
            </div>
            <div className={styles.link}>
              <Link href="/login">
                Visit Login Page
              </Link>
            </div>
          </form>
          {message && (
            <div className={`mt-4 text-center text-sm ${message.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
