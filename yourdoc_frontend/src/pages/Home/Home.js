import React, { useEffect } from 'react';
import OurDoctors from '../OurDoctors';
import Footer from '../Footer';
import HomeQuote from '../HomeQuote';
import Mission from '../Mission';
import { Navbar } from '../../components/nav-bar';
import { HomeImage } from '../../components/HomeImage';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [cookie] = useCookies(["session"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookie.session) {
      navigate('/profile');
    }
  }, []);
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