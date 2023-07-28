const BASE_URL = `${import.meta.env.VITE_PROJECTS_API}/api`;

// Function to send a message
export const sendMessage = async data => {
  try {
    const response = await fetch(`${BASE_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to send message.');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error('Error sending message: ' + error.message);
  }
};
