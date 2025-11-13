import React from "react";

const EditorContent = ({ editorRef, isPreview }) => {
  return (
    <div className="p-6">
      {isPreview ? (
        <div
          className="prose min-h-[500px] max-w-none"
          dangerouslySetInnerHTML={{
            __html: editorRef.current?.innerHTML || "",
          }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[500px] rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{ border: "1px solid #e5e7eb" }}
          suppressContentEditableWarning
        />
      )}
    </div>
  );
};

export default EditorContent;
