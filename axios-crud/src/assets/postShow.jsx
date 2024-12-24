// Import necessary hooks, APIs, and components
import { useEffect, useState } from "react";
import { deletPost, getpost } from "../api/postApi"; // Import API methods for fetching and deleting posts
import { Card } from './card'; // Component to display individual posts
import { Form } from "./Form"; // Component to handle form submissions (adding/editing posts)

// Main component to display and manage posts
export const PostShow = () => {
    const [data, setData] = useState([]); // State to store the list of posts
    const [updatePostApi, setUpdatePostApi] = useState({}); // State to store data for a post to be updated

    console.log(data); // Debugging: Log current posts data

    // Function to handle deletion of a post
    const handleDelete = async (id) => {
        try {
            console.log(`Deleting post with id: ${id}`); // Log ID of the post to be deleted
            const res = await deletPost(id); // Call API to delete the post
            console.log(res.data); // Log the response data
            if (res.status === 200) { // Check if the API call was successful
                console.log(200); // Debugging: Log success status
                const newupdatepost = data.filter((curItem) =>
                    curItem.id !== id // Filter out the deleted post from the state
                );
                setData(newupdatepost); // Update the state with the filtered posts
            }
        } catch (error) {
            console.error('Error deleting post:', error); // Log the error if deletion fails
            alert('Failed to delete the post.'); // Show error message to the user
        }
    };

    // Effect to fetch posts when the component mounts
    useEffect(() => {
        getpostapi(); // Fetch posts from the API
    }, []);

    // Function to fetch posts from the API and update state
    const getpostapi = async () => {
        const res = await getpost(); // Call the API to fetch posts
        setData(res.data); // Update state with the fetched data
        console.log(res.data); // Debugging: Log the fetched data
    };

    // Function to handle updating a post's data
    const handleUpdatePost = (jsonData) => setUpdatePostApi(jsonData); // Update state with the data to be edited

    // Component's JSX structure
    return (
        <>
            <section>
                {/* Form component to add or edit posts */}
                <Form
                    data={data} // Pass current posts data to the form
                    setData={setData} // Pass state updater function to modify posts
                    updatePostApi={updatePostApi} // Pass the post data to be updated
                    setUpdatePostApi={setUpdatePostApi} // Pass function to update post state
                />
            </section>
            <div>
                <ol className="card-container">
                    {/* Map over the posts data and render Card components */}
                    {data.map((curItem) => {
                        return (
                            <Card
                                key={curItem.id} // Unique key for each post
                                curItem={curItem} // Pass current post data to the Card component
                                onDelet={handleDelete} // Pass delete function to Card component
                                handleUpdatePost={handleUpdatePost} // Pass update function to Card component
                            />
                        );
                    })}
                </ol>
            </div>
        </>
    );
};


// Explanation of Key Features
// State Management

// data: Holds the current list of posts fetched from the API.
// updatePostApi: Stores the data of the post to be updated (used for editing posts).
// Functions and Use Cases

// handleDelete(id): Deletes a post by ID.
// Use Case: Called when a user deletes a post, updates the UI by removing the deleted post from the list.
// getpostapi(): Fetches posts from the API and updates the data state.
// Use Case: Automatically runs when the component loads (useEffect hook).
// handleUpdatePost(jsonData): Updates updatePostApi state with the post data to be edited.
// Use Case: Prepares the form to edit the selected post.
// Effect Hook

// useEffect: Runs the getpostapi function when the component is first rendered.
// Use Case: Ensures the posts are fetched and displayed immediately.
// Component Usage

// Form Component:
// Handles adding new posts or editing existing ones.
// Card Component:
// Displays individual posts with actions for deleting or editing.
// Dynamic Rendering

// data.map: Loops through the list of posts and renders each post as a Card component.
// High-Level Use Case
// Purpose:
// This component manages a list of posts fetched from a mock API. It allows users to:

// View all posts.
// Delete a specific post.
// Edit an existing post.
// Add new posts (via the Form component).
// Practical Application:
// This can be part of a blogging platform or admin dashboard where users manage posts or articles.

// Let me know if you need further clarification or enhancements! 