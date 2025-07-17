import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_recipe(prompt: str) -> str:
    try:
        print(f"🧪 Prompt received: {prompt}")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a creative recipe assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        print(f"✅ OpenAI Response: {response.choices[0].message['content']}")
        return response.choices[0].message["content"]
    except Exception as e:
        print(f"❌ OpenAI error: {e}")
        return None
