import React from "react";
import About from "../components/About";
import Accounts from "../components/Accounts";
import Contact from "../components/Contact";
import Foooter from "../components/Foooter";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Services />
      <Accounts />
      <Contact />
      <Foooter />
    </div>
  );
};

export default Home;
