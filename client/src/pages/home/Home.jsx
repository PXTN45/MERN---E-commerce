import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Testimonials from './Testimonials'
import OurServices from './OurServices'
import SpecialProducts from './SpecialProducts'

const Home = () => {
  return (
    <div>
        <Banner />
        <Categories />
        <SpecialProducts />
        <Testimonials />
        <OurServices />
    </div>
  )
}

export default Home