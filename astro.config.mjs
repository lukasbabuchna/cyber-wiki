// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [
    starlight({
      title: 'Cyber Wiki',
      description:
        'A sourced, lab-graded reference for offensive security, defensive security, penetration testing, CTF, bug bounty, AI security, and the law around them.',
      logo: { src: './src/assets/logo.svg', alt: 'Cyber Wiki' },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/lukasbabuchna/cyber-wiki',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/lukasbabuchna/cyber-wiki/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      components: {
        Footer: './src/components/Footer.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Start here', items: [{ autogenerate: { directory: 'start-here' } }] },
        { label: 'Foundations', items: [{ autogenerate: { directory: 'foundations' } }] },
        { label: 'History', items: [{ autogenerate: { directory: 'history' } }] },
        {
          label: 'Common vulnerabilities',
          items: [{ autogenerate: { directory: 'vulnerabilities' } }],
        },
        { label: 'Offensive security', items: [{ autogenerate: { directory: 'offensive' } }] },
        { label: 'Penetration testing', items: [{ autogenerate: { directory: 'pentesting' } }] },
        { label: 'CTF', items: [{ autogenerate: { directory: 'ctf' } }] },
        { label: 'Bug bounty', items: [{ autogenerate: { directory: 'bug-bounty' } }] },
        { label: 'AI & security', items: [{ autogenerate: { directory: 'ai-security' } }] },
        { label: 'Defensive security', items: [{ autogenerate: { directory: 'defensive' } }] },
        { label: 'Law & ethics', items: [{ autogenerate: { directory: 'law' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
      ],
      expressiveCode: {
        themes: ['github-dark', 'github-light'],
      },
    }),
    mermaid({ autoTheme: true }),
  ],
});
