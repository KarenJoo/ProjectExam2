import React from "react";
import CreateVenueForm from "../../components/forms/CreateVenueForm";
import styles from './VenueForm.module.css'
import useAuth from "../../hooks/useAuth";

const CreateVenue = () => {
  const { user } = useAuth();


  const handleSubmit = (formData) => {
    // Simulate form submission logic (replace with actual API call)
    console.log("Submitted form data:", formData);
    alert("Venue created successfully!");
    // Add logic here to handle venue creation (e.g., API call)
  };
  return (
    <div className={styles.form}>
      {/* Check if user is authenticated and is a venue manager */}
      {user && user.venueManager ? (
        <CreateVenueForm onSubmit={handleSubmit}/> 
      ) : (
        <div>
          <h1>Unauthorized Access</h1>
          <p>You are not authorized to create a venue.</p>
        </div>
      )}
    </div>
  );
};

export default CreateVenue;
