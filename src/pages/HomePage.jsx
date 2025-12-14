import React, { useState } from "react";
import { HeroSection } from "../components/organisms/HeroSection";
import { EditorSection } from "../components/organisms/EditorSection";
import { Header } from "../components/organisms/Header"; // Header выносим сюда, чтобы он был общим

export const HomePage = () => {
  const [editorData, setEditorData] = useState(null);

  return (
    <div className="min-h-screen bg-[#101012]">
      {/* Хедер виден всегда */}
      <Header />

      {/* Условный рендеринг */}
      {!editorData ? (
        <HeroSection onDataReceived={setEditorData} />
      ) : (
        <EditorSection data={editorData} />
      )}
    </div>
  );
};