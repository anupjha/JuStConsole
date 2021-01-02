import React, { Component } from "react";
import debounce from "lodash.debounce";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "./Editor.css";
require("codemirror/mode/javascript/javascript");
require("codemirror/theme/material-darker.css");

export default class Editor extends Component {
  state = { value: this.props.code };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.code !== this.props.code)
      this.setState({ value: this.props.code });
  }

  handleChange = (editor, data, value) => {
    this.setState({ value });
    this.debouncedUpdate(value);
  };

  debouncedUpdate = debounce((value) => {
    this.props.updateCode(value);
  }, 500);

  render() {
    const { value } = this.state;
    const options = {
      lineNumbers: true,
      autoCloseTags: true,
      cursorScrollMargin: 48,
      matchBrackets: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      smartIndent: true,
      mode: "javascript",
      indentUnit: 2,
      styleActiveLine: true,
      viewportMargin: 99,
      tabSize: 2,
      theme: "material-darker",
    };

    return (
      <div className="playground-editor">
        <CodeMirror
          value={value}
          onBeforeChange={this.handleChange}
          options={options}
          onChange={(editor, data, value) => {}}
        />
      </div>
    );
  }
}
