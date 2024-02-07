import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Testimonials from './Testimonials'
import OurServices from './OurServices'

const Home = () => {
  return (
    <div>
        <Banner />
        <Categories />
        <Testimonials />
        <OurServices />
    </div>
  )
}

export default Home