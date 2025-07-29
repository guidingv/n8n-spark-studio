import { useEffect, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye, Edit3, FileText, Settings } from "lucide-react";
import { toast } from "sonner";
import { BiasCheck } from "./BiasCheck";

interface ContentEditorProps {
  initialData?: any;
  onSave?: (data: any) => void;
  readOnly?: boolean;
}

export const ContentEditor = ({ initialData, onSave, readOnly = false }: ContentEditorProps) => {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [view, setView] = useState<"edit" | "preview">(readOnly ? "preview" : "edit");

  // Initialize content from props
  useEffect(() => {
    if (initialData?.content) {
      setContent(initialData.content);
    } else if (initialData?.blocks) {
      // Convert EditorJS blocks to HTML for compatibility
      let htmlContent = "";
      initialData.blocks.forEach((block: any) => {
        switch (block.type) {
          case "header":
            htmlContent += `<h${block.data.level || 2}>${block.data.text || ""}</h${block.data.level || 2}>`;
            break;
          case "paragraph":
            htmlContent += `<p>${block.data.text || ""}</p>`;
            break;
          case "list":
            const listType = block.data.style === "ordered" ? "ol" : "ul";
            htmlContent += `<${listType}>`;
            block.data.items?.forEach((item: string) => {
              htmlContent += `<li>${item}</li>`;
            });
            htmlContent += `</${listType}>`;
            break;
          default:
            if (block.data.text) {
              htmlContent += `<p>${block.data.text}</p>`;
            }
        }
      });
      setContent(htmlContent);
    }
  }, [initialData]);

  // Count words
  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, "").trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
  }, [content]);

  // Quill modules configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'script',
    'code-block'
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const saveData = {
        content: content,
        wordCount: wordCount,
        lastModified: new Date().toISOString(),
      };
      onSave?.(saveData);
      toast.success("Content saved successfully!");
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  const quillStyle = {
    height: readOnly || view === "preview" ? "auto" : "400px",
    background: "transparent",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {view === "preview" ? (
            <Eye className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Edit3 className="h-5 w-5 text-muted-foreground" />
          )}
          <h2 className="text-lg font-semibold">
            Rich Text Editor
          </h2>
          {wordCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {wordCount} words
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {!readOnly && (
            <Tabs value={view} onValueChange={(v) => setView(v as "edit" | "preview")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit" className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          
          {!readOnly && (
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden bg-gradient-glass backdrop-blur-xl border-border/10">
        {view === "edit" && !readOnly ? (
          <div className="[&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-border/20 [&_.ql-toolbar]:bg-white/5 [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:text-foreground [&_.ql-editor]:bg-transparent [&_.ql-snow_.ql-picker]:text-foreground [&_.ql-snow_.ql-stroke]:stroke-current [&_.ql-snow_.ql-fill]:fill-current">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Start writing your content here..."
              style={quillStyle}
            />
          </div>
        ) : (
          <div className="p-6">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-foreground prose-blockquote:border-l-primary prose-a:text-primary prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground"
              dangerouslySetInnerHTML={{ __html: content || "<p>No content yet. Click Edit to start writing.</p>" }}
            />
          </div>
        )}
      </Card>

      {/* Bias Check Component */}
      <BiasCheck 
        content={content} 
        isAnalyzing={view === "edit" && content.length > 0}
      />
    </div>
  );
};