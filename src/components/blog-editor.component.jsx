import { Link, useNavigate } from "react-router-dom";
import LOGO from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import blogImg from "../imgs/banner.jpg";
import { EditorContext } from "../pages/editor.page";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import { UserContext } from "../App";

const BlogEditorComponent = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  let navigate = useNavigate();
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  useEffect(() => {
    setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: content,
        tools: tools,
        placeholder:
          "Embark on a captivating journey through our tale of wonder and intrigue.",
      })
    );
  }, []);

  const handleBannerUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        let loadingToast = toast.loading("Uploading...");
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_DOMAIN}/api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.dismiss(loadingToast);
        toast.success("Uploaded");
        console.log(response.data);

        const imageUrl = URL.createObjectURL(file);

        // Set the banner property of the blog object to the imageUrl
        setBlog({ ...blog, banner: imageUrl });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error("Please upload a blog banner before publishing.");
    }
    if (!title.length) {
      return toast.error("Please write a blog banner before publishing.");
    }
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            return toast.error(
              "Please provide something to the field before publishing."
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("You must provide a title to publish the blog");
    }

    let loadingToast = toast.loading("Saved Draft");
    e.target.classList.add("disable");
    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          des,
          content,
          tags,
          draft: true,
        };

        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Saved");
            setTimeout(() => {
              navigate("/");
            }, 500);
          })
          .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            return response.error(response.data.error);
          });
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img src={LOGO} className="w-10 flex-none" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title ?? "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto ">
          <button className="btn-dark py-2" onClick={handlePublishEvent}>
            Publish
          </button>
          <button className="btn-light py-2" onClick={handleSaveDraft}>
            Save Draft
          </button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px]  h-[20vh] w-full">
            <div className="realative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <form>
                <label htmlFor="uploadBanner">
                  <img src={banner || blogImg} alt="banner" className="z-20" />
                  <input
                    id="uploadBanner"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleBannerUpload}
                  />
                </label>
              </form>
            </div>
            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
              defaultValue={title}
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditorComponent;
