const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;
let historyLoaded = false; // Flag to check if the chat history has been loaded

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi; // return chat <li> element
}

// Fetch chat history from the backend
const fetchChatHistory = async () => {
    try {
        const res = await fetch("http://localhost/Airline-System-Backend/public/api/chat/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json(); // Parsing response JSON

        // Check if the response contains chat history
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(chat => {
                if (chat.user_message) {
                    chatbox.appendChild(createChatLi(chat.user_message, 'outgoing'));
                }
                if (chat.chatbot_message) {
                    chatbox.appendChild(createChatLi(chat.chatbot_message, 'incoming'));
                }
            });
        } else {
            console.log("This user has no chat history.");
        }

        chatbox.scrollTo(0, chatbox.scrollHeight);
    } catch (error) {
        console.error("Error fetching chat history:", error);

        // Check if error is from a non-JSON response
        if (error.message.includes('Unexpected token')) {
            console.error("Received non-JSON response. Make sure the API endpoint returns JSON data.");
        }
    }
}

// Generate response by sending a request to the backend
const generateResponse = async (userMessage, chatElement) => {
    const API_URL = "http://localhost/Airline-System-Backend/public/api/chat/response"; // backend API endpoint for sending messages

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            msg: userMessage
        })
    }

    try {
        // Send POST request to backend API
        const res = await fetch(API_URL, requestOptions);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json(); // Parsing response JSON
        console.log(data);
        console.log(data.response);
        if (data.response) {
            // Update the message element with the response
            chatElement.textContent = data.response;
        } else {
            throw new Error("No response from the server.");
        }
    } catch (error) {
        chatElement.classList.add("error");
        chatElement.textContent = "Oops! Something went wrong. Please try again.";
        console.error('Error:', error); // Log the error for debugging

        // Check if error is from a non-JSON response
        if (error.message.includes('Unexpected token')) {
            console.error("Received non-JSON response. Make sure the API endpoint returns JSON data.");
        }
    } finally {
        chatbox.scrollTo(0, chatbox.scrollHeight); // Ensure the chatbox scrolls to the bottom
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    const outgoingChatLi = createChatLi(userMessage, "outgoing");
    chatbox.appendChild(outgoingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(userMessage, incomingChatLi);  // Pass userMessage to generateResponse
    }, 600);
}

// Adjust the height of the input textarea based on its content
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", async () => {
    document.body.classList.toggle("show-chatbot");
    if (document.body.classList.contains("show-chatbot") && !historyLoaded) {
        await fetchChatHistory(); // Fetch chat history when the chat opens for the first time
        historyLoaded = true; // Set the flag to true to prevent reloading chat history
    }
});
