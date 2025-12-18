import { NextRequest, NextResponse } from "next/server";
import { documents } from "@/lib/db/schema/documents-schema";
import { v4 as uuidv4 } from "uuid";
import { eq, and } from "drizzle-orm";
import { getDb } from "@/lib/db";

const MOCK_USER_ID = "user-1";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isTemplate = searchParams.get("isTemplate") === "true";
    const db = getDb();
    const docs = await db.query.documents.findMany({
      where: and(
        eq(documents.userId, MOCK_USER_ID),
        eq(documents.isTemplate, isTemplate)
      ),
      orderBy: (documents: { updatedAt: any }, { desc }: any) => [
        desc(documents.updatedAt),
      ],
    });

    return NextResponse.json(docs);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, isTemplate } = body;

    if (!title || content === undefined) {
      return NextResponse.json(
        { error: "Missing title or content" },
        { status: 400 }
      );
    }

    const db = getDb();
    const newDoc = {
      id: uuidv4(),
      title,
      content,
      userId: MOCK_USER_ID,
      isTemplate: !!isTemplate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(documents).values(newDoc);

    return NextResponse.json(newDoc);
  } catch (error) {
    console.error("Error creating document:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
