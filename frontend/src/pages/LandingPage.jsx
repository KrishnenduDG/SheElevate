import React from "react";


const LandingPage = () => {
  return (
    <div className=" bg-[#0c0526] h-[100vh] p-4 md:px-10 lg:px-20 grid gap-1">
      <h1 className="text-4xl font-semibold text-white font-serif ">
        Rise and Thrive : Empowering Women for a Brighter Tomorrow
      </h1>
      <div className=" text-2xl font-sans text-white flex flex-row justify-between  ">
        <div>
          <div>
            Empowering women by giving them an exposure to the world.<br />
            Uplifting their ideas,breaking barriers and fostering
            a supportive <br />community  where women can thrive,express themselves  and build
            <br />a brighter future for themselves and their families.
          </div>
          <div>
            <label className="container flex gap-2">
              <input checked="checked" type="checkbox" />

              <div className="checkmark"></div>

            <p>Creating a workspace for women to showcase their work</p>
            </label>
          </div>
        </div>
        <div>
          image
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
