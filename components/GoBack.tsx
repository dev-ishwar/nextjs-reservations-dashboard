'use client';

import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GoBack = () => {
    const router = useRouter();

    return <button className="bg-transparent hover:bg-transparent cursor-pointer" title="Back" onClick={() => router.back()} aria-label="back"><CircleArrowLeft /></button>
}

export default GoBack;