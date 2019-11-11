import React from "react";
import "./style.css";






function Nav() {


  function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0%";
  }




  return (
<div class="navigation">
          
<div id="mySidenav" class="sidenav">
<a href="javascript:void(0)" class="closebtn" onClick={()=>closeNav()}>&times; </a>
<hr></hr>
<a href="/home">Home</a>
<a href="/saved">Recent Searches</a>
<a href="map.html">Map</a>
<a href="/inputdata">User Posts</a>
<a href="/login">Log In</a>
<a href="/signup">Sign Up</a>

<hr></hr>
<a href="#"><i>MAPA</i></a>  
  </div>

  <div class='z'>
<span class="hamburger" onClick= {()=>openNav()}>&#9776; </span>
     </div>


</div>

      );
    }
    
    export default Nav;
