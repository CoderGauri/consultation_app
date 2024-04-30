# consultation_app
A consultation app with react , node and postgres tech stack
Blog-App step wise(Frontend)
=>Create a react app using the cmd npx-create-react-app blog-app.
=>Run the app using cmd npm start.
=>Runs on port 3000
=>Navigate to app.js - remove everything from the return section.
=>Add a form tag with a method called onSubmit which will be calling a function called handleSubmit.
=>Now the form tag will have 3 divs and a button tag with type submit.
=>Each div has a label and input tag.
=>Input tag has a type (text) , has a id (identification) ,value(event) and each input tag will have a  onChange event which will be calling a respected function.
=>We will be having 3 input fields named postName , description , author.
=>All of these will be having a initilized state in order to track the changes (state) of the respected component.
=>To track the changes we use a hook kwon as useState, which returns 2 values 
1. The current state stored in a variable 
2. A function that updates the state.
=>Any changes made in the input tag  , would trigger the event , which would eventually change the state.
=>Now in order to store the data in the form of an array and render it we need to follow following steps
=>Creating a New Post Object:
const newPost = { postName, description };: This line creates a new object named newPost using object shorthand notation. It takes the current values of postName and description from the component's state and assigns them to properties with the same names in the newPost object.
=>Updating the Posts State:
setPosts([...posts, newPost]);: This line updates the posts state by adding the newPost object to the existing array of posts. It uses the spread operator (...) to create a new array with all the existing posts (posts) and adds the newPost object to the end.
=>Resetting Input Fields:
setPostName('');: This line resets the postName state to an empty string, clearing the input field for the post name. This ensures that after submitting a post, the input field is cleared for the user to enter a new post name.
setDescription('');: Similarly, this line resets the description state to an empty string, clearing the textarea input field for the post description.
After executing the handleSubmit function, the form data is processed, the posts state is updated with the new post, and the input fields are cleared for the user to submit another post if desired. This function encapsulates the logic for handling form submission in the component.
=>Delete the post
=>In order to delete the post , we add a button below every renders post.
=>In order to delete the post , we add a button below every renders post.
=>const handleDelete = (index) => { ... }: This defines a function named handleDelete which takes the index of the post to be deleted as a parameter.
=>const updatedPosts = [...posts];: This line creates a copy of the posts array using the spread operator (...). This is done to avoid directly mutating the original posts state array.
=>updatedPosts.splice(index, 1);: The splice method is used to remove one element from the updatedPosts array at the specified index. This modifies the updatedPosts array in place.
=>setPosts(updatedPosts);: Finally, the setPosts function is called with the updated array (updatedPosts) to update the state of posts and trigger a re-render of the component.
=><button>: This is an HTML button element.
=>onClick={() => handleDelete(index)}: This sets up an event listener for the click event on the button. When the button is clicked, the handleDelete function is called with the index of the post to be deleted as an argument. The index is passed as an argument to handleDelete because the button is usually rendered within a loop where index identifies the specific post to delete.
=>
