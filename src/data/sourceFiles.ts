import appRaw from '../App.tsx?raw'
import mainRaw from '../main.tsx?raw'
import osStoreRaw from '../store/osStore.ts?raw'
import appRegistryRaw from '../registry/appRegistry.ts?raw'
import desktopRaw from '../components/Desktop/Desktop.tsx?raw'
import windowRaw from '../components/Window/Window.tsx?raw'
import taskbarRaw from '../components/Taskbar/Taskbar.tsx?raw'
import projectsAppRaw from '../components/apps/ProjectsApp.tsx?raw'
import aboutAppRaw from '../components/apps/AboutApp.tsx?raw'
import projectsDataRaw from './projects.ts?raw'
import indexCssRaw from '../index.css?raw'
import packageJsonRaw from '../../package.json?raw'

export interface SourceFileEntry {
  path: string
  content: string
  language: string
}

export const SOURCE_FILES: SourceFileEntry[] = [
  { path: 'package.json', content: packageJsonRaw, language: 'json' },
  { path: 'src/main.tsx', content: mainRaw, language: 'typescript' },
  { path: 'src/App.tsx', content: appRaw, language: 'typescript' },
  { path: 'src/store/osStore.ts', content: osStoreRaw, language: 'typescript' },
  { path: 'src/registry/appRegistry.ts', content: appRegistryRaw, language: 'typescript' },
  { path: 'src/components/Desktop/Desktop.tsx', content: desktopRaw, language: 'typescript' },
  { path: 'src/components/Window/Window.tsx', content: windowRaw, language: 'typescript' },
  { path: 'src/components/Taskbar/Taskbar.tsx', content: taskbarRaw, language: 'typescript' },
  { path: 'src/components/apps/ProjectsApp.tsx', content: projectsAppRaw, language: 'typescript' },
  { path: 'src/components/apps/AboutApp.tsx', content: aboutAppRaw, language: 'typescript' },
  { path: 'src/data/projects.ts', content: projectsDataRaw, language: 'typescript' },
  { path: 'src/index.css', content: indexCssRaw, language: 'css' },
]

export interface SourceTreeNode {
  name: string
  path?: string
  children?: SourceTreeNode[]
}

export const SOURCE_TREE: SourceTreeNode = {
  name: 'portfolio-os',
  children: [
    { name: 'package.json', path: 'package.json' },
    {
      name: 'src',
      children: [
        { name: 'main.tsx', path: 'src/main.tsx' },
        { name: 'App.tsx', path: 'src/App.tsx' },
        { name: 'index.css', path: 'src/index.css' },
        {
          name: 'store',
          children: [{ name: 'osStore.ts', path: 'src/store/osStore.ts' }],
        },
        {
          name: 'registry',
          children: [{ name: 'appRegistry.ts', path: 'src/registry/appRegistry.ts' }],
        },
        {
          name: 'data',
          children: [{ name: 'projects.ts', path: 'src/data/projects.ts' }],
        },
        {
          name: 'components',
          children: [
            {
              name: 'Desktop',
              children: [{ name: 'Desktop.tsx', path: 'src/components/Desktop/Desktop.tsx' }],
            },
            {
              name: 'Window',
              children: [{ name: 'Window.tsx', path: 'src/components/Window/Window.tsx' }],
            },
            {
              name: 'Taskbar',
              children: [{ name: 'Taskbar.tsx', path: 'src/components/Taskbar/Taskbar.tsx' }],
            },
            {
              name: 'apps',
              children: [
                { name: 'ProjectsApp.tsx', path: 'src/components/apps/ProjectsApp.tsx' },
                { name: 'AboutApp.tsx', path: 'src/components/apps/AboutApp.tsx' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export function getSourceFile(path: string): SourceFileEntry | undefined {
  return SOURCE_FILES.find(file => file.path === path)
}
