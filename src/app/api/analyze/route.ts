import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { fileBase64, docType, mimeType } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("CRITICAL_ERROR: NEXT_PUBLIC_GEMINI_API_KEY is not defined in Environment Variables!");
      return NextResponse.json({ 
        error: 'Sistem Yapılandırma Hatası: API Anahtarı Bulunamadı. Lütfen Vercel panelinden veya .env dosyasından anahtarı kontrol edin.' 
      }, { status: 500 });
    }

    // Determine the MIME type (default to image/jpeg if not provided)
    const activeMime = mimeType || "image/jpeg";

    const prompt = `Sen profesyonel bir resmi belge doğrulama uzmanısın. Yüklenen bu ${docType} belgesini analiz et.
    Yapısal Kurallar:
    1. Belgenin sahte olup olmadığını (% güven ile) belirle.
    2. Belgedeki Ada, Parsel, İsim ve Tarih bilgilerini ayıkla.
    3. Analiz sonucunu mutlaka şu JSON formatında ver, başka hiçbir yazı yazma:
    {
      "isValid": boolean,
      "confidence": number,
      "extractedData": { "ada": "ADA_NO", "parsel": "PARSEL_NO", "owner": "ISIM", "date": "TARIH" },
      "summary": "Analiz özeti",
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
                mimeType: activeMime,
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
    
    if (data.error) {
       console.error("GEMINI_API_ERROR:", data.error);
       return NextResponse.json({ error: 'AI Motoru hatası: ' + data.error.message }, { status: 500 });
    }

    let resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    // Markdown temizliği (Eğer ```json ... ``` gelirse)
    if (resultText && resultText.includes('```')) {
      resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
    }

    if (!resultText) {
      return NextResponse.json({ error: 'Yapay zeka analiz sonucu boş döndü.' }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(resultText));

  } catch (error: any) {
    console.error('SYSTEM_FATAL_ERROR:', error);
    return NextResponse.json({ 
      error: 'Analiz motoru mühürlenemedi.',
      details: error.message 
    }, { status: 500 });
  }
}
