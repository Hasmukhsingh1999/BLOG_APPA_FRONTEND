//importing tools

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
  quote: Quote,
  marker: Marker,
  inlineCode: InlineCode,
  image: Image,
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading....",
      levels: [2, 3],
      default:2,
    },
  },
};
