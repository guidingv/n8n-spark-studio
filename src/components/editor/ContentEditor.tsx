import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import Table from "@editorjs/table";
import LinkTool from "@editorjs/link";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Eye, Edit3, Type, Image as ImageIcon, List as ListIcon, Code2, Quote as QuoteIcon, Minus, Table as TableIcon, Link, Highlighter } from "lucide-react";
import { toast } from "sonner";

interface ContentEditorProps {
  initialData?: any;
  onSave?: (data: any) => void;
  readOnly?: boolean;
}

export const ContentEditor = ({ initialData, onSave, readOnly = false }: ContentEditorProps) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        readOnly,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2,
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
              placeholder: "Type your text here...",
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          code: {
            class: Code,
            config: {
              placeholder: "Enter code here...",
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          delimiter: Delimiter,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link", // Mock endpoint for link fetching
            },
          },
          marker: {
            class: Marker,
          },
          inlineCode: {
            class: InlineCode,
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "/api/uploadFile", // Mock endpoint
                byUrl: "/api/fetchUrl", // Mock endpoint
              },
              additionalRequestData: {},
              additionalRequestHeaders: {},
              field: "image",
              types: "image/*",
              captionPlaceholder: "Image caption",
              buttonContent: "Select an image",
              uploader: {
                uploadByFile: (file: File) => {
                  // Mock upload - in real app, upload to your storage
                  return Promise.resolve({
                    success: 1,
                    file: {
                      url: URL.createObjectURL(file),
                    },
                  });
                },
              },
            },
          },
        },
        data: initialData || {
          blocks: [
            {
              type: "header",
              data: {
                text: "Content Editor",
                level: 1,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Start editing your content here...",
              },
            },
          ],
        },
        placeholder: "Let's write an awesome story!",
        onReady: () => {
          setIsReady(true);
          updateWordCount();
        },
        onChange: () => {
          updateWordCount();
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initialData, readOnly]);

  const updateWordCount = async () => {
    if (!editorRef.current || !isReady) return;
    
    try {
      const data = await editorRef.current.save();
      let words = 0;
      data.blocks.forEach((block: any) => {
        if (block.type === "paragraph" || block.type === "header") {
          const text = block.data.text || "";
          words += text.split(/\s+/).filter((word: string) => word.length > 0).length;
        } else if (block.type === "list") {
          block.data.items?.forEach((item: string) => {
            words += item.split(/\s+/).filter((word: string) => word.length > 0).length;
          });
        } else if (block.type === "quote") {
          const text = block.data.text || "";
          const caption = block.data.caption || "";
          words += text.split(/\s+/).filter((word: string) => word.length > 0).length;
          words += caption.split(/\s+/).filter((word: string) => word.length > 0).length;
        }
      });
      setWordCount(words);
    } catch (error) {
      console.error("Word count failed:", error);
    }
  };

  const handleSave = async () => {
    if (!editorRef.current || !isReady) return;

    setIsSaving(true);
    try {
      const outputData = await editorRef.current.save();
      onSave?.(outputData);
      toast.success("Content saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  const toolsInfo = [
    { icon: Type, name: "Headers", description: "Add headers (H1-H6)" },
    { icon: ImageIcon, name: "Images", description: "Upload or embed images" },
    { icon: ListIcon, name: "Lists", description: "Bullet and numbered lists" },
    { icon: Code2, name: "Code", description: "Code blocks with syntax highlighting" },
    { icon: QuoteIcon, name: "Quotes", description: "Blockquotes with attribution" },
    { icon: Minus, name: "Delimiter", description: "Visual content separator" },
    { icon: Link, name: "Links", description: "Smart link embedding" },
    { icon: Highlighter, name: "Highlight", description: "Text highlighting and inline code" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {readOnly ? (
            <Eye className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Edit3 className="h-5 w-5 text-muted-foreground" />
          )}
          <h2 className="text-lg font-semibold">
            {readOnly ? "Content Preview" : "Rich Content Editor"}
          </h2>
          {wordCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {wordCount} words
            </Badge>
          )}
        </div>
        
        {!readOnly && (
          <Button 
            onClick={handleSave} 
            disabled={!isReady || isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Content"}
          </Button>
        )}
      </div>

      {!readOnly && (
        <Card className="p-4 bg-gradient-glass backdrop-blur-xl border-border/10">
          <h3 className="text-sm font-medium mb-3 text-foreground">Available Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            {toolsInfo.map((tool, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-border/20 hover:bg-white/10 transition-colors"
              >
                <tool.icon className="h-4 w-4 text-n8n-primary mb-1" />
                <span className="text-xs text-foreground font-medium">{tool.name}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6 bg-gradient-glass backdrop-blur-xl border-border/10">
        <div 
          id="editorjs" 
          className="min-h-[500px] prose prose-lg max-w-none focus:outline-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-foreground prose-blockquote:border-l-primary"
        />
      </Card>
    </div>
  );
};