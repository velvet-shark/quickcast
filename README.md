# QuickCast.dev

Interactive documentation and web tools for Foundry's `cast` command-line utilities.

## Features

- 📚 Comprehensive documentation for all `cast` commands
- 🌐 Browser-based execution of common `cast` operations
- 🎯 Real-world examples for each command
- 📱 Fully responsive design

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS

## Development

To run the development server:

```bash
npm run dev
```

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

## Project Structure

```
app/
├── (commands)/ # Individual cast command pages with examples and online execution options
├── components/ # Shared React components
└── lib/ # Utility functions
commands/ # Individual cast command pages (from Foundry's repo)
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
