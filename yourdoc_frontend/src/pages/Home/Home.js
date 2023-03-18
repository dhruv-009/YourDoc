import React from 'react';
import OurDoctors from '../OurDoctors';
import Footer from '../Footer';
import HomeQuote from '../HomeQuote';
import Mission from '../Mission';
import { Navbar } from '../../components/navbar';
import { HomeImage } from '../../components/HomeImage';

function Home() {
  return (
    <div className="bg-dark">
      <Navbar />
      <HomeImage />
      <Mission />
      <OurDoctors />
      <HomeQuote />
      <Footer />

    </div>
  );
}


export default Home;