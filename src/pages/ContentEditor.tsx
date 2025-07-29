import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ContentEditor } from "@/components/editor/ContentEditor";
import { StrategyPack } from "@/components/editor/StrategyPack";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";

// Mock content data - in real app this would come from your database
const mockContent = {
  "1": {
    id: "1",
    title: "Blog Post: Summer Campaign Launch",
    type: "blog",
    strategyId: "1",
    blocks: [
      {
        type: "header",
        data: {
          text: "Launching Our Summer Campaign",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This summer, we're excited to announce our biggest campaign yet. With innovative strategies and fresh creative content, we're ready to make a splash in the market.",
        },
      },
      {
        type: "header",
        data: {
          text: "Key Features",
          level: 2,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Multi-platform content distribution",
            "AI-powered content optimization",
            "Real-time analytics and insights",
            "Interactive social media campaigns"
          ],
        },
      },
    ],
  },
  "2": {
    id: "2",
    title: "Social Media Post: Product Announcement",
    type: "social",
    strategyId: "3",
    blocks: [
      {
        type: "header",
        data: {
          text: "🚀 Exciting News!",
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "We're thrilled to introduce our latest innovation that will revolutionize how you create and manage content. Stay tuned for more details! #Innovation #ContentCreation #AI",
        },
      },
    ],
  },
};

export default function ContentEditorPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [isReadOnly, setIsReadOnly] = useState(searchParams.get('mode') === 'preview');
  
  const content = id ? mockContent[id as keyof typeof mockContent] : null;
  const [selectedStrategy, setSelectedStrategy] = useState<string>(content?.strategyId || "");

  useEffect(() => {
    if (searchParams.get('mode') === 'preview') {
      setIsReadOnly(true);
    }
  }, [searchParams]);

  const handleSave = (data: any) => {
    console.log("Saving content:", data);
    // Here you would save to your database
    toast.success("Content saved to database!");
  };

  const handleBack = () => {
    navigate("/");
  };

  if (id && !content) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Content Not Found</h2>
            <p className="text-muted-foreground">The requested content could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant={isReadOnly ? "default" : "outline"}
              onClick={() => setIsReadOnly(true)}
              size="sm"
            >
              Preview
            </Button>
            <Button
              variant={!isReadOnly ? "default" : "outline"}
              onClick={() => setIsReadOnly(false)}
              size="sm"
            >
              Edit
            </Button>
          </div>
        </div>

        {content && (
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
            <p className="text-muted-foreground capitalize">{content.type} Content</p>
          </div>
        )}

        <StrategyPack 
          selectedStrategy={selectedStrategy}
          onStrategyChange={setSelectedStrategy}
        />

        <ContentEditor
          initialData={content ? { blocks: content.blocks } : undefined}
          onSave={handleSave}
          readOnly={isReadOnly}
        />
      </div>
    </div>
  );
}