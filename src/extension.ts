import {
  ExtensionContext,
  TextDocument,
  FormattingOptions,
  CancellationToken,
  TextEdit,
  languages,
  Position,
  DocumentFormattingEditProvider,
  Range,
} from 'vscode';
import * as vscode from 'vscode';
import { format } from 'prettier';
import * as dirTree from 'directory-tree';

type Table = {
  lines: string[];
  start: Position;
  end?: Position;
};

export function activate(context: ExtensionContext) {
  console.log(
    'Congratulations, your extension "vscode-markdown-table-sort-enhanced" is now active!'
  );

  const tableFormatter = new TableFormatter();
  languages.registerDocumentFormattingEditProvider('markdown', tableFormatter);

  let disposable = vscode.commands.registerCommand(
    'vscode-markdown-table-sort-enhanced.sort',

    async (args) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user

      const fsTree = dirTree(args.fsPath, {
        extensions: /\.md/,
        exclude: [/demos/, /tests/],
      });
      const data = traverse(
        fsTree.children?.filter(
          (item) => item.children && item.children.length > 0
        )
      );

      if (data.length) {
        for (let item of data) {
          const doc = await openTextDocument(item.path);

          if (doc) {
            await vscode.window.showTextDocument(doc, {
              preview: false,
              viewColumn: vscode.ViewColumn.One,
            });
            await vscode.commands.executeCommand(
              'editor.action.formatDocument'
            );
            await vscode.commands.executeCommand('workbench.action.files.save');
            await vscode.commands.executeCommand(
              'workbench.action.closeActiveEditor'
            );
          }
        }
      }

      console.log('sort done');
    }
  );

  context.subscriptions.push(disposable);
}

function traverse(data: any, list: any = []) {
  data.forEach((item: any) => {
    if (item.children && item.children.length > 0) {
      traverse(item.children, list);
    } else {
      list.push(item);
    }
  });

  return list;
}

async function openTextDocument(
  path: string
): Promise<TextDocument | undefined> {
  try {
    return await vscode.workspace.openTextDocument(path);
  } catch (error) {
    console.error(error);
  }
}

class TableFormatter implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument,
    _options: FormattingOptions,
    _token: CancellationToken
  ) {
    const edits: TextEdit[] = [];
    const tables: Table[] = [];

    let table = false;
    for (let index = 0; index < document.lineCount; index++) {
      const line = document.lineAt(index);
      if (line.text.startsWith('|')) {
        if (!table) {
          tables.push({ lines: [line.text], start: line.range.start });
          table = true;
        } else {
          tables[tables.length - 1].lines.push(line.text);
        }
      } else {
        if (table) {
          const currentTable = tables[tables.length - 1];
          currentTable.end = line.range.start;
          table = false;
        }
      }
    }

    if (table) {
      const currentTable = tables[tables.length - 1];
      currentTable.end = document.lineAt(document.lineCount - 1).range.end;
    }

    for (const table of tables) {
      const header = [];

      header.push(table.lines.shift());
      header.push(table.lines.shift());

      let markdown = '';
      header.forEach((row) => {
        markdown += row + '\n';
      });

      const body = table.lines.sort();
      body.forEach((row) => {
        markdown += row + '\n';
      });

      edits.push(
        TextEdit.replace(
          new Range(table.start, table.end!),
          format(markdown, {
            parser: document.languageId,
          })
        )
      );
    }

    return edits;
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
