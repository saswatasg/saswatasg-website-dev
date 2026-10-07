import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { openSourceProjects, softwareSchema } from "../src/data/projectsData";

describe("public portfolio boundaries", () => {
  it("keeps held work out of public project listings and discovery files", () => {
    const publicContent =
      JSON.stringify(openSourceProjects) +
      ["public/sitemap.xml", "public/feed.xml", "public/llms.txt"]
        .map((path) => readFileSync(path, "utf8"))
        .join("\n");
    for (const held of [
      "Pratham-Aalo",
      "wa-magazine-service",
      "/lab/relationship-magazine",
      "Battleship",
    ]) {
      expect(publicContent).not.toContain(held);
    }
  });

  it("gives every listed artifact a valid destination and explicit delivery stage", () => {
    for (const project of openSourceProjects) {
      expect(["independent", "client", "research", "archive"]).toContain(
        project.group,
      );
      expect(project.status.length).toBeGreaterThan(10);
      expect(project.links.length > 0 || Boolean(project.code)).toBe(true);
      for (const link of project.links) {
        expect(link.href).toMatch(
          link.external ? /^https:\/\// : /^\/(blog|case-studies)\//,
        );
      }
    }
    for (const schema of softwareSchema)
      expect(() => new URL(schema.url)).not.toThrow();
  });

  it("removes the unsupported privacy and mandatory-approval promises", () => {
    const topshe = readFileSync(
      "content/blog/topshe-browser-voice-ai.mdx",
      "utf8",
    );
    const outreach = readFileSync(
      "content/blog/tgb-hunt-linkedin-outreach-agent.mdx",
      "utf8",
    );
    expect(topshe).toContain("may involve a remote service");
    expect(topshe).not.toContain("zero data leaves");
    expect(outreach).toContain("can send automatically");
    expect(outreach).not.toContain("87%");
    expect(outreach).not.toContain("31%");
  });
});
