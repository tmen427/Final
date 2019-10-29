import React from "react";
import "./style.css";


function Nav() {
  return (

    <div>
      <header class="main-header dark-header fs-header sticky">
        <div class="header-inner">
        
           
            
   
          

            <div class="nav-holder main-menu">
              <nav >
                <ul>

                  <li>
                    <a href="/home">Home <span className="sr-only">(current)</span></a>

                  </li>
                  <li>
                    <a class="act-link" href="/saved">Recent Searches</a>
                  </li>

                  <li>
                    <a href="map.html">Map</a>

                  </li>

                  <li> <a href="/inputdata" >User Posts </a></li>
                  <li>
                  <a href="/login" >Sign In</a>   
                  </li>
                 

                </ul>
              </nav>
            </div>
          </div>
    </header>
</div>


      );
    }
    
    export default Nav;
