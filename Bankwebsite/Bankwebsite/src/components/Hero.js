import React from 'react'
import { Link } from 'react-router-dom'
import mob1 from '../assets/mob1.png'
import '../styles/hero.css'
const Hero = () => {
  return (

    <section className='hero'>
        <div className='hero-text'>
          <h1>An easier <br/> Responsile <br/> <span>Banking</span></h1>
          <p>Saving and investing are made simple.</p>
          <div className="btns">
            <button>Know More</button>
            <Link to='/emi-calculator'><button>EMI</button></Link>
            
          </div>
        </div>
        <div className='hero-img'>
            <img src={mob1} alt="mobile" />
        </div>
    </section>
  )
}

export default Hero


/* <section id="hero">
    <div class="hero-container" data-aos="fade-up" data-aos-delay="150">
      <h1>Plan. Launch. Grow.</h1>
      <h2>We are team of talented designers making websites with Bootstrap</h2>
      <div class="d-flex">
        <a href="#about" class="btn-get-started scrollto">Get Started</a>
        <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
      </div>
    </div>
  </section> */

   