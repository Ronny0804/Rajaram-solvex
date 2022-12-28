import React from 'react'
import "../styles/about.css"
const About = () => {
  return (
    <>
<div>
  <section id="about" className="about">
    <div className="container" data-aos="fade-up">
      <div className="row justify-content-end">
        <div className="col-lg-11">
          <div className="row justify-content-end">
            <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
              <div className="count-box">
                <i className="bi bi-emoji-smile" />
                <span data-purecounter-start={0} data-purecounter-end={125} data-purecounter-duration={1} className="purecounter" />
                <p>Happy Clients</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
              <div className="count-box">
                <i className="bi bi-journal-richtext" />
                <span data-purecounter-start={0} data-purecounter-end={85} data-purecounter-duration={1} className="purecounter" />
                <p>Projects</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
              <div className="count-box">
                <i className="bi bi-clock" />
                <span data-purecounter-start={0} data-purecounter-end={35} data-purecounter-duration={1} className="purecounter" />
                <p>Lifelong Trust</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
              <div className="count-box">
                <i className="bi bi-award" />
                <span data-purecounter-start={0} data-purecounter-end={48} data-purecounter-duration={1} className="purecounter" />
                <p>Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 video-box align-self-baseline" data-aos="zoom-in" data-aos-delay={100}>
          <img src="assets1/about.jpg" className="img-fluid" alt />
          <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4" />
        </div>
        <div className="col-lg-6 pt-3 pt-lg-0 content">
          <h3>Rajaram Solvex Co-operative Credit Society Ltd.</h3>
          <p className="fst-italic">
          This is where we help you reach your true potential.
          </p>
          <ul>
            <li><i className="bx bx-check-double" /> Reliable and trustworthy</li>
            <li><i className="bx bx-check-double" /> Your first choice for monetary needs</li>
            <li><i className="bx bx-check-double" /> The Changing Face of Prosperity.</li>
            <li><i className="bx bx-check-double" /> Let us help you invest in your future.</li>
          </ul>
          <p>
          Rajaram Solvex Co-operative Credit Society Ltd. is registered under Maharashtra Co-operative Society Act 1960, established on 2nd September 1978.
          <br/> The Rajaram Solvex Limited is the local financial organization of Islampur. This organization mainly provides loans for local people including factory workers, farmers, and employees. This Financial Organization has 250 - 300 active accounts and shareholders.
          <br/>The organization provides financial services like Providing Safe Deposite Schemes, providing effective service of loan(Loans are offered to suit every individual's requirement based on their earnings, securities and repayment capacity) and providing the shares for the shareholders.   
          </p>
        </div>
      </div>
    </div>
  </section>{/* End About Section */}
  {/* ======= About Boxes Section ======= */}
  <section id="about-boxes" className="about-boxes">
    <div className="container" data-aos="fade-up">
      <div className="row">
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={100}>
          <div className="card">
            <img src="assets1/about-boxes-2.jpg" className="card-img-top" alt="..." />
            <div className="card-icon">
              <i className="ri-brush-4-line" />
            </div>
            <div className="card-body">
              <h5 className="card-title"><a href>Our Mission</a></h5>
              <p className="card-text">Bring the best of innovation and technology in our offerings.<br/>
Be responsive to the unique needs of every customer through all channels of choice </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={200}>
          <div className="card">
            <img src="assets1/about-boxes-3.jpg" className="card-img-top" alt="..." />
            <div className="card-icon">
              <i className="ri-calendar-check-line" />
            </div>
            <div className="card-body">
              <h5 className="card-title"><a href>Accounts</a></h5>
              <p className="card-text">We offers different type of accounts to meet your financial goals and secure your future. Choose from our wide range of deposit products that are specifically designed to keep your unique requirements in mind.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay={300}>
          <div className="card">
            <img src="assets1/about-boxes-1.jpg" className="card-img-top" alt="..." />
            <div className="card-icon">
              <i className="ri-movie-2-line" />
            </div>
            <div className="card-body">
              <h5 className="card-title"><a href>Our Vision</a></h5>
              <p className="card-text">“Delivering excellence in financial services through customer focus, employee engagement and sustainable growth.”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>


    </>


    // <div className='home-about'>
    //  <h1>About</h1>
    //  <p>Rajaram Solvex Co-operative Credit Society Ltd. is registered under Maharashtra Co-operative Society Act 1960, established on 2nd September 1978. To assist people in the society during their financial crisis, Mr. Vishwanath Govindrao Pawar came forth with a resolution – Rajaram Solvex Co-operative Credit Society Ltd., which was founded with 300 members and Rs. 13000 Share Capital...</p>
    //  <button>Know More</button>
    // </div>
  )
}

export default About