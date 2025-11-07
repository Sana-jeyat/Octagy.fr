import React, { useState, useEffect } from "react";

const CourseViewerFromMoodle = () => {
  const [courseUrl, setCourseUrl] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split("?")[1]);
    const url = urlParams.get("url");
    setCourseUrl(url);
  }, []);

  if (!courseUrl) {
    return <p>URL du cours manquante</p>;
  }

  return (
    <iframe
      src={courseUrl}
      title="Cours"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
};

export default CourseViewerFromMoodle;
