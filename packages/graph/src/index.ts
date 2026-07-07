export interface GraphNode {
  id: string;
  label: string;
  type: "skill" | "project" | "principle" | "research" | "domain";
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const slug = (value: string) => value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export function createKnowledgeGraph(input: {
  skills: { groups: Array<{ title: string; items: string[] }> };
  projects: { projects: Array<{ id: string; title: string; stack: string[]; tag: string }> };
  research: { current: string[] };
}) {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  const addNode = (node: GraphNode) => {
    if (!nodes.has(node.id)) nodes.set(node.id, node);
  };

  for (const group of input.skills.groups) {
    const groupId = `domain:${slug(group.title)}`;
    addNode({ id: groupId, label: group.title, type: "domain" });

    for (const skill of group.items) {
      const skillId = `skill:${slug(skill)}`;
      addNode({ id: skillId, label: skill, type: "skill" });
      edges.push({ from: skillId, to: groupId, label: "belongs to" });
    }
  }

  for (const project of input.projects.projects) {
    const projectId = `project:${project.id}`;
    addNode({ id: projectId, label: project.title, type: "project" });

    for (const tech of project.stack) {
      const techId = `skill:${slug(tech)}`;
      addNode({ id: techId, label: tech, type: "skill" });
      edges.push({ from: projectId, to: techId, label: "uses" });
    }
  }

  for (const item of input.research.current) {
    addNode({ id: `research:${slug(item)}`, label: item, type: "research" });
  }

  return { nodes: [...nodes.values()], edges };
}

export function queryGraph(graph: KnowledgeGraph, term: string) {
  const q = term.toLowerCase();
  const nodes = graph.nodes.filter((node) => node.label.toLowerCase().includes(q) || node.id.includes(q));
  const ids = new Set(nodes.map((node) => node.id));
  const edges = graph.edges.filter((edge) => ids.has(edge.from) || ids.has(edge.to));
  return { nodes, edges };
}
