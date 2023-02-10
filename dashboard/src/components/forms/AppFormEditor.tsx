import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormikContext } from "formik";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useDebounce } from "use-debounce";

export default function AppFormEditor({ name }) {
  const { setFieldValue, values } = useFormikContext();

  const [editorState, seteditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentBlock = htmlToDraft(values[name]);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      seteditorState(editorState);
    }
  }, []);

  const [html] = useDebounce(editorState, 1000);

  useEffect(() => {
    const htm = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    setFieldValue(name, htm);
  }, [html]);

  return (
    <div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor mt-0 mb-0 markdown px-3"
        onEditorStateChange={(e: any) => {
          seteditorState(e);
        }}
      />
    </div>
  );
}
