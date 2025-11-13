import React from "react";

const RichTextToolbar = ({ execCommand, insertLink, insertImage }) => {
  return (
    <div className="overflow-x-auto border-b border-gray-200 bg-gray-50 p-3">
      <div className="flex min-w-max flex-wrap gap-2">
        <select
          onChange={(e) => execCommand("formatBlock", e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Style</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>

        <select
          onChange={(e) => execCommand("fontSize", e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Size</option>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>

        <div className="flex gap-1 border-l border-gray-300 pl-2">
          <button
            onClick={() => execCommand("bold")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Bold"
          >
            <span className="font-bold">B</span>
          </button>
          <button
            onClick={() => execCommand("italic")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Italic"
          >
            <span className="italic">I</span>
          </button>
          <button
            onClick={() => execCommand("underline")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Underline"
          >
            <span className="underline">U</span>
          </button>
          <button
            onClick={() => execCommand("strikeThrough")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Strikethrough"
          >
            <span className="line-through">S</span>
          </button>
        </div>

        <div className="flex gap-1 border-l border-gray-300 pl-2">
          <button
            onClick={() => execCommand("insertUnorderedList")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Bullet List"
          >
            ≡
          </button>
          <button
            onClick={() => execCommand("insertOrderedList")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Numbered List"
          >
            #
          </button>
          <button
            onClick={() => execCommand("indent")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Indent"
          >
            →
          </button>
          <button
            onClick={() => execCommand("outdent")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Outdent"
          >
            ←
          </button>
        </div>

        <div className="flex gap-1 border-l border-gray-300 pl-2">
          <button
            onClick={insertLink}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Insert Link"
          >
            🔗
          </button>
          <button
            onClick={insertImage}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Insert Image"
          >
            🖼️
          </button>
        </div>

        <div className="flex gap-1 border-l border-gray-300 pl-2">
          <button
            onClick={() => execCommand("justifyLeft")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Align Left"
          >
            ⇤
          </button>
          <button
            onClick={() => execCommand("justifyCenter")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Align Center"
          >
            ⇥
          </button>
          <button
            onClick={() => execCommand("justifyRight")}
            className="rounded-lg p-2 transition-colors hover:bg-blue-100"
            title="Align Right"
          >
            ⇥
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichTextToolbar;
