import { NextResponse } from "next/server";

export async function GET(){

    const response = await fetch('https://api.airtable.com/v0/app6LGrkjX3FjxTwd/comments ',{
        headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN} `,

    },
    next:{
        revalidate: 0,
    }

    });
    const data = await response.json();
    console.log('token: ', process.env.AIRTABLE_TOKEN)
    console.log('data: ', data)

    return NextResponse.json(data.records);

}


export async function POST(request: Request){
    const responseData = await request.json();
    console.log('plain data: ', responseData);

    const response = await fetch('https://api.airtable.com/v0/app6LGrkjX3FjxTwd/comments ',{
        headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN} `,
        'Content-Type': 'application/json',

    },
    method: 'POST',
    body: JSON.stringify({
        records: [{
            fields:{
                content: responseData.commentContent
            }
        }

        ]
    })
    });
    const data = await response.json();
    return NextResponse.json(data);
}