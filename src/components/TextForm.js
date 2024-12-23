import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("TextArea Cleared", "success");
  };

  const handleCopy = () => {
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Text Copied", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra Spaces Removed", "success");
  };
  const handleExtraLines = () => {
    let newText = text.replace(/\n\s*\n/g, "\n"); // Remove extra newlines
    setText(newText); // Update the state
    props.showAlert("Extra lines removed", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  // New state variables to track selected words and characters
  const [selectedWords, setSelectedWords] = useState(0);
  const [selectedCharacters, setSelectedCharacters] = useState(0);

  const handleTextSelection = () => {
    const selection = window
      .getSelection()
      .toString()
      .trim();

    if (selection.length > 0) {
      const words = selection.split(/\s+/).filter((word) => word.length > 0)
        .length;
      const characters = selection.length;

      setSelectedWords(words);
      setSelectedCharacters(characters);
    } else {
      setSelectedWords(0);
      setSelectedCharacters(0);
    }
  };
  document.addEventListener("mouseup", handleTextSelection);

  const [text, setText] = useState(" ");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#041319" }}
      >
        <h2 className="mb-4">{props.heading}</h2>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#041319" : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}
            rows="7"
            value={text}
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to UpperCase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to LowerCase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraLines}
        >
          remove Extra Lines
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Coppy Text
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2>Your Text Summery</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          Words and {text.length} Characters
        </p>
        <p>
          {" "}
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes to read
        </p>
        {/* Display selected text information */}
        <h3>Selected Text Summary</h3>
        <p>
          {selectedWords} Selected Words and {selectedCharacters} Selected
          Characters
        </p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Nothing to Preview"}</p>
      </div>
    </>
  );
}
