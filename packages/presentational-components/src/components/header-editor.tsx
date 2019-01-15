import {
  Button,
  EditableText,
  H1,
  ITagProps,
  Position,
  Tag,
  Tooltip
} from "@blueprintjs/core";
import { BlueprintCSS } from "@nteract/styled-blueprintjsx";
import * as React from "react";

// https://github.com/jupyter/nbformat/blob/master/nbformat/v4/nbformat.v4.schema.json#L67

const tagStyle = {
  background: "#f1f8ff",
  color: "#0366d6",
  marginRight: "5px"
};

const authorStyle = {
  background: "#E5E5E5",
  fontStyle: "italic",
  marginRight: "5px"
};

const authorStyleBlack = { ...authorStyle, color: "black" };

export interface AuthorObject {
  name: string;
}
export interface HeaderDataProps {
  authors: AuthorObject[];
  title: string;
  description: string;
  tags: string[];
}

export interface HeaderEditorProps {
  /**
   * The data that the header should be populated with.
   */
  headerData: HeaderDataProps;
  /**
   * Whether or not the fields of the header can be edited.
   */
  editable: boolean;
  /**
   * An event handler to run whenever header fields are modified.
   */
  onChange: (props?: HeaderDataProps) => void;
  /**
   * The theme of the header.
   */
  theme: "light" | "dark";
}

export interface HeaderEditorState {
  editMode: "none" | "author" | "tag";
}

const addTagMessage = <span>Add a tag</span>;
const addAuthorMessage = <span>Add an author</span>;

export class HeaderEditor extends React.PureComponent<
  HeaderEditorProps,
  HeaderEditorState
> {
  constructor(props: HeaderEditorProps) {
    super(props);

    this.state = {
      editMode: "none"
    };
  }
  static defaultProps = {
    editable: true,
    theme: "light",
    headerData: {
      authors: [],
      title: "",
      description: "",
      tags: []
    },
    onChange: () => {},
    onRemove: (e: React.MouseEvent<HTMLButtonElement>, props: ITagProps) => {}
  };

  render() {
    // Otherwise assume they have their own editor component
    const { editable, headerData, onChange } = this.props;
    return (
      <header>
        <div style={{ background: "#EEE", padding: "10px" }}>
          <H1>
            <EditableText
              value={headerData.title}
              placeholder="Edit title..."
              disabled={!editable}
              onChange={newText => {
                onChange({
                  ...headerData,
                  title: newText
                });
              }}
            />
          </H1>
          <div>
            {headerData.authors.length <= 0 ? null : "By "}
            {headerData.authors.map(t => (
              <Tag
                key={t.name}
                large={true}
                minimal={true}
                style={authorStyle}
                onRemove={(
                  evt: React.MouseEvent<HTMLButtonElement>,
                  props: ITagProps
                ) => {
                  if (editable === true) {
                    onChange({
                      ...headerData,
                      authors: headerData.authors.filter(p => p.name !== t.name)
                    });
                    return;
                  }
                  return;
                }}
              >
                {t.name}
              </Tag>
            ))}
            {(this.state.editMode === "author" && (
              <Tag style={authorStyleBlack}>
                <EditableText
                  maxLength={40}
                  className="author-entry"
                  placeholder="Enter Author Name..."
                  selectAllOnFocus={true}
                  onConfirm={e => {
                    onChange({
                      ...headerData,
                      authors: [...headerData.authors, { name: e }]
                    });
                    this.setState({ editMode: "none" });
                  }}
                  onCancel={() => this.setState({ editMode: "none" })}
                />
              </Tag>
            )) || (
              <Tooltip
                content={addAuthorMessage}
                position={Position.RIGHT}
                usePortal={false}
                disabled={!editable}
              >
                <Button
                  icon="add"
                  className="author-button"
                  onClick={() => this.setState({ editMode: "author" })}
                  minimal={true}
                  disabled={!editable}
                />
              </Tooltip>
            )}
          </div>

          <div>
            {headerData.tags.map(t => (
              <Tag
                key={t}
                style={tagStyle}
                onRemove={(
                  e: React.MouseEvent<HTMLButtonElement>,
                  props: ITagProps
                ) => {
                  if (editable) {
                    onChange({
                      ...headerData,
                      tags: headerData.tags.filter(p => p !== t)
                    });
                    return;
                  }
                  return;
                }}
              >
                {t}
              </Tag>
            ))}
            {(this.state.editMode === "tag" && (
              <Tag style={tagStyle}>
                <EditableText
                  maxLength={20}
                  placeholder="Enter Tag Name..."
                  selectAllOnFocus={true}
                  onConfirm={e => {
                    onChange({
                      ...headerData,
                      tags: [...headerData.tags, e]
                    });
                    this.setState({ editMode: "none" });
                  }}
                  onCancel={() => this.setState({ editMode: "none" })}
                />
              </Tag>
            )) || (
              <Tooltip
                content={addTagMessage}
                position={Position.RIGHT}
                usePortal={false}
                disabled={!editable}
              >
                {
                  <Button
                    icon="add"
                    minimal={true}
                    onClick={() => this.setState({ editMode: "tag" })}
                    disabled={!editable}
                  />
                }
              </Tooltip>
            )}
          </div>
          <div style={{ marginTop: "10px" }}>
            <EditableText
              maxLength={280}
              maxLines={12}
              minLines={3}
              multiline={true}
              placeholder="Edit description..."
              selectAllOnFocus={false}
              value={headerData.description}
              disabled={!editable}
              onChange={newText => {
                onChange({
                  ...headerData,
                  description: newText
                });
              }}
            />
          </div>
        </div>
        <BlueprintCSS />
      </header>
    );
  }
}
