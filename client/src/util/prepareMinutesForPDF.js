import { marked } from "marked";
import DOMPurify from "dompurify";

const preprocessMarkdown = (markdown) => {
  // Escape input tags
  const preprocessedMarkdown = markdown
    .replace(/\[ \]/g, "\\[ \\]")
    .replace(/\[x\]/gi, "\\[x\\]");

  return preprocessedMarkdown;
};

const transformAndStyleHtml = (html) => {
  const processedHTML = html
    // Apply line-through style for <del> tags
    .replace(
      /<del>(.*?)<\/del>/g,
      (_, content) => `<span class="delStyle">${content}</span>`,
    )
    // Apply backticks around <code> tags
    .replace(
      /<code>(.*?)<\/code>/g,
      (_, content) => `<span class="codeStyle">${content}</span>`,
    )
    // Apply three backticks around <pre><code> tag combos
    .replace(
      /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
      (_, content) => `<pre class="preCodeStyle">${content}</pre>`,
    );

  return processedHTML;
};

const sanitizeConfig = {
  ALLOWED_TAGS: [
    "br",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "div",
    "ul",
    "li",
    "ol",
    "blockquote",
    "code",
    "pre",
    "b",
    "strong",
    "i",
    "em",
    "del",
    "a",
    "img",
    "table",
    "tbody",
    "tr",
    "td",
    "th",
    "thead",
    "tfoot",
  ],
  ALLOWED_ATTR: ["href", "title", "target", "src", "alt", "width", "height"],
};

const prepareMinutesForPDF = (minutesState) => {
  marked.setOptions({
    breaks: true,
  });

  const pdfReadyMinutes = {
    name: transformAndStyleHtml(
      DOMPurify.sanitize(
        marked.parse(preprocessMarkdown(minutesState.minutes.name)),
        sanitizeConfig,
      ),
    ),
    colors: minutesState.minutes.colors,
    segments: minutesState.minutes.segments.map((segment) => ({
      id: segment.id,
      name: transformAndStyleHtml(
        DOMPurify.sanitize(
          marked.parse(preprocessMarkdown(segment.name)),
          sanitizeConfig,
        ),
      ),
      content: transformAndStyleHtml(
        DOMPurify.sanitize(
          marked.parse(preprocessMarkdown(segment.content)),
          sanitizeConfig,
        ),
      ),
    })),
    signatures: minutesState.minutes.signatures,
  };

  return pdfReadyMinutes;
};

export default prepareMinutesForPDF;
