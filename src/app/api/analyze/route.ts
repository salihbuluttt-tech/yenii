import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { fileBase64, docType } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
    }

    const prompt = `Sen bir resmi belge doğrulama uzmanı yapay zekasın. Maddeler halinde verilen şu analizi yap:
    1. Yüklenen belge bir ${docType} mi?
    2. Belgedeki QR kod, mühür ve imza alanları tespit edildi mi?
    3. Belge üzerindeki kritik verileri (Ada, Parsel, İsim vb.) ayıkla.
    4. Belgenin sahteliğine dair bir şüphe var mı?
    
    Yanıtı şu JSON formatında ver:
    {
      "isValid": boolean,
      "confidence": number,
      "extractedData": { "ada": "...", "parsel": "...", "owner": "...", "date": "..." },
      "summary": "Tek cümlelik profesyonel özet",
      "warnings": ["uyarı 1", "uyarı 2"]
    }`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg", // Varsayılan olarak resim kabul ediyoruz, frontend'den gelen mimeType da basılabilir
                data: fileBase64
              }
            }
          ]
        }],
        generationConfig: {
           responseMimeType: "application/json"
        }
      })
    });

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return NextResponse.json(JSON.parse(resultText));

  } catch (error) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json({ error: 'Failsafe: Analiz motorunda hata oluştu.' }, { status: 500 });
  }
}
