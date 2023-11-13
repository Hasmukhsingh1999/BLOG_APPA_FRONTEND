import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext } from "react";
import { EditorContext } from "../pages/editor.page";

const PublishForm = () => {
  let {
    setEditorState,
    blog: { banner, title, tags, des },setBlog,blog
  } = useContext(EditorContext);
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange= (e)=>{
    let input = e.target;
    setBlog()
  }
  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:Grid-cols-2 py-16 lg:gap-4">
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <AiOutlineCloseCircle />
        </button>
        <div className="max-w-[550px] center ">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="banner" />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {des}
          </p>
        </div>
        <div className="border-grey lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          />

          <p className="text-dark-grey mb-2 mt-9">
            Description about your Blog.
          </p>
          <input
            type="text"
            placeholder="Blog Title"
            defaultValue={title}
            className="input-box pl-4"
          />
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
