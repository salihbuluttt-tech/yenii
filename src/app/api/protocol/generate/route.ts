import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Şifreleme karakter havuzu (Karışıklığı önlemek için I, O, 0 gibi karakterler çıkarıldı)
const CHAR_POOL = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export async function POST(request: Request) {
  try {
    const { type, userEmail } = await request.json();

    // 1. Rastgele Kod Üretimi (TB-XXXX-X Formatı)
    let part1 = '';
    for (let i = 0; i < 4; i++) {
      part1 += CHAR_POOL.charAt(Math.floor(Math.random() * CHAR_POOL.length));
    }
    const part2 = CHAR_POOL.charAt(Math.floor(Math.random() * CHAR_POOL.length));
    const generatedCode = `TB-${part1}-${part2}`;

    // 2. Veritabanına Arka Planda Kayıt
    // Not: Normal Firebase SDK server-side'da farklı çalışabilir ama Next.js Edge/Serverless uyumlu kullanıyoruz.
    const codeData = {
      code: generatedCode,
      user: userEmail || 'SİSTEM_OTOMATİK',
      status: 'Aktif',
      type: type || 'GENEL',
      createdAt: new Date(), // API tarafında Date kullanıyoruz, Firestore bunu Timestamp'e çevirir.
      isInternal: true
    };

    const docRef = await addDoc(collection(db, "codes"), codeData);

    return NextResponse.json({ 
      success: true, 
      code: generatedCode, 
      id: docRef.id,
      message: 'PROKOTOL_KODU_ARKA_PLANDA_URETILDI'
    });

  } catch (error: any) {
    console.error('Protokol Hatası:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
