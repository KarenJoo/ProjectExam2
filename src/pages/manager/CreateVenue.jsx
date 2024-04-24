import React from "react";
import CreateVenueForm from "../../components/forms/CreateVenueForm";
import styles from './VenueForm.module.css'

const CreateVenue = () => {
    return (
        <div className={styles.form}>
            <CreateVenueForm />
        </div>
    )
}

export default CreateVenue;