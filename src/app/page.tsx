"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

enum MailState {
  "unsent",
  "successful",
  "failure",
}

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [mailState, setMailState] = useState(MailState.unsent);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => {
      data.json().then((resp) => {
        setIsLoading(false);
        console.log(resp.data, resp.error);
        if (resp.error) {
          setMailState(MailState.failure);
        } else {
          setMailState(MailState.successful);
        }

        setTimeout(() => {
          setMailState(MailState.unsent);
        }, 5000);
      });
    });
    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-4xl font-light text-white">Send Mail POC</div>
        <div className="text-lg font-extralight text-zinc-200">
          Powered by Resend, Next.js &amp; TypeScript
        </div>
      </div>
      <div className="w-full grow flex justify-center py-28">
        <div className="w-full max-w-[40rem] bg-zinc-800 px-14 py-10 rounded-lg max-h-[35rem]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-light text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("name", { required: true })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-light text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-light text-white"
              >
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Type your message"
                className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
                {...register("message", { required: true })}
              ></textarea>
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-purple-500 py-3 px-8 text-base font-semibold text-white outline-none min-w-40 flex justify-center">
                {isLoading ? (
                  <div className="w-6 aspect-square border-4 border-white border-b-0 border-r-0 rounded-full animate-spin"></div>
                ) : (
                  "Send Mail"
                )}
              </button>
            </div>
          </form>
          <div
            className={`text-lg text-center mt-5 ${
              mailState === MailState.successful ? "text-green-600" : ""
            } ${mailState === MailState.failure ? "text-red-600" : ""}`}
          >
            {mailState === MailState.successful && "Mail Sent Successfully"}
            {mailState === MailState.failure && "Could not Send Mail"}
          </div>
        </div>
      </div>
    </main>
  );
}
