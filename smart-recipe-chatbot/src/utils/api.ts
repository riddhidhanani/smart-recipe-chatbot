export const getAIRecipe = async (messages: { role: string; content: string }[]): Promise<string> => {
  try {
    const res = await fetch('http://localhost:8000/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const data = await res.json();
    if (data.reply) return data.reply;
    if (data.error) return `❌ Error: ${data.error}`;
    return 'Something went wrong.';
  } catch (err) {
    console.error(err);
    return 'There was an error contacting the recipe bot.';
  }
};
