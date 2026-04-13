import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  content: string;
};

/**
 * Detects if content is HTML (from Tiptap) vs markdown (legacy posts).
 * HTML content starts with tags like <p>, <h2>, <ul>, etc.
 */
function isHtml(text: string): boolean {
  return /^\s*<(?:p|h[1-6]|ul|ol|div|blockquote|img|figure|hr)\b/i.test(text);
}

/**
 * Sanitize HTML by stripping script/event attributes.
 * This is a basic server-side sanitizer for Tiptap output
 * (which is already controlled admin-only input).
 */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript\s*:/gi, "");
}

export function PostBody({ content }: Props) {
  if (isHtml(content)) {
    return (
      <div
        className="markdown-prose"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
    );
  }

  return (
    <div className="markdown-prose">
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
    </div>
  );
}
