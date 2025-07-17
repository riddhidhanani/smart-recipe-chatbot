from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key = os.getenv("OPENAI_API_KEY")

# 🔄 Accepts full message history
class MessageHistory(BaseModel):
    messages: List[Dict[str, str]]

@app.get("/")
def read_root():
    return {"message": "Smart Recipe Chatbot Backend is running!"}

@app.post("/generate-recipe")
async def generate_recipe(history: MessageHistory):
    try:
        print(f"📥 Prompt history: {[m['content'] for m in history.messages]}")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=history.messages,
            temperature=0.7,
            max_tokens=500
        )
        content = response.choices[0].message["content"]
        print(f"✅ OpenAI Response: {content}")
        return {"reply": content}
    except Exception as e:
        print(f"❌ OpenAI error: {e}")
        return {"error": str(e)}


