import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext } from "react";
import { EditorContext } from "../pages/editor.page";
import Tag from "./tags.component";

const PublishForm = () => {
  const characterLimit = 200;
  let tagLimit = 10;
  let {
    setEditorState,
    blog: { banner, title, tags, des },
    setBlog,
    blog,
  } = useContext(EditorContext);
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleBlogTextareaChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, des: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }
      e.target.value = "";
    }
  };

  const publishBlog = (e) => {
    if (!title.length) {
      return toast.error("You must provide a title to publish the blog");
    }
    if (!des.length || des.length > 200) {
      return toast.error(
        "You must provide a blog description under 200 characters."
      );
    }

    if (!banner.length) {
      return toast.error("You must provide a blog banner to publish it");
    }
    // if (!content.blocks.length) {
    //   return toast.error("There must be some blog content to publish it.");
    // }

    if (!tags.length || tags.length > 10) {
      return toast.error(
        "Provide tags in order to publish the blog, Maximum 10"
      );
    }
  };
  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
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
          <textarea
            onKeyDown={handleTitleKeyDown}
            maxLength={characterLimit}
            defaultValue={des}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleBlogTextareaChange}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - des.length} characters left
          </p>
          <p>Topics - (Help in searching and ranking your blog Post)</p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topics"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handleKeyDown}
            />
            {tags.map((tag, i) => (
              <Tag tag={tag} key={i} tagIndex={i} />
            ))}
          </div>
          <p className="mt-1 mb-4 text=dark-grey text-right">
            {tagLimit - tags.length} Tags Left
          </p>
          <button className="btn-dark px-8" onClick={publishBlog}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
