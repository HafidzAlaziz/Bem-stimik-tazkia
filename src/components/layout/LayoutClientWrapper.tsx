"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const showElement = (el: Element) => el.classList.add("is-visible");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeAll = () => {
      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If already visible in viewport, show immediately
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          showElement(el);
        } else {
          observer.observe(el);
        }
      });
    };

    observeAll();
    const timer = setTimeout(observeAll, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      <LoadingScreen />
      {!isLoginPage && <Navbar />}
      <main className={isLoginPage ? "" : "flex-1 flex flex-col"}>
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </>
  );
}
