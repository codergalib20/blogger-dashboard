import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import toast, { Renderable, Toaster } from 'react-hot-toast';
import TextareaAutosize from "react-textarea-autosize";

interface PropsTypes {
  setMarkdownContent: (arg0: string) => void;
  markdownContent: string;
  setPreview: any;
  preview: boolean;
}

interface DataTypes {
  name?: string;
  title?: string;
  meta_title?: string;
  meta_description?: string;
  topic?: string;
  meta_keywords: string;
  slug?: string;
}

export default function MarkdownTextarea({
  markdownContent,
  setMarkdownContent,
  preview,
  setPreview,
}: PropsTypes) {
  const [data, setData] = useState<DataTypes | any>({ topic: "Python" });
  const [fields, setFields] = useState(false);
  const [postLoad, setPostLoad] = useState(false)

  const handleChange = (e: any) => {
    setMarkdownContent(e.target.value);

  };

  const handleFieldChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  const { name, meta_title, meta_description, topic, meta_keywords, slug } =
    data || {};

  const handleSubmitDoc = (e: any) => {

    if (name && meta_title && meta_description && topic && meta_keywords && slug && markdownContent) {
      setPostLoad(true)
      toast.promise(
        axios.post("/api/v1/doc", {
          ...data,
          content: markdownContent,
        }),
        {
          loading: 'Sending post request...',
          success: (response: AxiosResponse) => {
            // Do something with the response if needed
            setPostLoad(false)
            return 'Post request successful!';

          },
          error: (error) => {
            console.error(error);
            setPostLoad(false)
            return 'Error occurred during post request!';
          },
        }
      );



    } else {
      toast.error("Please input data")
    }

  };


  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <h4 className="my-2 font-bold text-3xl">Share you pure <span className=" text-sky-700 font-extrabold   uppercase">creativity</span></h4>
      <div className="  p-2 mt-2 mb-6 border-2 border-amber-600">
        <button
          onClick={() => setFields(!fields)}
          className="shadow shadow-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 transition duration-200 mr-2"
        >
          {fields ? "Hide Fields" : "Show Fields"}
        </button>
        <button
          onClick={() => setPreview(!preview)}
          className="shadow shadow-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 transition duration-200 mr-2"
        >
          {preview ? "Hide Markdown" : "Preview Markdown"}
        </button>
        <button
          onClick={handleSubmitDoc}
          disabled={postLoad ? true : false}
          className="shadow shadow-sky-600 bg-transparent border border-sky-600 hover:bg-sky-600 transition duration-200 mr-2"
          type="submit"
        >
          Submit
        </button>
      </div>

      <div className={`${!fields ? "flex" : "block"}`}>


        {fields && (
          <div >
            <fieldset className="mb-6 px-2">
              <div className="flex gap-x-2">
                {/* Section or Doc sort Name */}
                <input
                  required
                  name="name"
                  value={name}
                  onChange={handleFieldChange}
                  type="text"
                  className="border-2 outline-none border-sky-600 w-full py-1 px-2  rounded-md bg-slate-950  focus:underline-none focus:border-sky-400"
                  placeholder="Doc sort Name"
                />
                {/* Select languages */}
                <select
                  required
                  onChange={handleFieldChange}
                  name="topic"
                  value={topic}
                  className="border-2 outline-none border-sky-600 w-full py-1 px-2  rounded-md bg-slate-950  focus:underline-none focus:border-sky-400 "
                >
                  <option className="py-2" value="Python">
                    Python
                  </option>
                  <option className="py-2" value="Javascript">
                    Javascript
                  </option>
                  <option className="py-2" value="Typescript">
                    Typescript
                  </option>
                  <option className="py-2" value="Golang">
                    Golang
                  </option>
                  <option className="py-2" value="C++">
                    C++
                  </option>
                  <option className="py-2" value="C#">
                    C#
                  </option>
                  <option className="py-2" value="C">
                    C
                  </option>
                </select>
              </div>
            </fieldset>
            {/* SEO */}
            <fieldset className="mb-6 pb-0 px-2">
              <input
                required
                type="text"
                name="meta_title"
                value={meta_title}
                onChange={handleFieldChange}
                placeholder="Enter you meta title"
                className="border-2 outline-none border-sky-600 w-full py-1 px-2  rounded-md bg-slate-950  focus:underline-none focus:border-sky-400 "
              />
              <input
                required
                type="text"
                name="slug"
                value={slug}
                onChange={handleFieldChange}
                placeholder="Enter you slug "
                className="border-2 outline-none border-sky-600 w-full py-1 px-2  rounded-md bg-slate-950  focus:underline-none focus:border-sky-400 "
              />
              <textarea
                required
                name="meta_description"
                value={meta_description}
                rows={5}
                onChange={handleFieldChange}
                placeholder="Enter you meta description"
                className="border-2 outline-none border-sky-600 w-full py-1 px-2  rounded-md bg-slate-950  focus:underline-none focus:border-sky-400 "
              ></textarea>
              <textarea
                required
                name="meta_keywords"
                value={meta_keywords}
                rows={5}
                onChange={handleFieldChange}
                placeholder="Enter you meta keywords"
                className="border-2 outline-none border-sky-600 w-full py-1 px-2  rounded-md bg-slate-950  focus:underline-none focus:border-sky-400 "
              ></textarea>
            </fieldset>
          </div>
        )}




        {/* markdown writer */}
        {!preview && (
          <TextareaAutosize
            className="textbox py-3 px-2 min-h-[300px] w-full bg-[#333] border-2   hover:border-[#666] text-lg focus:outline-none"
            value={markdownContent}
            onChange={handleChange}
            placeholder="Start typing your Markdown here..."
          />
        )}


      </div>




    </div>
  );
}
// function setMarkdownContent(value: any) {
//   throw new Error("Function not implemented.");
// }
