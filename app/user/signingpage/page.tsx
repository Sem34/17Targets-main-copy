"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

const SigningPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            email: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/autorize", values);
            console.log(response.data)
            router.push(`/user/signingpage/${response.data.fileId}/${response.data.email}`)

        } catch  {
            toast.error("Трапилась помилка");
        }
        
    };

    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Назва організації
                </h1>
                <p className="text-sm text-slate-600">
                    Назва організації в реєстрі юр осіб
                </p>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Назва організації
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="наприклад ТОВ 'Рога і копита'"
                                            {...field}
                                        />                                        
                                    </FormControl>
                                    <FormDescription>
                                        Дані будуть вказані в договорі
                                    </FormDescription>
                                    <FormMessage
                                    />
                                </FormItem>
                                
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@example.com" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Сюди надійде лист з документом на підпис
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Відмінити
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Продовжити
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
     );
}
 
export default SigningPage;