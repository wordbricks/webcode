import type { FileSystemTree } from "@webcontainer/api";

const loadTemplateFiles = async (templateName: string) => {
  const fileList = [
    //
    "package.json",
    "src/git.ts",
  ];

  const files: Record<string, { file: { contents: string } }> = {};

  for (const filePath of fileList) {
    const response = await fetch(`/_templates/${templateName}/${filePath}`);
    const content = await response.text();

    files[filePath] = {
      file: { contents: content },
    };
  }

  return files;
};

export const templates = {
  global: async (): Promise<FileSystemTree> => {
    const files = await loadTemplateFiles("global");

    return {
      "package.json": files["package.json"],
      "git.ts": files["src/git.ts"],
    };
  },
  // Future templates will be automatically added here
  // Examples:kk
  // 'react-ts': async () => {
  //   const templateModule = await import('./templates/react-ts');
  //   return templateModule.default.loadFiles();
  // },
} as const;
