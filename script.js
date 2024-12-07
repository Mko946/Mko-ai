document.getElementById("generateAI").addEventListener("click", async () => {
  const note = document.getElementById("noteInput").value;
  const aiOutput = document.getElementById("aiOutput");

  if (!note.trim()) {
    aiOutput.innerText = "Please write a note first.";
    return;
  }

  aiOutput.innerText = "Generating AI response...";

  try {
    // Fetch from OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `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` // Replace with your API key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: note }],
        max_tokens: 100
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      aiOutput.innerText = "Error: " + errorData.error.message;
      return;
    }

    const data = await response.json();
    aiOutput.innerText = data.choices[0].message.content || "No response from AI.";
  } catch (error) {
    aiOutput.innerText = "An unexpected error occurred. Please try again later.";
    console.error("Error:", error);
  }
});
