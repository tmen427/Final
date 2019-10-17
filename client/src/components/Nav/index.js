import React from "react";
import "./style.css";


function Nav() {
  return (

    <div>
      <header class="main-header dark-header fs-header sticky">
        <div class="header-inner">
        
            <a href="/inputdata" class="add-list">User Posts<span><i class="fa fa-plus">+</i></span></a>
            
            <a href="/login" class="show-reg-form modal-open"><i class="fa fa-sign-in" href="/login" ></i>Sign In</a>
            <div class="nav-button-wrap color-bg">
              <div class="nav-button">
                <span></span><span></span><span></span>
              </div>
            </div>

            <div class="nav-holder main-menu">
              <nav>
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

                </ul>
              </nav>
            </div>
          </div>
    </header>
</div>


      );
    }
    
    export default Nav;
