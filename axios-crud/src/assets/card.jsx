import './card.css'; // Importing the CSS for styling the Card component

export const Card = ({ curItem, onDelet, handleUpdatePost }) => {
    // Destructure the properties of the current item (post)
    const { id, title, body } = curItem;

    return (
        <>
            {/* Card Container */}
            <div className='card'>
                {/* Display post details */}
                <li className='user-id' key={id}>
                    <h1>id: {id}</h1> {/* Display post ID */}
                    <h2 className="title">title: {title}</h2> {/* Display post title */}
                    <p className="body">body: {body}</p> {/* Display post body */}
                    
                    {/* Button to trigger editing a post */}
                    <button onClick={() => handleUpdatePost(curItem)}>EDIT</button>
                    
                    {/* Button to trigger deleting a post */}
                    <button onClick={() => onDelet(id)}>DELETE</button>
                </li>
            </div>
        </>
    );
};



// Explanation of Key Features
// Props and Usage

// curItem:
// Represents the current post object passed to the Card component.
// Contains id, title, and body properties that are displayed on the card.
// onDelet:
// A function passed down as a prop from the parent component.
// It is called with the post's id when the DELETE button is clicked to remove the post.
// handleUpdatePost:
// A function passed down as a prop from the parent component.
// It is called with the entire curItem object when the EDIT button is clicked to update the post.
// Rendering Post Details

// The post's id, title, and body are displayed inside a list item (<li>) styled with the class user-id.
// The outer <div> with the card class serves as the container for the individual card.
// Buttons for Actions

// EDIT Button:
// Calls handleUpdatePost and passes the curItem object to the parent component for editing.
// DELETE Button:
// Calls onDelet and passes the id of the post to remove it from the list.
// Key Attribute

// The key={id} is used to uniquely identify the list item when rendering lists of components. This helps React efficiently update the DOM.
// High-Level Use Case
// Purpose:
// The Card component is used to display individual posts in a structured and visually appealing format. It also provides EDIT and DELETE actions for managing posts.

// Practical Application:

// EDIT: When the EDIT button is clicked, it calls handleUpdatePost with the post details (curItem) to populate the form in the parent component for editing.
// DELETE: When the DELETE button is clicked, it triggers the onDelet function in the parent component to remove the post from the list.
// Integration with Parent Component
// This component works in conjunction with the parent component, which:

// Manages the list of posts.
// Implements the onDelet function to remove a post from the state.
// Implements the handleUpdatePost function to handle editing logic by populating the form with the selected post's data.