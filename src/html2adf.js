import { JSDOM } from 'jsdom';
import { defaultSchema } from '@atlaskit/adf-schema/dist/cjs/schema/default-schema.js';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { JIRATransformer } from '@atlaskit/editor-jira-transformer';
import { escape, unescape } from 'html-escaper';

const jiraTransformer = new JIRATransformer(defaultSchema);
const adfTransformer = new JSONTransformer();

function html2adf(html) {
  html = unescape(escape(html))
  try {
    const dom = new JSDOM('<!doctype html><html><body></body></html>');
    global.window = dom.window;
    global.DOMParser = window.DOMParser;
    global.Node = dom.window.Node;
    global.HTMLElement = dom.window.HTMLElement;

    const pmNode = jiraTransformer.parse(html);
    const adfJson = adfTransformer.encode(pmNode);
    return adfJson
  }
  catch (error) {
    return { err: error, inputHTML: html }
  }
}

export default html2adf
