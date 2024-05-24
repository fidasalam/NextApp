"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import styles from "./profile.module.css";

const UserProfile = ({ params }: any) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data based on the ID from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${params.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [params.id]);

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/userData');
      console.log(res.data);
      setData(res.data.user);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profile - {params.id}</h2>
      {userData && (
        <div className={styles.userData}>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button onClick={getUserDetails} className={styles.button}>
          Get User Data
        </button>
      </div>
      <div className={styles.dataContainer}>
        <h3>User Data:</h3>
        {data ? (
          <div>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Username:</strong> {data.user}</p>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
      <div className={styles.logoutContainer}>
        <button onClick={handleLogout} className={styles.button1}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
