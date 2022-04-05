import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import {Button} from '../components/base';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

function Editor() {
  const [value, setValue] = useState("**Hello world!!!**");
  const saveData =()=>{
    
  }
  return (
    <>
    <Button onClick={saveData}>Save</Button>
    <div data-color-mode="dark">
      <MDEditor value={value} onChange={setValue} />
      <div>{value}</div>
    </div>
    </>
  );
}

export default Editor;

