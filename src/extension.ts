// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CodeAnalysisConfig } from './config';
import { CPDCache } from './data/cpd/cache';
import { DuplicateCodeProvider } from './data/cpd/treedata';
import { SpotBugsCache } from './data/spotbugs/cache';
import { SpotBugsTreeProvider } from './data/spotbugs/SpotBugsTree';
import { CPDGutters } from './gutter';

export function activate(context: vscode.ExtensionContext) {
	let spotbugsData = new SpotBugsCache();
	let data = new CPDCache();
	let config = new CodeAnalysisConfig();
	let cpdGutters = new CPDGutters(data,spotbugsData,config,context);
	let duplicateProvider = new DuplicateCodeProvider(data);
	let spotbugsProvider = new SpotBugsTreeProvider(spotbugsData);

	let showCPDGutters = vscode.commands.registerCommand('codeanalysis-gutters.pmd.showDuplicates', () => {
		cpdGutters.showDuplicates();
	});
	let hideCPDGutters = vscode.commands.registerCommand('codeanalysis-gutters.pmd.hideDuplicates', () => {
		cpdGutters.hideDuplicates();
	});

	let refreshCPDTree = vscode.commands.registerCommand('codeanalysis-gutters.pmd.refreshDuplicates', () => {
		duplicateProvider.refresh();
	});

	context.subscriptions.push(showCPDGutters,hideCPDGutters,refreshCPDTree);

	vscode.window.registerTreeDataProvider('cpd.DuplicateCode',duplicateProvider);
	vscode.window.registerTreeDataProvider('spotbugs.Bugs',spotbugsProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
