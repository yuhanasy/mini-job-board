"use client";

import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";
import rehypeSanitize from "rehype-sanitize";

const TextEditor = ({ defaultValue }: { defaultValue?: string }) => {
  console.log({ defaultValue });
  const [value, setValue] = useState(() => defaultValue || "");
  console.log({ value });

  const handleChange = (value?: string) => {
    setValue(value || "");
  };

  return (
    <>
      <MDEditor
        data-color-mode="light"
        value={value}
        onChange={handleChange}
        textareaProps={{
          name: "description",
          placeholder: "Job details, requirements, etc",
        }}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.group(
            [
              commands.title1,
              commands.title2,
              commands.title3,
              commands.title4,
              commands.title5,
              commands.title6,
            ],
            {
              name: "title",
              groupName: "title",
              buttonProps: { "aria-label": "Insert title" },
            }
          ),
          commands.divider,
          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
        ]}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </>
  );
};

export default TextEditor;
