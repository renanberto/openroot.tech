export interface StoryCase {
  id: string;
  title: string;
  tag: string;
  problem: string;
  context?: string;
  constraints?: string[];
  solution: string;
  architecture?: string[];
  stack: string[];
  impact: string;
  lessons?: string[];
}

export function renderCaseStudy(project: StoryCase) {
  return [
    `# ${project.title}`,
    ``,
    `[${project.tag}]`,
    ``,
    `Problem: ${project.problem}`,
    project.context ? `Context: ${project.context}` : "",
    project.constraints?.length ? `Constraints:\n${project.constraints.map((item) => `- ${item}`).join("\n")}` : "",
    `Solution: ${project.solution}`,
    project.architecture?.length ? `Architecture:\n${project.architecture.map((item) => `- ${item}`).join("\n")}` : "",
    `Stack: ${project.stack.join(", ")}`,
    `Impact: ${project.impact}`,
    project.lessons?.length ? `Lessons:\n${project.lessons.map((item) => `- ${item}`).join("\n")}` : ""
  ].filter(Boolean).join("\n\n");
}
