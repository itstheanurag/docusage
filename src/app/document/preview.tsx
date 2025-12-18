"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ReactSignatureCanvas from "react-signature-canvas";
import { useDocumentStore } from "@/store/documentStore";
import { interpolateVariables } from "@/lib/utils/interpolation";

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);
  const { dataSets, selectedDataSetId } = useDocumentStore();

  const interpolatedContent = useMemo(() => {
    const selectedSet = dataSets.find(d => d.id === selectedDataSetId);
    return interpolateVariables(content, selectedSet?.data || {});
  }, [content, dataSets, selectedDataSetId]);

  useEffect(() => {
    if (!interpolatedContent) return;

    // Create a temporary container to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = interpolatedContent;

    // Helper to traverse nodes
    const traverse = (node: Node, index: number): React.ReactNode => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;

        // Check for our special fields
        if (element.classList.contains("docusage-field")) {
          const type = element.getAttribute("data-type");
          const id = element.getAttribute("data-id") || `field-${index}`;

          switch (type) {
            case "text-input":
              return (
                <div
                  key={index}
                  className="inline-block min-w-[200px] mx-1 align-middle"
                >
                  {element.getAttribute("data-label") && (
                    <label className="block text-xs text-muted-foreground mb-1">
                      {element.getAttribute("data-label")}
                      {element.getAttribute("data-required") === "true" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                  )}
                  <Input
                    placeholder={
                      element.getAttribute("data-placeholder") ||
                      "Enter text..."
                    }
                    required={element.getAttribute("data-required") === "true"}
                    className="h-8"
                  />
                </div>
              );
            case "checkbox":
              return (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 mx-1 align-middle"
                >
                  <Checkbox
                    id={id}
                    required={element.getAttribute("data-required") === "true"}
                  />
                  <label htmlFor={id} className="text-sm cursor-pointer">
                    {element.getAttribute("data-label") || "Check"}
                    {element.getAttribute("data-required") === "true" && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                </div>
              );
            case "date":
              return (
                <div key={index} className="inline-block mx-1 align-middle">
                  {element.getAttribute("data-label") && (
                    <label className="block text-xs text-muted-foreground mb-1">
                      {element.getAttribute("data-label")}
                      {element.getAttribute("data-required") === "true" && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                  )}
                  <input
                    type="date"
                    required={element.getAttribute("data-required") === "true"}
                    className="border rounded px-2 py-1 text-sm bg-background"
                  />
                </div>
              );
            case "signature":
              return (
                <div
                  key={index}
                  className="block my-4 border border-dashed border-gray-400 rounded bg-gray-50 dark:bg-gray-900 w-full max-w-md h-40 relative"
                >
                  <div className="absolute top-2 left-2 text-xs text-muted-foreground pointer-events-none">
                    {element.getAttribute("data-label") || "Sign here"}
                    {element.getAttribute("data-required") === "true" && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </div>
                  <ReactSignatureCanvas
                    penColor="black"
                    canvasProps={{ className: "w-full h-full" }}
                  />
                  <div className="absolute bottom-2 right-2">
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      Clear
                    </Button>
                  </div>
                </div>
              );
          }
        }

        // Recursively handle children
        const children = Array.from(element.childNodes).map((child, i) =>
          traverse(child, i),
        );

        const Tag = element.tagName.toLowerCase();

        // Copy attributes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const props: any = { key: index };
        Array.from(element.attributes).forEach((attr) => {
          if (attr.name === "class") {
            props.className = attr.value;
          } else if (attr.name === "style") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const styleObj: any = {};
            const styleStr = attr.value;
            styleStr.split(";").forEach((style) => {
              const [key, value] = style.split(":");
              if (key && value) {
                const camelKey = key
                  .trim()
                  .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[camelKey] = value.trim();
              }
            });
            props.style = styleObj;
          } else {
            props[attr.name] = attr.value;
          }
        });

        const voidElements = [
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "link",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
        ];

        if (voidElements.includes(Tag)) {
          return React.createElement(Tag, props);
        }

        return React.createElement(Tag, props, children);
      }
      return null;
    };

    const parsedNodes = Array.from(tempDiv.childNodes).map((node, i) =>
      traverse(node, i),
    );
    setNodes(parsedNodes);
  }, [interpolatedContent]);

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none w-full">
      {nodes}
    </div>
  );
};

export default Preview;
