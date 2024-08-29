import { NextResponse } from "next/server";
import axios from "axios";
import { URLSearchParams } from "url";
import crypto from 'crypto';

const env = {
    id: '0c3be497-a5a4-4400-add1-fd258d51a0c6',
    secret: 'ODQxMWJjMGYtZWQ4YS00NWQwLThiNGYtMzUwYmVjZjQwYzc1'
}

export async function POST(
    req:Request
) {
    try {
      const { documentId, email } = await req.json();

      const decodedEmail = email ? decodeURIComponent(email as string) : ''

      const getCode = async () => {
        const params = new URLSearchParams({
          response_type: 'code',
          agentCheck: 'true',
          client_id: env.id
        });
    
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://paperless.com.ua/PplsService/oauth/authorize',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Accept': 'application/json'
          },
          data: params.toString()
        };
    
        const response = await axios(config);
        if (response.data.state === 'ok') {
          return response.data.code;
        }
      };

      const code = await getCode();
    
      const getToken = async (code: string) => {
        const secretHash = crypto.createHash('sha512')
          .update(env.id + env.secret + code)
          .digest('hex');
    
        const params = new URLSearchParams({
          'grant_type': 'authorization_code',
          'client_id': env.id,
          'client_secret': secretHash,
          'code': code
        });
    
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://paperless.com.ua/PplsService/oauth/token',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Accept': 'application/json'
          },
          data: params.toString()
        };
    
        const tokenResponse = await axios(config);
        const token = tokenResponse.data.access_token;
        return token;
      }
      
      const tokenVale =  await getToken(code);

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://paperless.com.ua/api2/checked/resource/${documentId}`,
        headers: { 
          'Cookie': `sessionId="Bearer ${tokenVale}, Id ${env.id}"`, 
          'Accept': 'application/json'
        }
      }

      const response = await axios(config);

      console.log(response.data);
      console.log(decodedEmail);
      console.log(response.data.shares?.[decodedEmail])

      if (response.data.shares?.[decodedEmail] === 3 ) {
        return NextResponse.json({
            status: 200,
            result: true
        });
      } else {
        return NextResponse.json({
            status: 200,
            result: false
        });
      }

        
      
    } catch (error) {
        console.log("[AUTORIZE]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
    
}