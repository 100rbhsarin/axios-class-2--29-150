import { useEffect, useState } from 'react';
import './Form.css';
import { editPost, putPost } from '../api/postApi'; // Import API methods for adding and updating posts

export const Form = ({ data, setData, updatePostApi, setUpdatePostApi }) => {
    // State to manage form inputs
    const [addData, setAddData] = useState({
        id: '',
        title: '',
        body: ''
    });

    // Check if there is any post data to update (used to switch between ADD and EDIT modes)
    let isEmpty = Object.keys(updatePostApi).length === 0;

    // Populate the form fields with the post data for editing
    useEffect(() => {
        updatePostApi && setAddData({
            title: updatePostApi.title || "", // Use the title from the post being edited
            body: updatePostApi.body || "",  // Use the body from the post being edited
        });
    }, [updatePostApi]); // Trigger this effect whenever `updatePostApi` changes

    // Handle input changes in the form fields
    const handleInputChange = (e) => {
        const name = e.target.name; // Get the input field's name (e.g., 'title' or 'body')
        const value = e.target.value; // Get the value of the input field

        // Update the state for the form input fields
        setAddData((prev) => {
            return {
                ...prev, // Keep the previous state
                [name]: value, // Update only the changed field
            };
        });
    };

    // Add a new post using the API
    const getData = async () => {
        const res = await editPost(addData); // Call the API to create a new post
        console.log('res', res);

        if (res.status === 201) { // Check if the post was successfully created
            console.log(200);
            setData([...data, res.data]); // Update the list of posts with the new post
            setAddData({
                id: '',
                title: '',
                body: ''
            }); // Reset the form fields
        }
    };

    // Update an existing post using the API
    const updatePostData = async () => {
        try {
            const res = await putPost(updatePostApi.id, addData); // Call the API to update the post
            console.log(res);

            if (res.status === 200) { // Check if the update was successful
                setData((prev) => {
                    return prev.map((curElem) => {
                        // Replace the updated post in the list
                        return curElem.id === res.data.id ? res.data : curElem;
                    });
                });

                setAddData({ title: "", body: "" }); // Reset the form fields
                setUpdatePostApi({}); // Clear the post being edited
            }
        } catch ({ error }) {
            console.log(error); // Log any errors that occur
        }
    };

    // Handle form submission (decides between ADD and EDIT actions)
    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        const action = e.nativeEvent.submitter.value; // Get the button value ('ADD' or 'EDIT')
        if (action === 'ADD') {
            getData(); // Call the function to add a new post
        } else if (action === 'EDIT') {
            updatePostData(); // Call the function to update the existing post
        }
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title"></label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="title"
                        name="title"
                        placeholder="ADD TITLE"
                        value={addData.title} // Bind the input field to the state
                        onChange={handleInputChange} // Handle changes to the input field
                    />
                </div>

                <div>
                    <label htmlFor="body"></label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="body"
                        name="body"
                        placeholder="add body"
                        value={addData.body} // Bind the input field to the state
                        onChange={handleInputChange} // Handle changes to the input field
                    />
                </div>

                <button type="submit" value={isEmpty ? "ADD" : "EDIT"}>
                    {isEmpty ? "ADD" : "EDIT"} {/* Change button text based on the mode */}
                </button>
            </form>
        </>
    );
};




// Explanation of Key Features
// State Management

// addData: Stores the input data for the form fields (title and body).
// isEmpty: Determines whether the form is in "ADD" or "EDIT" mode based on the presence of updatePostApi.
// Functions and Use Cases

// handleInputChange(e): Updates the addData state whenever a user types into the form.
// Use Case: Keeps the form fields in sync with the state.
// getData(): Sends the form data to the API to create a new post.
// Use Case: Adds a new post to the list and resets the form.
// updatePostData(): Sends the updated data to the API to edit an existing post.
// Use Case: Updates the selected post and reflects the change in the UI.
// handleFormSubmit(e): Determines whether the form submission should add or edit a post based on the button clicked.
// Use Case: Links the submit button's action to either adding or editing a post.
// Effect Hook

// useEffect: Fills the form with the post data for editing whenever updatePostApi changes.
// Use Case: Ensures the form displays the correct data when editing a post.
// Dynamic Button Behavior

// Changes the button text and value based on whether the form is in "ADD" or "EDIT" mode.
// Use Case: Provides clear feedback to the user about the form's action.
// Integration with Parent Component

// Props:
// data: The list of all posts (shared with the parent component).
// setData: A function to update the posts list.
// updatePostApi: The post data to be edited.
// setUpdatePostApi: A function to reset or set the post being edited.
// High-Level Use Case
// Purpose:
// This component handles the user interface for adding or editing posts. It works with APIs to:

// Add new posts to the list.
// Edit existing posts.
// Reset the form when necessary.
// Practical Application:
// This form can be part of an admin dashboard or a blogging platform where users manage content (e.g., articles, comments).

// Let me know if you need additional clarifications!
