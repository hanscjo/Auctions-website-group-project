import React from 'react';
import './AboutUs.css';
import Header from '../Header/Header';

const aboutus = (props) => (
  <div className="aboutus">
  <Header />
  <div className="aboutUsContainer">
    <div className="aboutUsContainerBox1">
      <h1>Om oss</h1>
      <p>Bud Bua AS er norges eldste og største auksjonsselskap ble stiftet i 1869. Vi har nå har bestemt oss for å gå digitalt. Bud Bua AS søker flinke studenter til å lage norges beste auksjonsapplikasjon. Applikasjon skal være intuitiv og sikker å bruke. Bud Bua AS har nå også ekspandert veldig de siste årene og har nå behov for bedre oversikt over bruken av applikasjon. Vi må være konkurransedyktige og ønsker derfor ha funksjonaliteter våre konkurenter også har. Fra erfaring i auksjonsmarkedet har vi merket at det er mange som prøver å lure kjøpere og selgere, så vi må ha en måte å hindre dette på.</p>
    </div>
  <div className="aboutUsContainerBox2">
    <h1>Hva vi gjør</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in mauris sed nunc fringilla viverra dictum vel felis. Nam semper, sem in rutrum ultricies, justo justo pharetra nibh, ac elementum ligula lectus in tellus. Vestibulum risus lacus, condimentum sed accumsan et, gravida sit amet nisi. Morbi quis velit porttitor, pretium ipsum sit amet, tempor enim. Sed in sapien mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam dignissim dolor ac nibh hendrerit rhoncus. Aenean bibendum porta ante, vel facilisis turpis sollicitudin quis. Sed tempus diam tortor, vitae aliquam odio ultrices ut. Donec ut mauris nunc. 
    </p>
    <p>
    Ut purus odio, vulputate interdum gravida a, fringilla efficitur quam. Integer vestibulum fringilla enim eu molestie. Etiam scelerisque dui non quam convallis viverra. Nam aliquam orci semper mollis ultrices. Vivamus sit amet iaculis risus, et semper odio. Aenean in porttitor massa. Maecenas pharetra odio velit, in placerat mi lacinia ac. Fusce diam nulla, feugiat sed elit sed, sollicitudin semper quam. Suspendisse magna mauris, porta non dolor sed, bibendum laoreet orci. Suspendisse condimentum blandit nunc id convallis. Proin scelerisque sit amet justo et scelerisque.
    </p>
  </div>
  </div>
  </div>
);


export default aboutus;