# Traffic_Lights

## Tests

![Branches Coverage](./badges/coverage-branches.svg)
![Statements Coverage](./badges/coverage-statements.svg)

This project prioritizes testing the business logic in isolation. For example, the file upload logic (`handleFileUpload`) is tested independently of the `UploadFileForm` component. As a result, the coverage report may show low coverage for the component, even though its critical functionality is thoroughly tested.

This approach was chosen to:

- Keep tests focused on the logic rather than UI details.
- Ensure maintainable and reusable tests.

## Tech Stack

<img alt="VITEST" src="https://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=Vitest&logoColor=%23fcd703"/>
<img alt="TYPESCRIPT" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>

### CLI

<img alt="TSNODE" src="https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white"/>

### Webapp

<img alt="VITE" src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E"/>
<img alt="REACTJS" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img alt="PIXIJS" src="https://img.shields.io/badge/Pixi-CC6699?style=for-the-badge&logo=piapro&logoColor=fff"/>
<img alt="TAILWIND" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img alt="SHADCN/UI" src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/>

## Usage

1. Deployment

You can access the webapp verstion at [https://tl.dsieron.pl](https://tl.dsieron.pl)

2. Running simulation using CLI

```bash
pnpm backend-build

pnpm backend-start <inputFile> <outputFile>
```

Look for output in provided output file

3. Running simulation in webapp

```bash
pnpm build

pnpm start
```

Access the app [here](http://localhost:4173)

## License

This project is licensed under [MIT license](./LICENSE).
