import os
import google.generativeai as genai

# Configure the API key
api_key = "AIzaSyC0Lwyqsoci7wytEeiqtZ5UgXEG8tZNeE4"
genai.configure(api_key=api_key)

# Set up generation configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

# Initialize the generative model
model = genai.GenerativeModel(
    model_name="tunedModels/dsasocraticexamples-lu4fbkyf4xks",
    generation_config=generation_config,
)

# Start the chat session
chat_session = model.start_chat(history=[])

# Continuously handle conversation
print("Socratic Teaching Assistant. Type 'exit' to end the conversation.\n")

while True:
    # Get input from the user
    user_input = input("You: ")

    # Break the loop if the user types 'exit'
    if user_input.lower() == 'exit':
        print("Ending conversation. Goodbye!")
        break

    # Send the user message to the model
    response = chat_session.send_message(user_input)

    # Print the AI's response
    print(f"Assistant: {response.text}\n")
