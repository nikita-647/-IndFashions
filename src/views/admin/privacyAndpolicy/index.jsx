import React, { useState, useRef, useEffect } from "react";
import RichTextToolbar from "./components/RichTextToolbar";
import EditorContent from "./components/EditorContent";
import ActionsPanel from "./components/ActionsPanel";
import VersionHistory from "./components/VersionHistory";
import QuickTips from "./components/QuickTips";

const PrivacyAndPolicy = () => {
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [savedVersions, setSavedVersions] = useState([]);
  const [currentVersion, setCurrentVersion] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    loadSavedVersions();
  }, []);

  const loadSavedVersions = async () => {
    try {
      const keys = await window.storage.list("privacy_policy:");
      if (keys && keys.keys) {
        const versions = await Promise.all(
          keys.keys.map(async (key) => {
            try {
              const result = await window.storage.get(key);
              return result ? JSON.parse(result.value) : null;
            } catch {
              return null;
            }
          })
        );
        setSavedVersions(
          versions
            .filter((v) => v !== null)
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      }
    } catch (error) {
      console.log("No saved versions found");
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = async () => {
    const version = {
      id: Date.now(),
      content: editorRef.current?.innerHTML || "",
      timestamp: Date.now(),
      date: new Date().toLocaleString(),
    };

    try {
      await window.storage.set(
        `privacy_policy:${version.id}`,
        JSON.stringify(version)
      );
      setSavedVersions([version, ...savedVersions]);
      setCurrentVersion(version.id);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save. Please try again.");
    }
  };

  const loadVersion = async (id) => {
    try {
      const result = await window.storage.get(`privacy_policy:${id}`);
      if (result) {
        const version = JSON.parse(result.value);
        if (editorRef.current) {
          editorRef.current.innerHTML = version.content;
        }
        setCurrentVersion(id);
      }
    } catch (error) {
      console.error("Failed to load version");
    }
  };

  const deleteVersion = async (id) => {
    if (window.confirm("Are you sure you want to delete this version?")) {
      try {
        await window.storage.delete(`privacy_policy:${id}`);
        setSavedVersions(savedVersions.filter((v) => v.id !== id));
        if (currentVersion === id) {
          setCurrentVersion(null);
          if (editorRef.current) {
            editorRef.current.innerHTML = "";
          }
        }
      } catch (error) {
        alert("Failed to delete version");
      }
    }
  };

  const exportHTML = () => {
    const html = editorRef.current?.innerHTML || "";
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `privacy_policy_${
      new Date().toISOString().split("T")[0]
    }.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importHTML = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (editorRef.current) {
          editorRef.current.innerHTML = event.target?.result || "";
        }
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = () => {
    const html = editorRef.current?.innerHTML || "";
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const insertImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      execCommand("insertImage", url);
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                  Privacy Policy Editor
                </h1>
                <p className="text-sm text-gray-500">
                  Ind Fashions - Content Management
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                <span className="hidden sm:inline">Save</span>
              </button>
              <button
                onClick={togglePreview}
                className="flex items-center gap-2 rounded-lg border-2 border-blue-500 bg-white px-4 py-2 text-blue-600 transition-all hover:bg-blue-50"
              >
                {isPreview ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
                <span className="hidden sm:inline">
                  {isPreview ? "Edit" : "Preview"}
                </span>
              </button>
            </div>
          </div>
          {showSuccess && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Policy saved successfully!</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Editor Section */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg">
              {!isPreview && (
                <RichTextToolbar
                  execCommand={execCommand}
                  insertLink={insertLink}
                  insertImage={insertImage}
                />
              )}
              <EditorContent editorRef={editorRef} isPreview={isPreview} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ActionsPanel
              exportHTML={exportHTML}
              importHTML={importHTML}
              copyToClipboard={copyToClipboard}
              copied={copied}
            />
            <VersionHistory
              savedVersions={savedVersions}
              currentVersion={currentVersion}
              loadVersion={loadVersion}
              deleteVersion={deleteVersion}
            />
            <QuickTips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
