import { NextResponse } from "next/server";

export async function GET(request: Request){
return NextResponse.json({msg: 'OK!'})
}

export async function POST(request: Request){
    const responseData = await request.json();
    console.log(responseData);
    return NextResponse.json(responseData);
}