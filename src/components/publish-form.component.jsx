import { Toaster, toast } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext } from "react";
import { EditorContext } from "../pages/editor.page";

const PublishForm = () => {
  let { setEditorState } = useContext(EditorContext);
  const handleCloseEvent = () => {
    setEditorState("editor");
  };
  return (
    <AnimationWrapper>
      <section>
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <AiOutlineCloseCircle />
        </button>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
