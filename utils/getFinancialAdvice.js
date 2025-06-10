import 'dotenv/config';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);

  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget:₹ ${totalBudget} USD 
      - Expenses:₹ ${totalSpend} USD 
      - Incomes:₹ ${totalIncome} USD
      Provide detailed financial advice in 2 sentences to help me manage my finances more effectively.
      Dont add any words like "2 sentence" make it feel more natural.
    `;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Alternate: 'mixtral-8x7b-32768'
        messages: [{ role: 'user', content: userPrompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Unknown error from Groq API');
    }

    const advice = data.choices[0].message.content;
    console.log(advice);
    return advice;
  } catch (error) {
    console.error('Error fetching financial advice from Groq:', error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
