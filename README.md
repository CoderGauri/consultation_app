# consultation_app
A consultation app with react , node and postgres tech stack
Blog-App step wise(Frontend)
Create a react app using the cmd npx-create-react-app blog-app.
Run the app using cmd npm start.
Runs on port 3000
Navigate to app.js - remove everything from the return section.
Add a form tag with a method called onSubmit which will be calling a function called handleSubmit.
Now the form tag will have 3 divs and a button tag with type submit.
Each div has a label and input tag.
Input tag has a type (text) , has a id (identification) ,value(event) and each input tag will have a  onChange event which will be calling a respected function.
We will be having 3 input fields named postName , description , author.
All of these will be having a initilized state in order to track the changes (state) of the respected component.
To track the changes we use a hook kwon as useState, which returns 2 values 
1. The current state stored in a variable 
2. A function that updates the state.
Any changes made in the input tag  , would trigger the event , which would eventually change the state.
