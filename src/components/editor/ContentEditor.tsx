import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, Eye, Edit3 } from "lucide-react";
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
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "/api/uploadFile", // Mock endpoint
                byUrl: "/api/fetchUrl", // Mock endpoint
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

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {readOnly ? (
            <Eye className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Edit3 className="h-5 w-5 text-muted-foreground" />
          )}
          <h2 className="text-lg font-semibold">
            {readOnly ? "Content Preview" : "Content Editor"}
          </h2>
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

      <Card className="p-6">
        <div 
          id="editorjs" 
          className="min-h-[400px] prose prose-lg max-w-none focus:outline-none"
        />
      </Card>
    </div>
  );
};