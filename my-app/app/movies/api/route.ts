import {NextResponse} from 'next/server';

export async function GET(){

    const response = await fetch('https://api.airtable.com/v0/app6LGrkjX3FjxTwd/Movies ',{
        headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN} `,

    }

    });
    const data = await response.json();
    console.log('token: ', process.env.AIRTABLE_TOKEN)
    console.log('data: ', data)

    return NextResponse.json(data.records);

}