import React from 'react'
import Header from './components/ui/Header';
import Hero from './components/Hero';
import Catagory from './components/Catagory';
import MostSearchedItem from './components/mostSearchedCycle';
import InfoSection from './components/infoSection';
import Footer from './components/Footer';

function Home() {
  return (
    <div>
      {/* header */}
      <Header/>
      {/* hero */}
      <Hero/>
      {/* Catagory  */}
      <Catagory/>
      {/* Most searched car  */}
      <MostSearchedItem/>
      {/* InfoSection  */}
      <InfoSection/>
      {/* Footer  */}
      <Footer/>
    </div>
  )
}

export default Home;


