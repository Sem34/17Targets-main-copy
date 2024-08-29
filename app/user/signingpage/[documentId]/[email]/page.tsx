"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

const DocumentIdPage = ({
    params
}: {
    params: { 
      documentId: string,
      email: string
    }
}
) => {
    const [buttonState, setButtonState] = useState<{
        text: string
      }>({
        text: "Перевірити підпис", // Початковий текст
      })
    
      const handleCheckSignature = async () => {
        try {
          const response = await axios.post("/api/checksignature", { documentId: params.documentId, email: params.email });
          console.log(response.data)
    
          if (response.data.result === true) {
            // Якщо підпис перевірено
            setButtonState({
              text: "Підпис перевірено",
            })
          } else {
            // Якщо підпис не пройшов перевірку
            setButtonState({
              text: "Спробуйте ще раз",
            })
          }
        } catch (error) {
          console.error(error)
          // У випадку помилки також можна змінити стиль або повідомити користувача
          setButtonState({
            text: "Помилка! Спробуйте ще раз",
          })
        }
      }

    return ( 
      <div>
        <div className="p-6">
            <Link href={ 'https://paperless.com.ua/uk/share/CjgZAQN5iBzPt-A_Ub8dqJEa0Gt1Z3l50fLeFZHxe0c' + params.documentId }>
                <Button
                    type="button"
                    variant="default"
                >
                    Переглянути документ
                </Button>
            </Link>

        </div>

        <div className="p-6">
            <Button
                    type="button"
                    variant="default"
                    onClick={handleCheckSignature}
            >
                    {buttonState.text}
            </Button>
        </div>

      </div>
                
    );
}
 
export default DocumentIdPage;