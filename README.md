# Virtual Herbal Garden

Virtual Herbal Garden is a website for learning about medicinal plants. You can read about plants, view 3D models, build a virtual garden, and browse traditional home remedies.

## What you can do

- Browse plant details, including names, growing conditions, properties, and uses.
- Search for plants by name.
- View available plants in 3D.
- Arrange plants in a virtual garden.
- Search and browse home remedies by ailment.

## Run the project

You need [Node.js](https://nodejs.org/) and pnpm installed.

1. Open a terminal in the project folder.
2. Install the project packages:

   ```bash
   pnpm install
   ```

3. Start the website:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build, run:

```bash
pnpm build
pnpm start
```

## Project structure

- `app/` contains the website pages.
- `components/` contains reusable interface pieces.
- `lib/plants-data.ts` contains the plant and remedy information.
- `public/assets/3d/` contains 3D plant models.
- `public/images/` contains plant images.

## Important note

Plant and remedy information is provided for learning only. It is stored in the project files; this app does not use a live database. It is not medical advice, and remedies should not replace advice from a qualified healthcare professional.
