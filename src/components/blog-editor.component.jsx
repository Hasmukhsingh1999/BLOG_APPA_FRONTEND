import { Link } from "react-router-dom";
import LOGO from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";

import { useState } from "react";



const BlogEditorComponent = () => {
    const [bannerUrl, setBannerUrl] = useState("");

  const handleBannerUpload = async(e) => {
  
  };
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={LOGO} className="w-10 flex-none" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>
        <div className="flex gap-4 ml-auto ">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="realative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={ bannerUrl ||
                    "https://images.unsplash.com/photo-1699594165148-0eb85ec79666?q=80&w=1791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="banner"
                  className="z-20"
                />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditorComponent;
