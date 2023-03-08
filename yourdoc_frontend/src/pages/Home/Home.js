import React, { Component } from 'react';
import Homeimage from "../Homeimage"
import OurDoctors from '../OurDoctors';
import Footer from '../Footer';
import HomeQuote from '../HomeQuote';
import Mission from '../Mission';
import { Navbar } from '../../components/navbar';

function Home() {
    return (
        <div className="bg-dark">
            <Navbar />
            <Homeimage />
            <Mission />
            <OurDoctors />
            <HomeQuote />
            <Footer />

        </div>
    );
}


export default Home;