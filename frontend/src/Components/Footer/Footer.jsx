import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div  className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis inventore consequuntur velit vel tempore iste atque eius, necessitatibus molestiae quisquam soluta numquam odit quibusdam? Cupiditate velit vel voluptatem. Doloribus, ea?</p>

                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                       <li>Home</li>
                       <li>About Us</li>
                       <li>Delivery</li>
                       <li>Privacy policy</li>
                    </ul>
                </div>

                <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            
                            <li>+94 76 333 6479</li>
                            <li>contact@tomato.com</li>
                        </ul>
                </div>
            </div>
           
        
        <hr />
        <p className="footer-copy-right">
            Copyright 2025 © Tomato.com All rights reserved.
        </p>
    </div>
  )
}

export default Footer