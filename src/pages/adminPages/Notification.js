import io from "socket.io-client";
import React, { useEffect, useState } from "react";

function Notification() {
  const [notifications, setNotifications] = useState([]); // To hold the notifications array
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4004");

    // Send event to request notifications
    socket.emit("Registernotifyget");

    // Listen for notifications
    socket.on("getNotifications", (data) => {
      console.log("Received Notifications:", data); // Debugging: Log received data
      if (data.notifications) {
        setNotifications(data.notifications); // Extract and set notifications array
      } else {
        console.error("Invalid data format:", data);
      }
    });

    // Listen for errors
    socket.on("getNotificationsError", (err) => {
      setError(err.message);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li> // Display notification message
          ))}
        </ul>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
}

export default Notification;
