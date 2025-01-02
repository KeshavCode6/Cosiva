"use client"
import { useState, useEffect, useRef, RefObject } from "react";


interface IntersectionObserverOptions {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
}

export function useIntersectionObserver(
    ref: RefObject<HTMLElement | null>,
    { threshold = 0.1, root = null, rootMargin = "0px" }: IntersectionObserverOptions
): boolean {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold, root, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, threshold, root, rootMargin]);

    return isIntersecting;
}



export function AnimatedSection({ children, className }: { children?: React.ReactNode, className?:string}) {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } ${className}`}
        >
            {children}
        </div>
    );
}
