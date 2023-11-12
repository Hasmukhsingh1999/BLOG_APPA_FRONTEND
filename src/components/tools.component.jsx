import axios from 'axios';
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
    const response = await axios.post(
      'http://localhost:3000/api/upload', // Replace with your server endpoint
      { url },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Image successfully uploaded:', response.data);

    return {
      success: 1,
      file: { url: response.data.imageUrl }, // Adjust the response structure based on your server's API
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
