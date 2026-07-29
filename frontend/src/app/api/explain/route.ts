import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Cache for API client instances
let genAI: GoogleGenerativeAI | null = null;

export async function POST(req: NextRequest) {
  try {
    const { question, options, correctAnswer, userSelected } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key chưa được cấu hình. Vui lòng thêm biến môi trường GEMINI_API_KEY trên Vercel." },
        { status: 500 }
      );
    }

    if (!genAI) {
      genAI = new GoogleGenerativeAI(apiKey);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const optionsText = options.map((opt: any) => `- ${opt.key}: ${opt.text}`).join("\n");
    
    let prompt = `Bạn là một giáo sư Công nghệ thông tin nhiệt tình, vui tính và giỏi chuyên môn.
Một sinh viên đang ôn tập câu hỏi trắc nghiệm sau:

Câu hỏi: "${question}"
Các đáp án:
${optionsText}

Đáp án ĐÚNG là: ${correctAnswer}.
`;

    if (userSelected && userSelected !== correctAnswer) {
      prompt += `\nSinh viên đã chọn sai đáp án: ${userSelected}.\n`;
    }

    prompt += `
Nhiệm vụ của bạn:
1. Giải thích chi tiết, ngắn gọn (dưới 200 từ) và cực kỳ dễ hiểu tại sao đáp án ${correctAnswer} lại đúng. Giải thích bằng tiếng Việt.
2. Nêu nhanh tại sao các đáp án khác lại sai (hoặc tại sao sinh viên hay bị nhầm lẫn).
3. Sử dụng Markdown để trình bày đẹp mắt (dùng in đậm, gạch đầu dòng nếu cần).
Không cần chào hỏi dài dòng, hãy đi thẳng vào vấn đề.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ explanation: text });

  } catch (error: any) {
    console.error("AI Explain Error:", error);
    return NextResponse.json(
      { error: "Rất tiếc, AI đang bận hoặc có lỗi xảy ra. Hãy thử lại sau nhé!" },
      { status: 500 }
    );
  }
}
