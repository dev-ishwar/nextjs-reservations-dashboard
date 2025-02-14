import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid place-content-center font-medium text-xl min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-center gap-2 border rounded-4xl px-4 py-3 animate-bounce transition-all ">
        <Link href={'/dashboard'} >GO TO DASHBOARD</Link>
        <ArrowRight />
      </div>
      <div className="flex gap-3">
        <p className="size-2 bg-amber-100 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-300 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-400 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-500 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-600 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-700 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-800 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-900 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-800 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-700 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-600 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-500 rounded-full animate-bounce"></p>
        <p className="size-2 bg-amber-200 rounded-full animate-bounce"></p>
      </div>
    </div>
  );
}