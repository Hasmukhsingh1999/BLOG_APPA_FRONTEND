import axios from "axios";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByFile: async (file) => {
          try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
              "http://localhost:3000/api/upload",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            return {
              success: 1,
              file: {
                url: response.data.imageUrl,
              },
            };
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        },
      },
    },
  },

  header: {
    class: Header,
    config: {
      placeholder: "Type Heading....",
      levels: [2, 3],
      default: 2,
    },
  },
};
