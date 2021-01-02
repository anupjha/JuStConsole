import React from "react";
import SplitLayout from "./split-content/SplitLayout";
import Editor from "./Editor";
import Console from "./Console";
import Browser from "./Browser";

export default class Layout extends React.Component {
  state = {
    history: [],
    js: "",
    isProcessing: false, // tiny way to stop a user from hitting run 10000 times in a row
  };
  // helpers cuz lazy
  setHistory = (history) => this.setState({ history });
  setJs = (js) => this.setState({ js });
  addHistory = (text) => {
    const newHistory = [...this.state.history, { text }];
    this.setHistory(newHistory);
  };

  clearHistory = () => this.setHistory([]);
  /**
   * Since our browser only runs when code is changed, we set things to blank and then reset them
   * TODO: Probably a better way to do this than the setTimeout()
   */
  runCode = () => {
    if (this.state.isProcessing) return false;
    this.setState({ isProcessing: true });

    const { js } = this.state;
    this.setJs("");

    setTimeout(() => {
      this.setJs(js);
      this.setState({ isProcessing: false });
    }, 250);
  };

  render() {
    const { history, js } = this.state;
    return (
      <React.Fragment>
        <Browser
          playgroundId={"playgroundId"}
          js={js}
          addHistory={this.addHistory}
        />

        <SplitLayout primaryMinSize={400} secondaryMinSize={400}>
          <div className="my-pane">
            <button onClick={this.runCode}>Run</button>
            <Editor language="javascript" code={js} updateCode={this.setJs} />
          </div>
          <div className="my-pane">
            <Console history={history} clearHistory={this.clearHistory} />
          </div>
        </SplitLayout>
      </React.Fragment>
    );
  }
}
