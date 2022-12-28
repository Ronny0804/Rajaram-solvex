import React from 'react'
import '../styles/account.css'
const Accounts = () => {
  return (
    <>
<section id="pricing" className="pricing">
  <div className="container">
    <div className="section-title">
      <h2>Accounts</h2>
      <p >We offers different type of accounts..</p>
    </div>
    <div className="row">
      <div className="col-lg-4 col-md-6">
        <div className="box">
          <h3>Saving Account</h3>
          <h4><i class='bx bx-droplet'></i></h4>
          <ul>
          <li>No hidden costs</li>
            <li>Eligible for debit cards</li>
            <li>Earn Intrest</li>
            <li>Multiple Withdrawal options</li>
            <li>Internert Banking access</li>
          </ul>
          <div className="btn-wrap">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdHP3hiREqqSjD2GO9S_7YehSccfyaDFvd_hl90koT8zbMIjQ/viewform?usp=sf_link" className="btn-buy">Open Now</a>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
        <div className="box recommended">
         
          <h3>Current Account</h3>
          <h4><i className='bx bx-check-square'></i></h4>
          <ul>
            <li>Interest Banking</li>
            <li>Missed call facility</li>
            <li>Debit/ATM card</li>
            <li>Vyapar Card</li>
            <li>Bharat QR code</li>
          </ul>
          <div className="btn-wrap">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdHP3hiREqqSjD2GO9S_7YehSccfyaDFvd_hl90koT8zbMIjQ/viewform?usp=sf_link" className="btn-buy">Open Now</a>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
        <div className="box">
          <h3>Fixed Deposit</h3>
          <h4><i class='bx bx-check-shield'></i></h4>
          <ul>
            <li>Loan/overdraft available</li>
            <li>Fixed income every month</li>
            <li>Auto renewal option available</li>
            <li>Benefit to senior citizens</li>
            <li>No TDS</li>
          </ul>
          <div className="btn-wrap">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfKCF80gHNPUEuc_UHzOxCHCmmTA7Dw5Bu4fR_7_0rt84DMog/viewform?usp=sf_link" className="btn-buy">Open Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Accounts