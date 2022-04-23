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
  const [value, setValue] = useState("**Hello world xx!!!**");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/posts/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:'test', value}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('POST: ', JSON.stringify(data));
  };
  return (
    <>
    <Button onClick={onSubmit}>Save</Button>
    <div data-color-mode="dark" className="max-h-[80%]">
      <MDEditor value={value}  />
      <div>{value}</div>
    </div>
    </>
  );
}

export default Editor;

