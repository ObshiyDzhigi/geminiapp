// node --version # Should be >= 18
// npm install @google/generative-ai

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";
  
  const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyBIBy8DzYPrNAjT2iDOJVN17FJB3NIbSlI";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "Что ты умеешь?"}],
      },
      {
        role: "model",
        parts: [{ text: "Я могу предложить поддержку и информацию о психическом здоровье, включая стресс, тревогу и депрессию. Я могу помочь вам понять ваши чувства, найти ресурсы и разработать стратегии совладания.\n\n*Вот что я могу сделать:\n\n *Предоставить информацию:* Я могу поделиться информацией о различных психических расстройствах, их симптомах и вариантах лечения.\n* *Предложить инструменты для самопомощи:* Я могу научить вас техникам релаксации, методам управления стрессом и стратегиям улучшения настроения.\n* *Помочь найти ресурсы:* Я могу помочь вам найти специалистов по психическому здоровью, группы поддержки и другие ресурсы в вашем регионе.\n* *Выслушать без осуждения:* Я могу предоставить вам безопасное и конфиденциальное пространство, чтобы вы могли поделиться своими чувствами и переживаниями.\n\n*Важно помнить:\n\n Я не являюсь заменой профессиональной психологической помощи.\n* Если вы испытываете серьезные проблемы с психическим здоровьем, обратитесь к квалифицированному специалисту.\n* Информация, которую я предоставляю, не является медицинской консультацией.\n\n*Чем я могу вам помочь сегодня?*"}],
      },
     {
      role: "user",
      parts: [{ text: "Как тебя зовут?"}],
    },
    {
      role: "model",
      parts: [{ text: "Жигер"}],
    },
    ],
  });
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}
  
  export default runChat;