import React from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "./app.scss";

marked.setOptions({
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },

  breaks: true,
});

const previewText = `# Welcome to My React Markdown Previewer

## Below are some examples 

### Link: [Github Profile](https://github.com/okputu-e)

\`Inline code var myName = "Okputu"\`

\`\`\`
Block code
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\`

- Unordered List
- one
- two

1. Ordered List
2. two
3. three

> blockquote 

**bold text**

*italicized text*


![Example](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  
  `;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: previewText,
    };

    this.handleChange = this.handleChange.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  createMarkup = (element) => {
    return { __html: marked(element) };
  };

  render() {
    return (
      <div className="App">
        <Editor input={this.state.input} handleChange={this.handleChange} />
        <Preview input={this.createMarkup(this.state.input)} />
      </div>
    );
  }
}

const Editor = (props) => {
  return (
    <div className="markdown_editor">
      <h2>Editor</h2>
      <textarea
        name=""
        id="editor"
        cols="30"
        rows="10"
        value={props.input}
        onChange={props.handleChange}
      ></textarea>
    </div>
  );
};

const Preview = (props) => {
  return (
    <div className="markdown_preview">
      <h2>Preview</h2>
      <div
        id="preview"
        className="preview"
        dangerouslySetInnerHTML={props.input}
      />
    </div>
  );
};

export default App;
