import '../styles/footer.css';
import React from 'react';
import discord_img from "../images/discord.png";
import twitter_img from "../images/twitter.png";
import candle from "../images/candle.png";

function Footer() {
return <div className="footer">
<div className="social-links">
    <a href="https://twitter.com/cultnfts"><img src={candle} alt="twitter"/></a>
  </div>
  <div><p>CULT NFTs 2022</p></div>
</div>
}
export default Footer;