//importing tools

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

const uploadImageByURL = async (url) => {
    console.log('Attempting to upload image from URL:', url);
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const blob = await response.blob();
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        console.log('Image successfully uploaded:', file);
        return {
            success: 1,
            file: { url: URL.createObjectURL(file) },
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: 0,
            file: { url: '' }, // Set a placeholder URL or handle the error accordingly
        };
    }
  };
  

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
        uploadByUrl: uploadImageByURL,
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
