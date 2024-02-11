import React from 'react'

const Footer = () => {
  return (
    <div className="mt-20">
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside>
          <img src="/logo.png" alt="" className="h6 lg:h-24 pr-1 mx-auto"/>
        <p>
          Our Misson: To Merge
          <br />
          Fastion with
          <br />
          Functionality in the
          <br />
          World of software
          <br />
          Engineering!
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">USEFUL LINKS</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Event</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  </div>
  )
}

export default Footer