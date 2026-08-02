import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

const syncFilePath = path.join(os.tmpdir(), "sync-data.json");

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    let syncData: any = {};
    if (fs.existsSync(syncFilePath)) {
      try {
        syncData = JSON.parse(fs.readFileSync(syncFilePath, "utf-8"));
      } catch (e) {
        // ignore parse errors, start fresh
      }
    }
    
    let code = data.customCode;
    if (!code) {
      code = Math.floor(100000 + Math.random() * 900000).toString();
      while (syncData[code]) {
        code = Math.floor(100000 + Math.random() * 900000).toString();
      }
    }
    
    syncData[code] = {
      timestamp: Date.now(),
      session: data
    };
    
    // Cleanup old codes (> 2 hours)
    for (const key in syncData) {
      if (Date.now() - syncData[key].timestamp > 2 * 60 * 60 * 1000) {
        delete syncData[key];
      }
    }
    
    fs.writeFileSync(syncFilePath, JSON.stringify(syncData, null, 2));
    
    return NextResponse.json({ code });
  } catch (e) {
    console.error("Sync error:", e);
    return NextResponse.json({ error: "Failed to sync" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    
    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }
    
    if (fs.existsSync(syncFilePath)) {
      const syncData = JSON.parse(fs.readFileSync(syncFilePath, "utf-8"));
      if (syncData[code]) {
        return NextResponse.json({ session: syncData[code].session });
      }
    }
    
    return NextResponse.json({ error: "Code not found or expired" }, { status: 404 });
  } catch (e) {
    console.error("Sync read error:", e);
    return NextResponse.json({ error: "Failed to fetch sync data" }, { status: 500 });
  }
}
