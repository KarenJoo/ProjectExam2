import React from "react";
import CreateVenueForm from "../../components/forms/CreateVenueForm";
import styles from './VenueForm.module.css'

const CreateVenue = () => {


  const handleSubmit = (formData) => {
    console.log("Submitted form data:", formData);
    alert("Venue created successfully!");
    // Add logic here to handle venue creation (e.g., API call)
  };
  return (
    <div className={styles.form}>
   
        <CreateVenueForm onSubmit={handleSubmit}/> 
       
        <div>
        </div>
      
    </div>
  );
};

export default CreateVenue;
