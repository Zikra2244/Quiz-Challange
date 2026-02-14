import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import Container from "../ui/Container/Container";

const Layout = () => {
  const location = useLocation();

  const fullWidthPages = ["/", "/quiz"];
  const isFullWidth = fullWidthPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-dark-400">
      <Header />

      <AnimatePresence mode="wait">
        <main key={location.pathname} className="flex-grow">
          {isFullWidth ? (
            <Outlet />
          ) : (
            <Container className="py-8 md:py-12">
              <Outlet />
            </Container>
          )}
        </main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default React.memo(Layout);
