'use client';
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ModeToggle = dynamic(() => import('@/components/theme-mode-toggle'), { ssr: false });

type PropsType = {
    children: React.ReactElement
}

const RootTemplate = ({ children }: PropsType) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return children;

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ModeToggle />
            {children}
        </ThemeProvider>
    )
}

export default RootTemplate;