// Trong file Home.js

import Hero from './Hero';
import QA from './QA';
import FeatureSections from './FeatureSections'; 
// import AboutUs from './AboutUs';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureSections />
      
      {/* About Us Section */}
      <section className="col-span-2 p-4">
        {/* <AboutUs /> */}
      </section>

      {/* FAQ Section */}
      <section className="col-span-2 p-4">
        <QA />
      </section>
    </div>
  );
};

export default Home;
