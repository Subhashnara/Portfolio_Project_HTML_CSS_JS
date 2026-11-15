# Pavan Nara: portfolio

Personal site for Pavan Subhash Chandrabose Nara, AI Research and Technical Specialist at Internet2 (MS-CC). Plain HTML, CSS, and JavaScript, no build step, hosted on GitHub Pages.

## Files

- `index.html`: all content
- `style.css`: layout, light and dark themes, responsive rules
- `script.js`: the platform-line animation and the role filter
- `assets/`: headshot and résumé PDF

## Updating

- **Headshot:** add `assets/headshot.jpg` (portrait, 4:5), then replace the placeholder `div` in `index.html`; the comment above it has the exact line.
- **Résumé:** save the PDF as `assets/Nara_Resume.pdf`.
- **A project:** copy an `<article class="entry">` block. Its `data-roles` attribute (`ai`, `python`, `teaching`) controls when the role filter highlights it.

## Role filter links

The filter's choice is saved in the URL, so you can send a link that opens pre-filtered:

- `?for=ai`: AI engineering
- `?for=python`: Python, data, and databases
- `?for=teaching`: consulting and teaching

## Accessibility

Keyboard reachable, visible focus, WCAG AA contrast in both themes, and no automatic motion for visitors who turn on reduced motion.

## License

Content © Pavan Subhash Chandrabose Nara. Typeface: Atkinson Hyperlegible Next (SIL Open Font License), served by Google Fonts.
