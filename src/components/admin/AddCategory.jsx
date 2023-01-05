import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import axios from 'axios';


const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user an from localstorage
    const  user = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    const clickSubmit =  async (e) => {
        e.preventDefault();
        try{
        const {data} = await axios.post("/api/category/add", {
            name,
        });
        console.log(data);
        alert("You have successfully added Category!");
    } catch(error) {

        console.log("Error!");
        alert("Add failed, please try again!");
    }
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
    
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                </div>
            </div>

    );
};

export default AddCategory;