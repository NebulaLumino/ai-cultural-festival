import { NextRequest, NextResponse } from 'next/server';
let _clientPromise: Promise<any> | null = null;

async function getClient() {
  if (!_clientPromise) {
    _clientPromise = (async () => {
      const { default: OpenAI } = await import('openai');
      return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: 'https://api.deepseek.com/v1'
      });
    })();
  }
  return _clientPromise;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const f1: string = body.f1 || '';
    const f2: string = body.f2 || '';
    const f3: string = body.f3 || '';
    const f4: string = body.f4 || '';
    const userContent = `Cultural Heritage: ${f1}\nEvent Scale: ${f2}\nTarget Participants: ${f3}\nCommunity Values: ${f4}`;
    const client = await getClient();
    const completion = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are an experienced cultural event producer and festival director. Given cultural heritage, event scale, target participants, and community values, generate a comprehensive cultural festival design including: festival name and concept, program of events and activities, participation and engagement strategy, cultural expression and celebration elements, community involvement and volunteer structure, marketing and audience development, logistical layout and site plan, and how the festival honors heritage while being inclusive. Format with clear sections.' },
        { role: 'user', content: userContent },
      ]
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}