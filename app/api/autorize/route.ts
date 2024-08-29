import { NextResponse } from "next/server";
import axios from "axios";
import { URLSearchParams } from "url";
import crypto from 'crypto';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const env = {
    id: '0c3be497-a5a4-4400-add1-fd258d51a0c6',
    secret: 'ODQxMWJjMGYtZWQ4YS00NWQwLThiNGYtMzUwYmVjZjQwYzc1'
}

export async function POST(
    req:Request
) {
    try {
      const { title, email } = await req.json();

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


      const filePath = path.join(process.cwd(), 'uploads', 'test.pdf');
      const fileContent = fs.readFileSync(filePath);
      const base64Data = fileContent.toString('base64');
    
      
      const form = new FormData();
      form.append('file', base64Data, { filename: `${title}.pdf`, contentType: 'multipart/form-data' });
    
      const uploadConfig = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://paperless.com.ua/api2/checked/upload',
          headers: {
            ...form.getHeaders(),
            'accept': 'application/json',
            'Cookie': `sessionId="Bearer ${tokenVale}, Id ${env.id}"`
          },
          data: form
      };
    
      const uploadResponse = await axios(uploadConfig);
      const fileId = uploadResponse.data.resourceDTO[0].id;

      console.log(tokenVale);
    
        // Share file
      const shareResponse = await axios.put(
          `https://paperless.com.ua/api2/checked/resource/shareall/${fileId}`,
          {},
          {
            headers: { 
              'Cookie': `sessionId="Bearer ${tokenVale}, Id ${env.id}"`
            }
          }
      );

      const shareEmail = await axios.post(
        `https://paperless.com.ua/api2/checked/share/${fileId}`,
        {requestList:[{email: email, comment:"Документ на підпис",mode:0}]},

        {
          headers: { 
            'Cookie': `sessionId="Bearer ${tokenVale}, Id ${env.id}"`
          }
        }
      )
      console.log(shareEmail.data)
    
      return NextResponse.json({
        url: shareResponse.data.url,
        fileId,
        email
      });

        
      
    } catch (error) {
        console.log("[AUTORIZE]", error);
        return new NextResponse("Internal error", { status: 500 })
    }
    
}