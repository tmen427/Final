import React from "react";
import "./style.css";

function Footer(){
    return(
        <div>
        
        <footer>
            <text className="copyright">copyright &copy; <span style={{color: "grey"}}>MA</span><span style={{color: "red"}}>PA</span></text>
            <a className="gitlink" href="https://github.com/pith0n/Crowd-Source">
            <img className="github" src={ require("./img/GitHub.png")}/>
            </a>
        </footer>
        </div>
    )
}
export default Footer;

