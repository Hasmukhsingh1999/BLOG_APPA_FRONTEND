import { createContext, useContext, useState } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import BlogEditorComponent from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personalInfo: {} },
};

export const EditorContext = createContext({});

const EditorPage = () => {
  const [blog, setBlog] = useState(blogStructure);

  const [editorState, setEditorState] = useState("editor");

  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState }}
    >
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : editorState === "editor" ? (
        <BlogEditorComponent />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default EditorPage;
