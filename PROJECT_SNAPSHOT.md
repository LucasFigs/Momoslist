# Snapshot do projeto

> Gerado em 2026-09-20T04:26:23.612Z por `npm run snapshot`.
>
> Este arquivo documenta a estrutura e o conteúdo dos arquivos-fonte/configuração do projeto.
> Dependências instaladas, artefatos de build, caches e arquivos `.env` locais são omitidos.

## Estrutura incluída

```text
gift-list-platform/
├── .claude
│   └── settings.local.json
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── prisma
│   └── schema.prisma
├── README.md
├── scripts
│   ├── check-storage.mjs
│   └── generate-project-snapshot.mjs
├── src
│   ├── actions
│   │   ├── auth.actions.ts
│   │   ├── contribution.actions.ts
│   │   ├── event.actions.ts
│   │   ├── gift.actions.ts
│   │   ├── guest.actions.ts
│   │   ├── payment.actions.ts
│   │   └── reservation.actions.ts
│   ├── app
│   │   ├── api
│   │   │   └── auth
│   │   │       └── [...nextauth]
│   │   │           └── route.ts
│   │   ├── cadastro
│   │   │   ├── cadastro-form.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   ├── eventos
│   │   │   │   └── [id]
│   │   │   │       ├── cover-image-uploader.tsx
│   │   │   │       ├── event-dashboard-view.tsx
│   │   │   │       ├── event-form.tsx
│   │   │   │       ├── funds-overview.tsx
│   │   │   │       ├── gift-form-dialog.tsx
│   │   │   │       ├── gift-list.tsx
│   │   │   │       ├── guest-selections.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       ├── profile-image-uploader.tsx
│   │   │   │       ├── publish-toggle.tsx
│   │   │   │       ├── share-link-buttons.tsx
│   │   │   │       └── theme-selector.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── nova-lista
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── sign-out-button.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── lista
│   │   │   └── [eventSlugToken]
│   │   │       ├── contribute-dialog.tsx
│   │   │       ├── fund-card.tsx
│   │   │       ├── gift-card-skeleton.tsx
│   │   │       ├── gift-card.tsx
│   │   │       ├── gift-filters.tsx
│   │   │       ├── gift-sort.ts
│   │   │       ├── gifts-section.tsx
│   │   │       ├── header-publico.tsx
│   │   │       ├── identify-guest-dialog.tsx
│   │   │       ├── loading.tsx
│   │   │       ├── not-found.tsx
│   │   │       ├── page.tsx
│   │   │       ├── payment-panel.tsx
│   │   │       ├── share-public-list-button.tsx
│   │   │       └── switch-guest-button.tsx
│   │   ├── login
│   │   │   ├── login-form.tsx
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components
│   │   ├── formatted-text.tsx
│   │   ├── fund-progress.tsx
│   │   ├── gift-image.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── confirm-dialog.tsx
│   │       ├── dialog.tsx
│   │       ├── empty-state.tsx
│   │       ├── expandable-text.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── password-input.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       └── toaster.tsx
│   ├── hooks
│   │   └── use-toast.ts
│   ├── lib
│   │   ├── auth.ts
│   │   ├── fund.ts
│   │   ├── gift-availability.ts
│   │   ├── guest-session.ts
│   │   ├── logger.ts
│   │   ├── pix-payload.ts
│   │   ├── prisma.ts
│   │   ├── slug.ts
│   │   ├── supabase-storage.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   └── schemas
│       ├── auth.schema.ts
│       ├── event.schema.ts
│       ├── gift.schema.ts
│       └── guest.schema.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Conteúdo dos arquivos

### `.claude/settings.local.json`

```json
{
  "permissions": {
    "allow": [
      "PowerShell(npx tsc --noEmit 2>&1)",
      "PowerShell(npx tsc --noEmit; \"tsc exit: $LASTEXITCODE\"; npx next lint --dir src/app/lista 2>&1 | Select-Object -First 20)",
      "PowerShell(npx tsc --noEmit; \"tsc exit: $LASTEXITCODE\"; npx next lint --dir src/app/dashboard --dir src/components 2>&1 | Select-Object -First 20)",
      "PowerShell(npx tsc --noEmit; \"tsc exit: $LASTEXITCODE\"; npx next lint 2>&1 | Select-Object -First 30)",
      "PowerShell(npx next build 2>&1)",
      "Bash(node scripts/check-storage.mjs)",
      "Bash(cd \"C:/Users/lucas/Downloads/gift-list-platform/src\" && sed -i 's/text-secondary\\\\b\\\\\\([^-]\\\\\\)/text-secondary-strong\\\\1/g' app/page.tsx \"app/lista/[eventSlugToken]/header-publico.tsx\" \"app/lista/[eventSlugToken]/payment-panel.tsx\" \"app/lista/[eventSlugToken]/gift-card.tsx\" && sed -i 's/rounded-md border border-border bg-card/rounded-md border border-input bg-card/' components/ui/input.tsx components/ui/select.tsx components/ui/textarea.tsx && grep -rn \"text-secondary\\\\|border-input\" app components | grep -v \"text-secondary-foreground\")",
      "PowerShell(Set-Location C:\\\\Users\\\\lucas\\\\Downloads\\\\gift-list-platform; npx tsc --noEmit; \"tsc exit: $LASTEXITCODE\"; npx next lint 2>&1 | Select-Object -First 30; npx next build 2>&1 | Select-String -Pattern \"error|Error|Failed|✓ Compiled|Route \\\\\\(app\\\\\\)\" | Select-Object -First 20)",
      "Bash(node -e ' *)",
      "Bash(node .tmp-e2e3.cjs)",
      "Bash(node .tmp-e2e4.cjs)",
      "Bash(rm -rf .shots/profile)",
      "Bash(node .tmp-e2e5.cjs)",
      "Bash(node .tmp-e2e6.cjs)",
      "Bash(node .tmp-e2e7.cjs)",
      "PowerShell(Set-Location C:\\\\Users\\\\lucas\\\\Downloads\\\\gift-list-platform; npx tsc --noEmit; \"tsc exit: $LASTEXITCODE\"; npx next lint 2>&1 | Select-Object -First 12; npx next build 2>&1 | Select-String -Pattern \"error|Error|Failed|Compiled|^├|^└|^┌\" | Select-Object -First 16; npx tsc --noEmit; \"tsc \\(pós-build\\) exit: $LASTEXITCODE\")"
    ],
    "additionalDirectories": [
      "C:\\Users\\lucas\\Downloads\\gift-list-platform\\app\\lista\\[eventSlugToken]"
    ]
  }
}
```

### `.env.example`

```
# Banco de dados (Supabase Postgres — usar a connection string com pgbouncer para runtime
# e a "direct connection" para migrations, se disponível)
DATABASE_URL="[redacted in snapshot]"

# Auth.js
AUTH_SECRET="[redacted in snapshot]"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET="[redacted in snapshot]"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="[redacted in snapshot]"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[redacted in snapshot]"
SUPABASE_SERVICE_ROLE_KEY="[redacted in snapshot]"

# Regras de negócio
# URL pública do site (usada em SEO/Open Graph). Em produção: https://seu-dominio.vercel.app
NEXT_PUBLIC_SITE_URL="[redacted in snapshot]"

RESERVATION_TIMEOUT_MINUTES=15
```

### `.eslintrc.json`

```json
{
  "extends": "next/core-web-vitals"
}
```

### `.gitignore`

```
node_modules
.next
.env
.env.local
*.log
.DS_Store
```

### `next-env.d.ts`

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

### `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // IMPORTANTE: o padrão do Next é 1MB. Como aceitamos imagens de até 5MB,
      // sem isso qualquer foto de celular estoura o limite e o upload falha.
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
```

### `package-lock.json`

```json
{
  "name": "gift-list-platform",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "gift-list-platform",
      "version": "0.1.0",
      "hasInstallScript": true,
      "dependencies": {
        "@auth/prisma-adapter": "2.4.2",
        "@prisma/client": "5.16.1",
        "@radix-ui/react-dialog": "1.1.1",
        "@radix-ui/react-dropdown-menu": "2.1.1",
        "@radix-ui/react-label": "2.1.0",
        "@radix-ui/react-slot": "1.1.0",
        "@radix-ui/react-tabs": "1.1.0",
        "@radix-ui/react-toast": "1.2.1",
        "@supabase/supabase-js": "2.45.4",
        "bcryptjs": "2.4.3",
        "class-variance-authority": "0.7.0",
        "clsx": "2.1.1",
        "date-fns": "3.6.0",
        "lucide-react": "0.408.0",
        "next": "14.2.5",
        "next-auth": "5.0.0-beta.19",
        "qrcode": "1.5.4",
        "react": "18.3.1",
        "react-dom": "18.3.1",
        "tailwind-merge": "2.4.0",
        "zod": "3.23.8"
      },
      "devDependencies": {
        "@types/bcryptjs": "2.4.6",
        "@types/node": "20.14.14",
        "@types/qrcode": "1.5.5",
        "@types/react": "18.3.3",
        "@types/react-dom": "18.3.0",
        "autoprefixer": "10.4.19",
        "eslint": "8.57.0",
        "eslint-config-next": "14.2.5",
        "postcss": "8.4.40",
        "prisma": "5.16.1",
        "tailwindcss": "3.4.7",
        "tailwindcss-animate": "1.0.7",
        "typescript": "5.5.4"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@auth/core": {
      "version": "0.34.2",
      "resolved": "https://registry.npmjs.org/@auth/core/-/core-0.34.2.tgz",
      "integrity": "sha512-KywHKRgLiF3l7PLyL73fjLSIBe1YNcA6sMeew4yMP6cfCWGXZrkkXd32AjRi1hlJ9nvovUBGZHvbn+LijO6ZeQ==",
      "license": "ISC",
      "dependencies": {
        "@panva/hkdf": "^1.1.1",
        "@types/cookie": "0.6.0",
        "cookie": "0.6.0",
        "jose": "^5.1.3",
        "oauth4webapi": "^2.10.4",
        "preact": "10.11.3",
        "preact-render-to-string": "5.2.3"
      },
      "peerDependencies": {
        "@simplewebauthn/browser": "^9.0.1",
        "@simplewebauthn/server": "^9.0.2",
        "nodemailer": "^6.8.0"
      },
      "peerDependenciesMeta": {
        "@simplewebauthn/browser": {
          "optional": true
        },
        "@simplewebauthn/server": {
          "optional": true
        },
        "nodemailer": {
          "optional": true
        }
      }
    },
    "node_modules/@auth/prisma-adapter": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/@auth/prisma-adapter/-/prisma-adapter-2.4.2.tgz",
      "integrity": "sha512-QQwnGYfDiyTcAxMVhTrim+lLFFA3TKq3nIrbPtGZXlkiuNQ5t0rUg//Km7Wv21pD5bxhy4aRPlfq7TdFKk3XIw==",
      "license": "ISC",
      "dependencies": {
        "@auth/core": "0.34.2"
      },
      "peerDependencies": {
        "@prisma/client": ">=2.26.0 || >=3 || >=4 || >=5"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.1",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.10.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.10.1.tgz",
      "integrity": "sha512-cuadcxVFE8sDK6iWJbs8Sn0av2Nrh2QSGQhVlBW9AaAHqHwjWsZHT8LJ4hFGPh7ASBV2deFdM7H/DPjulmh8rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-2.1.4.tgz",
      "integrity": "sha512-269Z39MS6wVJtsoUl10L60WdkhJVdPG24Q4eZTH3nnF6lpvSShEK3wQjDX9JRWAUPvPh7COouPpU9IrqaZFvtQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.12.4",
        "debug": "^4.3.2",
        "espree": "^9.6.0",
        "globals": "^13.19.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/js": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-8.57.0.tgz",
      "integrity": "sha512-Ys+3g2TaW7gADOJzPt83SJtCDhMjndcDMFVQ/Tj9iA1BfJzFKD9mAUXT3OenpuPHbI6P/myECxRJrofUsDx/5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.8.0.tgz",
      "integrity": "sha512-0CIZ5itps/8x7BG8dEIhs53BvCUH2PCoogtakwRTut+Arm58sJooJ0AuZhLw2HJYIR5cMLNPBSS728sPho2khQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.12"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.8.0.tgz",
      "integrity": "sha512-yXSrzeHZBTZadLOlfyhCkJHNeLJnHRnRInwdZ40L7ZiaAtrBwoYlsDrX3v5zB1Utk7CLfzcOVnVVWoXEky7Ceg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.8.0",
        "@floating-ui/utils": "^0.2.12"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.9",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.9.tgz",
      "integrity": "sha512-JDjEFGCpImxDCA7JJKviA0M9+RtmJdj0m/NVU5IMgBK+AmZouAQQ7/+2GLH0GXXY0YMw9oXPB8hKdbPYg5QLYg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.8.0"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.12",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.12.tgz",
      "integrity": "sha512-HpCo8tmWzLVad5s2d19EhAz5zqrrQ6s69qd6moPMQvkOuSwDT1YgRfWSVuc4ennqrgv3OHppiOGMQ7oC13yIww==",
      "license": "MIT"
    },
    "node_modules/@humanwhocodes/config-array": {
      "version": "0.11.14",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/config-array/-/config-array-0.11.14.tgz",
      "integrity": "sha512-3T8LkOmg45BV5FICb15QQMsyUSWrQ8AygVfC7ZG32zOalnqrilm018ZVCw0eapXux8FtA33q8PSRSstjee3jSg==",
      "deprecated": "Use @eslint/config-array instead",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanwhocodes/object-schema": "^2.0.2",
        "debug": "^4.3.1",
        "minimatch": "^3.0.5"
      },
      "engines": {
        "node": ">=10.10.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/object-schema": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/object-schema/-/object-schema-2.0.3.tgz",
      "integrity": "sha512-93zYdMES/c1D69yZiKDBj0V24vqNzB/koF26KPaagAfd3P/4gUlh3Dys5ogAK+Exi9QyzlD8x/08Zt7wIKcDcA==",
      "deprecated": "Use @eslint/object-schema instead",
      "dev": true,
      "license": "BSD-3-Clause"
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@isaacs/cliui/node_modules/ansi-regex": {
      "version": "6.3.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.3.0.tgz",
      "integrity": "sha512-WpDfL7NO6j7tH88IDBNVdUJxDh9nmCteAVW9dsep846XdwF4naCBK+/tGLX3KJgcpgMRXCFlTM2hKGoK9FsdrQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/@isaacs/cliui/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.2.4.tgz",
      "integrity": "sha512-AJxoUD2/15ESHbvpcyjU274nsAPLuOtPHCk0vKJM5pj//Fg/B1FXNWjPnXTT9PymCYYiHo4zPj0ZomXBKhoy7g==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@tybys/wasm-util": "^0.10.3"
      },
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=23.5.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1 || ^2.0.0-alpha.4",
        "@emnapi/runtime": "^1.7.1 || ^2.0.0-alpha.4"
      }
    },
    "node_modules/@next/env": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-14.2.5.tgz",
      "integrity": "sha512-/zZGkrTOsraVfYjGP8uM0p6r0BDT6xWpkjdVbcz66PJVSpwXX3yNiRycxAuDfBKGWBrZBXRuK/YVlkNgxHGwmA==",
      "license": "MIT"
    },
    "node_modules/@next/eslint-plugin-next": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-14.2.5.tgz",
      "integrity": "sha512-LY3btOpPh+OTIpviNojDpUdIbHW9j0JBYBjsIp8IxtDFfYFyORvw3yNq6N231FVqQA7n7lwaf7xHbVJlA1ED7g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "glob": "10.3.10"
      }
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-14.2.5.tgz",
      "integrity": "sha512-/9zVxJ+K9lrzSGli1///ujyRfon/ZneeZ+v4ptpiPoOU+GKZnm8Wj8ELWU1Pm7GHltYRBklmXMTUqM/DqQ99FQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-14.2.5.tgz",
      "integrity": "sha512-vXHOPCwfDe9qLDuq7U1OYM2wUY+KQ4Ex6ozwsKxp26BlJ6XXbHleOUldenM67JRyBfVjv371oneEvYd3H2gNSA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-14.2.5.tgz",
      "integrity": "sha512-vlhB8wI+lj8q1ExFW8lbWutA4M2ZazQNvMWuEDqZcuJJc78iUnLdPPunBPX8rC4IgT6lIx/adB+Cwrl99MzNaA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-14.2.5.tgz",
      "integrity": "sha512-NpDB9NUR2t0hXzJJwQSGu1IAOYybsfeB+LxpGsXrRIb7QOrYmidJz3shzY8cM6+rO4Aojuef0N/PEaX18pi9OA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-14.2.5.tgz",
      "integrity": "sha512-8XFikMSxWleYNryWIjiCX+gU201YS+erTUidKdyOVYi5qUQo/gRxv/3N1oZFCgqpesN6FPeqGM72Zve+nReVXQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-14.2.5.tgz",
      "integrity": "sha512-6QLwi7RaYiQDcRDSU/os40r5o06b5ue7Jsk5JgdRBGGp8l37RZEh9JsLSM8QF0YDsgcosSeHjglgqi25+m04IQ==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-14.2.5.tgz",
      "integrity": "sha512-1GpG2VhbspO+aYoMOQPQiqc/tG3LzmsdBH0LhnDS3JrtDx2QmzXe0B6mSZZiN3Bq7IOMXxv1nlsjzoS1+9mzZw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-ia32-msvc": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-ia32-msvc/-/swc-win32-ia32-msvc-14.2.5.tgz",
      "integrity": "sha512-Igh9ZlxwvCDsu6438FXlQTHlRno4gFpJzqPjSIBZooD22tKeI4fE/YMRoHVJHmrQ2P5YL1DoZ0qaOKkbeFWeMg==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-14.2.5.tgz",
      "integrity": "sha512-tEQ7oinq1/CjSG9uSTerca3v4AZ+dFa+4Yu6ihaG8Ud8ddqLQgFGcnwYls13H5X5CPDPZJdYxyeMui6muOLd4g==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nolyfill/is-core-module": {
      "version": "1.0.39",
      "resolved": "https://registry.npmjs.org/@nolyfill/is-core-module/-/is-core-module-1.0.39.tgz",
      "integrity": "sha512-nn5ozdjYQpUCZlWGuxcJY/KpxkWQs4DcbMCmKojjyrYDEAGy4Ce19NN4v5MduafTwJlbKc99UA8YhSVqq9yPZA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.4.0"
      }
    },
    "node_modules/@panva/hkdf": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@panva/hkdf/-/hkdf-1.2.1.tgz",
      "integrity": "sha512-6oclG6Y3PiDFcoyk8srjLfVKyMfVCKJ27JwNPViuXziFpmdz+MZnZN/aKY0JGXgYuO/VghU0jcOAZgWXZ1Dmrw==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@prisma/client": {
      "version": "5.16.1",
      "resolved": "https://registry.npmjs.org/@prisma/client/-/client-5.16.1.tgz",
      "integrity": "sha512-wM9SKQjF0qLxdnOZIVAIMKiz6Hu7vDt4FFAih85K1dk/Rr2mdahy6d3QP41K62N9O0DJJA//gUDA3Mp49xsKIg==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=16.13"
      },
      "peerDependencies": {
        "prisma": "*"
      },
      "peerDependenciesMeta": {
        "prisma": {
          "optional": true
        }
      }
    },
    "node_modules/@prisma/debug": {
      "version": "5.16.1",
      "resolved": "https://registry.npmjs.org/@prisma/debug/-/debug-5.16.1.tgz",
      "integrity": "sha512-JsNgZAg6BD9RInLSrg7ZYzo11N7cVvYArq3fHGSD89HSgtN0VDdjV6bib7YddbcO6snzjchTiLfjeTqBjtArVQ==",
      "devOptional": true,
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/engines": {
      "version": "5.16.1",
      "resolved": "https://registry.npmjs.org/@prisma/engines/-/engines-5.16.1.tgz",
      "integrity": "sha512-KkyF3eIUtBIyp5A/rJHCtwQO18OjpGgx18PzjyGcJDY/+vNgaVyuVd+TgwBgeq6NLdd1XMwRCI+58vinHsAdfA==",
      "devOptional": true,
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.16.1",
        "@prisma/engines-version": "5.16.0-24.34ace0eb2704183d2c05b60b52fba5c43c13f303",
        "@prisma/fetch-engine": "5.16.1",
        "@prisma/get-platform": "5.16.1"
      }
    },
    "node_modules/@prisma/engines-version": {
      "version": "5.16.0-24.34ace0eb2704183d2c05b60b52fba5c43c13f303",
      "resolved": "https://registry.npmjs.org/@prisma/engines-version/-/engines-version-5.16.0-24.34ace0eb2704183d2c05b60b52fba5c43c13f303.tgz",
      "integrity": "sha512-HkT2WbfmFZ9WUPyuJHhkiADxazHg8Y4gByrTSVeb3OikP6tjQ7txtSUGu9OBOBH0C13dPKN2qqH12xKtHu/Hiw==",
      "devOptional": true,
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/fetch-engine": {
      "version": "5.16.1",
      "resolved": "https://registry.npmjs.org/@prisma/fetch-engine/-/fetch-engine-5.16.1.tgz",
      "integrity": "sha512-oOkjaPU1lhcA/Rvr4GVfd1NLJBwExgNBE36Ueq7dr71kTMwy++a3U3oLd2ZwrV9dj9xoP6LjCcky799D9nEt4w==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.16.1",
        "@prisma/engines-version": "5.16.0-24.34ace0eb2704183d2c05b60b52fba5c43c13f303",
        "@prisma/get-platform": "5.16.1"
      }
    },
    "node_modules/@prisma/get-platform": {
      "version": "5.16.1",
      "resolved": "https://registry.npmjs.org/@prisma/get-platform/-/get-platform-5.16.1.tgz",
      "integrity": "sha512-R4IKnWnMkR2nUAbU5gjrPehdQYUUd7RENFD2/D+xXTNhcqczp0N+WEGQ3ViyI3+6mtVcjjNIMdnUTNyu3GxIgA==",
      "devOptional": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.16.1"
      }
    },
    "node_modules/@radix-ui/primitive": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.0.tgz",
      "integrity": "sha512-4Z8dn6Upk0qk4P74xBhZ6Hd/w0mPEzOOLxy4xiPXOXqjF7jZS0VAKk7/x/H6FyY2zCkYJqePf1G5KmkmNJ4RBA==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/react-arrow": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.1.0.tgz",
      "integrity": "sha512-FmlW1rCg7hBpEBwFbjHwCW6AmWLQM6g/v0Sn8XbP9NvmSZ2San1FpQeyPtufzOMSIx7Y4dzjlHoifhp+7NkZhw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collection": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.0.tgz",
      "integrity": "sha512-GZsZslMJEyo1VKm5L1ZJY8tGDxZNPAoUeQUIbKeJfoi7Q4kmig5AsgLMYYuyYbfjd8fBmFORAIwYAkXMnXZgZw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-slot": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.0.tgz",
      "integrity": "sha512-b4inOtiaOnYf9KWyO3jAeeCG6FeyfY6ldiEPanbUjWd+xIk5wZeHa8yVwmrJ2vderhu/BQvzCrJI0lHd+wIiqw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.0.tgz",
      "integrity": "sha512-OKrckBy+sMEgYM/sMmqmErVn0kZqrHPJze+Ql3DzYsDDp0hl0L62nx/2122/Bvps1qz645jlcu2tD9lrRSdf8A==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.1.1.tgz",
      "integrity": "sha512-zysS+iU4YP3STKNS6USvFVqI4qqx8EpiwmT5TuCApVEBca+eRCbONi4EgzfNSuVnOXvC5UPHHMjs8RXO6DH9Bg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.0",
        "@radix-ui/react-focus-guards": "1.1.0",
        "@radix-ui/react-focus-scope": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-portal": "1.1.1",
        "@radix-ui/react-presence": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-slot": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "2.5.7"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-direction": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.1.0.tgz",
      "integrity": "sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.0.tgz",
      "integrity": "sha512-/UovfmmXGptwGcBQawLzvn2jOfM0t4z3/uKffoBlj724+n3FvBbZ7M0aaBOmkp6pqFYpO4yx8tSVJjx3Fl2jig==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-escape-keydown": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dropdown-menu": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dropdown-menu/-/react-dropdown-menu-2.1.1.tgz",
      "integrity": "sha512-y8E+x9fBq9qvteD2Zwa4397pUVhYsh9iq44b5RD5qu1GMJWBCBuVg1hMyItbc6+zH00TxGRqd9Iot4wzf3OoBQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-menu": "2.1.1",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-guards": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.0.tgz",
      "integrity": "sha512-w6XZNUPVv6xCpZUqb/yN9DL6auvpGX3C/ee6Hdi16v2UUy25HV2Q5bcflsiDyT/g5RwbPQ/GIT1vLkeRb+ITBw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-scope": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.0.tgz",
      "integrity": "sha512-200UD8zylvEyL8Bx+z76RJnASR2gRMuxlgFCPAe/Q/679a/r0eK3MBVYMb7vZODZcffZBdob1EGnky78xmVvcA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-id": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.0.tgz",
      "integrity": "sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.1.0.tgz",
      "integrity": "sha512-peLblDlFw/ngk3UWq0VnYaOLy6agTZZ+MUO/WhVfm14vJGML+xH4FAl2XQGLqdefjNb7ApRg6Yn7U42ZhmYXdw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menu": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menu/-/react-menu-2.1.1.tgz",
      "integrity": "sha512-oa3mXRRVjHi6DZu/ghuzdylyjaMXLymx83irM7hTxutQbD+7IhPKdMdRHD26Rm+kHRrWcrUkkRPv5pd47a2xFQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-collection": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.0",
        "@radix-ui/react-focus-guards": "1.1.0",
        "@radix-ui/react-focus-scope": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-popper": "1.2.0",
        "@radix-ui/react-portal": "1.1.1",
        "@radix-ui/react-presence": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-roving-focus": "1.1.0",
        "@radix-ui/react-slot": "1.1.0",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "2.5.7"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popper": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.2.0.tgz",
      "integrity": "sha512-ZnRMshKF43aBxVWPWvbj21+7TQCvhuULWJ4gNIKYpRlQt5xGRhLx66tMp8pya2UkGHTSlhpXwmjqltDYHhw7Vg==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/react-dom": "^2.0.0",
        "@radix-ui/react-arrow": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-use-rect": "1.1.0",
        "@radix-ui/react-use-size": "1.1.0",
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-portal": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.1.tgz",
      "integrity": "sha512-A3UtLk85UtqhzFqtoC8Q0KvR2GbXF3mtPgACSazajqq6A41mEQgo53iPzY4i6BwDxlIFqWIhiQ2G729n+2aw/g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-presence": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.0.tgz",
      "integrity": "sha512-Gq6wuRN/asf9H/E/VzdKoUtT8GC9PQc9z40/vEr0VCJ4u5XvvhWIrSsCB6vD2/cH7ugTdSfYq9fLJCcM00acrQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.0.0.tgz",
      "integrity": "sha512-ZSpFm0/uHa8zTvKBDjLFWLo8dkr4MBsiDLz0g3gMUwqgLHz9rTaRRGYDgvZPtBJgYCBKXkS9fzmoySgr8CO6Cw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-roving-focus": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-roving-focus/-/react-roving-focus-1.1.0.tgz",
      "integrity": "sha512-EA6AMGeq9AEeQDeSH0aZgG198qkfHSbvWTf1HvoDmOB5bBG/qTxjYMWUKMnYiV6J/iP/J8MEFSuB2zRU2n7ODA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-collection": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.1.0.tgz",
      "integrity": "sha512-FUCf5XMfmW4dtYl69pdS4DbxKy8nj4M7SafBgPllysxmdachynNflAdp/gCsnYWNDnge6tI9onzMp5ARYc1KNw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tabs": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tabs/-/react-tabs-1.1.0.tgz",
      "integrity": "sha512-bZgOKB/LtZIij75FSuPzyEti/XBhJH52ExgtdVqjCIh+Nx/FW+LhnbXtbCzIi34ccyMsyOja8T0thCzoHFXNKA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-direction": "1.1.0",
        "@radix-ui/react-id": "1.1.0",
        "@radix-ui/react-presence": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-roving-focus": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toast": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toast/-/react-toast-1.2.1.tgz",
      "integrity": "sha512-5trl7piMXcZiCq7MW6r8YYmu0bK5qDpTWz+FdEPdKyft2UixkspheYbjbrLXVN5NGKHFbOP7lm8eD0biiSqZqg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.0",
        "@radix-ui/react-collection": "1.1.0",
        "@radix-ui/react-compose-refs": "1.1.0",
        "@radix-ui/react-context": "1.1.0",
        "@radix-ui/react-dismissable-layer": "1.1.0",
        "@radix-ui/react-portal": "1.1.1",
        "@radix-ui/react-presence": "1.1.0",
        "@radix-ui/react-primitive": "2.0.0",
        "@radix-ui/react-use-callback-ref": "1.1.0",
        "@radix-ui/react-use-controllable-state": "1.1.0",
        "@radix-ui/react-use-layout-effect": "1.1.0",
        "@radix-ui/react-visually-hidden": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-callback-ref": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.0.tgz",
      "integrity": "sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-controllable-state": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.1.0.tgz",
      "integrity": "sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-escape-keydown": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.1.0.tgz",
      "integrity": "sha512-L7vwWlR1kTTQ3oh7g1O0CBF3YCyyTj8NmhLR+phShpyA50HCfBFKVJTpshm9PzLiKmehsrQzTYTpX9HvmC9rhw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-layout-effect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.0.tgz",
      "integrity": "sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-rect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-rect/-/react-use-rect-1.1.0.tgz",
      "integrity": "sha512-0Fmkebhr6PiseyZlYAOtLS+nb7jLmpqTrJyv61Pe68MKYW6OWdRE2kI70TaYY27u7H0lajqM3hSMMLFq18Z7nQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/rect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-size": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-size/-/react-use-size-1.1.0.tgz",
      "integrity": "sha512-XW3/vWuIXHa+2Uwcc2ABSfcCledmXhhQPlGbfcRXbiUQI5Icjcg19BGCZVKKInYbvUCut/ufbbLLPFC5cbb1hw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-visually-hidden/-/react-visually-hidden-1.1.0.tgz",
      "integrity": "sha512-N8MDZqtgCgG5S3aV60INAB475osJousYpZ4cTJ2cFbMpdHS5Y6loLTH8LPtkj2QN0x93J30HT/M3qJXM0+lyeQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.0.0"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/rect": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/rect/-/rect-1.1.0.tgz",
      "integrity": "sha512-A9+lCBZoaMJlVKcRBz2YByCG+Cp2t6nAnMnNba+XiWxnj6r4JUFqfsgwocMBZU9LPtdxC6wB56ySYpc7LQIoJg==",
      "license": "MIT"
    },
    "node_modules/@rtsao/scc": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@rtsao/scc/-/scc-1.1.0.tgz",
      "integrity": "sha512-zt6OdqaDoOnJ1ZYsCYGt9YmWzDXl4vQdKTyJev62gFhRGKdx7mcT54V9KIjg+d2wi9EXsPvAPKe7i7WjfVWB8g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rushstack/eslint-patch": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/@rushstack/eslint-patch/-/eslint-patch-1.16.1.tgz",
      "integrity": "sha512-TvZbIpeKqGQQ7X0zSCvPH9riMSFQFSggnfBjFZ1mEoILW+UuXCKwOoPcgjMwiUtRqFZ8jWhPJc4um14vC6I4ag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@supabase/auth-js": {
      "version": "2.65.0",
      "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.65.0.tgz",
      "integrity": "sha512-+wboHfZufAE2Y612OsKeVP4rVOeGZzzMLD/Ac3HrTQkkY4qXNjI6Af9gtmxwccE5nFvTiF114FEbIQ1hRq5uUw==",
      "license": "MIT",
      "dependencies": {
        "@supabase/node-fetch": "^2.6.14"
      }
    },
    "node_modules/@supabase/functions-js": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.4.1.tgz",
      "integrity": "sha512-8sZ2ibwHlf+WkHDUZJUXqqmPvWQ3UHN0W30behOJngVh/qHHekhJLCFbh0AjkE9/FqqXtf9eoVvmYgfCLk5tNA==",
      "license": "MIT",
      "dependencies": {
        "@supabase/node-fetch": "^2.6.14"
      }
    },
    "node_modules/@supabase/node-fetch": {
      "version": "2.6.15",
      "resolved": "https://registry.npmjs.org/@supabase/node-fetch/-/node-fetch-2.6.15.tgz",
      "integrity": "sha512-1ibVeYUacxWYi9i0cf5efil6adJ9WRyZBLivgjs+AUpewx1F3xPi7gLgaASI2SmIQxPoCEjAsLAzKPgMJVgOUQ==",
      "license": "MIT",
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      }
    },
    "node_modules/@supabase/postgrest-js": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-1.16.1.tgz",
      "integrity": "sha512-EOSEZFm5pPuCPGCmLF1VOCS78DfkSz600PBuvBND/IZmMciJ1pmsS3ss6TkB6UkuvTybYiBh7gKOYyxoEO3USA==",
      "license": "MIT",
      "dependencies": {
        "@supabase/node-fetch": "^2.6.14"
      }
    },
    "node_modules/@supabase/realtime-js": {
      "version": "2.10.2",
      "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.10.2.tgz",
      "integrity": "sha512-qyCQaNg90HmJstsvr2aJNxK2zgoKh9ZZA8oqb7UT2LCh3mj9zpa3Iwu167AuyNxsxrUE8eEJ2yH6wLCij4EApA==",
      "license": "MIT",
      "dependencies": {
        "@supabase/node-fetch": "^2.6.14",
        "@types/phoenix": "^1.5.4",
        "@types/ws": "^8.5.10",
        "ws": "^8.14.2"
      }
    },
    "node_modules/@supabase/storage-js": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.7.0.tgz",
      "integrity": "sha512-iZenEdO6Mx9iTR6T7wC7sk6KKsoDPLq8rdu5VRy7+JiT1i8fnqfcOr6mfF2Eaqky9VQzhP8zZKQYjzozB65Rig==",
      "license": "MIT",
      "dependencies": {
        "@supabase/node-fetch": "^2.6.14"
      }
    },
    "node_modules/@supabase/supabase-js": {
      "version": "2.45.4",
      "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.45.4.tgz",
      "integrity": "sha512-E5p8/zOLaQ3a462MZnmnz03CrduA5ySH9hZyL03Y+QZLIOO4/Gs8Rdy4ZCKDHsN7x0xdanVEWWFN3pJFQr9/hg==",
      "license": "MIT",
      "dependencies": {
        "@supabase/auth-js": "2.65.0",
        "@supabase/functions-js": "2.4.1",
        "@supabase/node-fetch": "2.6.15",
        "@supabase/postgrest-js": "1.16.1",
        "@supabase/realtime-js": "2.10.2",
        "@supabase/storage-js": "2.7.0"
      }
    },
    "node_modules/@swc/counter": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/@swc/counter/-/counter-0.1.3.tgz",
      "integrity": "sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==",
      "license": "Apache-2.0"
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.5.tgz",
      "integrity": "sha512-KGYxvIOXcceOAbEk4bi/dVLEK9z8sZ0uBB3Il5b1rhfClSpcX0yfRO0KmTkqR2cnQDymwLB+25ZyMzICg/cm/A==",
      "license": "Apache-2.0",
      "dependencies": {
        "@swc/counter": "^0.1.3",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.4",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.4.tgz",
      "integrity": "sha512-W3c4gRigFS0T/Ma4qIYF3GDAc5AQdHb1yL5znJT1Zv1YaD9Kitx656wBjvr19qbiosmZT8lWDM5BEMynUqX65A==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/bcryptjs": {
      "version": "2.4.6",
      "resolved": "https://registry.npmjs.org/@types/bcryptjs/-/bcryptjs-2.4.6.tgz",
      "integrity": "sha512-9xlo6R2qDs5uixm0bcIqCeMCE6HiQsIyel9KQySStiyqNl2tnj2mP3DX1Nf56MD6KMenNNlBBsy3LJ7gUEQPXQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/cookie": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@types/cookie/-/cookie-0.6.0.tgz",
      "integrity": "sha512-4Kh9a6B2bQciAhf7FSuMRRkUWecJgJu9nPnx3yzpsfXX/c50REIqpHY4C82bXP90qrLtXtkDxTZosYO3UpOwlA==",
      "license": "MIT"
    },
    "node_modules/@types/json5": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
      "integrity": "sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "20.14.14",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.14.14.tgz",
      "integrity": "sha512-d64f00982fS9YoOgJkAMolK7MN8Iq3TDdVjchbYHdEmjth/DHowx82GnoA+tVUAN+7vxfYUgAzi+JXbKNd2SDQ==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~5.26.4"
      }
    },
    "node_modules/@types/phoenix": {
      "version": "1.6.7",
      "resolved": "https://registry.npmjs.org/@types/phoenix/-/phoenix-1.6.7.tgz",
      "integrity": "sha512-oN9ive//QSBkf19rfDv45M7eZPi0eEXylht2OLEXicu5b4KoQ1OzXIw+xDSGWxSxe1JmepRR/ZH283vsu518/Q==",
      "license": "MIT"
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.15",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.15.tgz",
      "integrity": "sha512-F6bEyamV9jKGAFBEmlQnesRPGOQqS2+Uwi0Em15xenOxHaf2hv6L8YCVn3rPdPJOiJfPiCnLIRyvwVaqMY3MIw==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/@types/qrcode": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@types/qrcode/-/qrcode-1.5.5.tgz",
      "integrity": "sha512-CdfBi/e3Qk+3Z/fXYShipBT13OJ2fDO2Q2w5CIP5anLTLIndQG9z6P1cnm+8zCWSpm5dnxMFd/uREtb0EXuQzg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/react": {
      "version": "18.3.3",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.3.tgz",
      "integrity": "sha512-hti/R0pS0q1/xx+TsI73XIqk26eBsISZ2R0wUijXIngRK9R/e7Xw/cXVxQK7R5JjW+SV4zGcn5hXjudkN/pLIw==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.0.tgz",
      "integrity": "sha512-EhwApuTmMBmXuFOikhQLIBUn6uFg81SwLMOAUgodJF14SOBOCMdU04gDoYi0WOJJHD144TL32z4yDqCW3dnkQg==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "@types/react": "*"
      }
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-7.2.0.tgz",
      "integrity": "sha512-5FKsVcHTk6TafQKQbuIVkXq58Fnbkd2wDL4LB7AURN7RUOu1utVP+G8+6u3ZhEroW3DF6hyo3ZEXxgKgp4KeCg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "@typescript-eslint/scope-manager": "7.2.0",
        "@typescript-eslint/types": "7.2.0",
        "@typescript-eslint/typescript-estree": "7.2.0",
        "@typescript-eslint/visitor-keys": "7.2.0",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": "^16.0.0 || >=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.56.0"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-7.2.0.tgz",
      "integrity": "sha512-Qh976RbQM/fYtjx9hs4XkayYujB/aPwglw2choHmf3zBjB4qOywWSdt9+KLRdHubGcoSwBnXUH2sR3hkyaERRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "7.2.0",
        "@typescript-eslint/visitor-keys": "7.2.0"
      },
      "engines": {
        "node": "^16.0.0 || >=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-7.2.0.tgz",
      "integrity": "sha512-XFtUHPI/abFhm4cbCDc5Ykc8npOKBSJePY3a3s+lwumt7XWJuzP5cZcfZ610MIPHjQjNsOLlYK8ASPaNG8UiyA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^16.0.0 || >=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-7.2.0.tgz",
      "integrity": "sha512-cyxS5WQQCoBwSakpMrvMXuMDEbhOo9bNHHrNcEWis6XHx6KF518tkF1wBvKIn/tpq5ZpUYK7Bdklu8qY0MsFIA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "@typescript-eslint/types": "7.2.0",
        "@typescript-eslint/visitor-keys": "7.2.0",
        "debug": "^4.3.4",
        "globby": "^11.1.0",
        "is-glob": "^4.0.3",
        "minimatch": "9.0.3",
        "semver": "^7.5.4",
        "ts-api-utils": "^1.0.1"
      },
      "engines": {
        "node": "^16.0.0 || >=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.7.tgz",
      "integrity": "sha512-uZbew1NqdmPDTMJ8ah1y+b+9QEJrfkXFk3RcTQw3X0jW/xRUvFKsg1CfQdSYGdTbXZWExtU3J3ccxtnfw1Fi0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.3.tgz",
      "integrity": "sha512-RHiac9mvaRw0x3AYRgDC1CxAP7HTcNrrECeA8YYJeWnpo+2Q5CegtZjaotWTWxDG3UeGA1coE05iH1mPjT/2mg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-7.2.0.tgz",
      "integrity": "sha512-c6EIQRHhcpl6+tO8EMR+kjkkV+ugUNXOmeASA1rlzkd8EPIriavpWoiEz1HR/VLhbVIdhqnV6E7JZm00cBDx2A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "7.2.0",
        "eslint-visitor-keys": "^3.4.1"
      },
      "engines": {
        "node": "^16.0.0 || >=18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@ungap/structured-clone": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/@ungap/structured-clone/-/structured-clone-1.4.0.tgz",
      "integrity": "sha512-1mEZtMKPM09vDmQt5y7YvmN2+DFTP7Tg0EWXdic8/C6VRnpb33e4ghisCIE3WZjsE2N8mf+QV1Zqh7ZFYLWInQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/@unrs/resolver-binding-android-arm-eabi": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.12.2.tgz",
      "integrity": "sha512-g5T90pqg1bo/7mytQx6F4iBNC0Wsh9cu+z9veDbFjc7HjpesJFWD7QMS0NGStXM075+7dJPPVvBbpZlnrdpi/w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-android-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.12.2.tgz",
      "integrity": "sha512-YGCRZv/9GLhwmz6mYDeTsm/92BAyR28l6c2ReweVW5pWgfsitWLY8upvfRlGdoyD8HjeTHSYJWyZGD4KJA/nFQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.12.2.tgz",
      "integrity": "sha512-u9DiNT1auQMO20A9SyTuG3wUgQWB9Z7KjAg0uFuCDR1FsAY8A0CG2S6JpHS1xwm/w1G08bjXZDcyOCjv1WAm2w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-x64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.12.2.tgz",
      "integrity": "sha512-f7rPLi/T1HVKZu/u6t87lroib16n8vrSzcyxI7lg4BGO9UF26KhQL44sd9eOUgrTYhvRXtWOIZT5PejdPyJfUA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-freebsd-x64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.12.2.tgz",
      "integrity": "sha512-BpcOjWCJub6nRZUS2zA20pmLvjtqAtGejETaIyRLiZiQf++cbrjltLA5NN/xaXfqeOBOSlMFbemIl5/S5tljmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-gnueabihf": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.12.2.tgz",
      "integrity": "sha512-vZTDvdSISZjJx66OzJqtsOhzifbqRjbmI1Mnu49fQDwog5GtDI4QidRiEAYbZCRj9C8YZEW+3ZjqsyS9GR4k2A==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-musleabihf": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.12.2.tgz",
      "integrity": "sha512-BiPI+IrIlwcW4nLLMM21+B1dFPzd55yAVgVGrdgDjNef+ch03GdxrcyaIz8X9SsQirh/kCQ7mviyWlMxdh2D7g==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.12.2.tgz",
      "integrity": "sha512-zJc0H99FEPoFfSrNpa91HYfxzfAJCr502oxNK1cfdC9hlaFI43RT+JFCann9JUgZmLzzntChHyn13Sgn9ljHNg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.12.2.tgz",
      "integrity": "sha512-KQ3Lki6l+Pz1k/eBipN41ES+YUK30beLGb9YqcB1O542cyLCNE6GaxrfcY3T6EezmGGk84wb5XyO9loTM9tkcA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-gnu/-/resolver-binding-linux-loong64-gnu-1.12.2.tgz",
      "integrity": "sha512-3SJGEh1DborhG6pyxvhPzCT4bbSIVihsvgJc13P1bHG7KLdNDaF9T3gsTwFc7Jw/5Y5/iWOjkEx7Zy0NvCGX3Q==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-musl/-/resolver-binding-linux-loong64-musl-1.12.2.tgz",
      "integrity": "sha512-jiuG/Obbel7uw1PwHNFfrkiKhLAF6mnyZ6aWlOAVN9WqKm8v0OFGnciJIHu8+CMvXLQ8AD51LPzAoUfT21D5Ew==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-ppc64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.12.2.tgz",
      "integrity": "sha512-q7xRvVpmcfeL+LlZg8Pbbo6QaTZwDU5BaGZbwfhkEsXJn3Was8xYfE0RBH266xZt0rM6B7i8xAYIvjthuUIWHg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.12.2.tgz",
      "integrity": "sha512-0CVdx6lcnT3Q9inOH8tsMIOJ6ImndllMjqJHg8RLVdB7Vq4SfkEXl9mCSsVNuNA4MCYycRicCUxPCabVHJRr6A==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.12.2.tgz",
      "integrity": "sha512-iOwlRo9vnp6R6ohHQS11n0NnfdXx/omhkocmIfaPRpQhKZ+3BDMkkdRVh53qjkFkpPddf+FETA28NwGN7l5l+w==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-s390x-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.12.2.tgz",
      "integrity": "sha512-HYJtLfXq94q8iZNFT1lknx258wlkkWhZeUXJRqzKBBUJ00CvZ+N33zgbCqimLjsyw5Va6uUxhVa12mI+kaveEw==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.12.2.tgz",
      "integrity": "sha512-mPsUhunKKDih5O96Y6enDQyHc1SqBPlY1E/SfMWDM3EdJ95Z9CArPeCVwCCqbP45ljvivdEk8Fxn+SIb1rDAJQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.12.2.tgz",
      "integrity": "sha512-azrt6+5ydLd8Vt210AAFis/lZevSfPw93EJRIJG+xPu4WCJ8K0kppCTpMyLPcKT7H15M4Jnt2tMp5bOvCkRC6A==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-openharmony-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-openharmony-arm64/-/resolver-binding-openharmony-arm64-1.12.2.tgz",
      "integrity": "sha512-YZ9hP4O0X9PQb8eO980qmLNGH4zT3I9+SZTdt0Pr0YyuGQhYKoOZkV02VzrzyOZJ5xIJ3UFIenKkUkGg8GjgWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-wasm32-wasi/-/resolver-binding-wasm32-wasi-1.12.2.tgz",
      "integrity": "sha512-tYFDIkMxSflfEc/h92ZWNsZlHSwgimbNHSO3PL2JWQHfCuC2q316jMyYU9TIWZsFK2bQwyK5VAdYgn8ygPj69A==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "1.10.0",
        "@emnapi/runtime": "1.10.0",
        "@napi-rs/wasm-runtime": "^1.1.4"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@unrs/resolver-binding-win32-arm64-msvc": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.12.2.tgz",
      "integrity": "sha512-qzNyg3xL0VPQmCaUh+N5jSitce6k+uCBfMDesWRnlULOZaqUkaJ0ybdT+UqlAWJoQjuqfIU/0Ptx9bteN4D82g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-ia32-msvc": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.12.2.tgz",
      "integrity": "sha512-WD9sY00OfpHVGfsnHZoA8jVT+esS/Bg8z8jzxp5BnDCjjwsuKsPQrzswwpFy4J1AUJbXPRfkpcX0mXrzeXW79g==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-x64-msvc": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.12.2.tgz",
      "integrity": "sha512-nAB74NfSNKknqQ1RrYj6uz8FcXEomu/MATJZxh/x+BArzN2U3JbOYC0APYzUIGhVY3m5hRxA8VPNdPBoG8txlA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/acorn": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.18.0.tgz",
      "integrity": "sha512-lGq+9yr1/GuAWaVYIHRjvvySG5/4VfKIvC8EWxStPdcDh/Ka7FG3twP6v4d5BkravUilhIAsG4Qj83t02LWUPQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/aria-hidden": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.6.tgz",
      "integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/aria-query": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.2.tgz",
      "integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/array-buffer-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-buffer-byte-length/-/array-buffer-byte-length-1.0.2.tgz",
      "integrity": "sha512-LHE+8BuR7RYGDKvnrmcuSq3tDcKv9OFEXQt/HpbZhY7V6h0zlUXutnAD82GiFx9rdieCMjkvtcsPqBwgUl1Iiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "is-array-buffer": "^3.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array-includes": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.2.0.tgz",
      "integrity": "sha512-VXY5eFRarnXcYxwBjJzPmEhH55+rmP79/+ueDhi0F+TuqfHCItagIHqxeUZrmgrOPa31QTh9H85DjX3FfJ0FTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-object-atoms": "^1.1.2",
        "es-shim-unscopables": "^1.1.0",
        "is-string": "^1.1.1",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array-union": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/array-union/-/array-union-2.1.0.tgz",
      "integrity": "sha512-HGyxoOTYUyCM6stUe6EJgnd4EoewAI7zMdfqO+kGjnlZmBDz/cR5pf8r/cR4Wq60sL/p0IkcjUEEPwS3GFrIyw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/array.prototype.findlast": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/array.prototype.findlast/-/array.prototype.findlast-1.2.5.tgz",
      "integrity": "sha512-CVvd6FHg1Z3POpBLxO6E6zr+rSKEQ9L6rZHAaY7lLfhKsWYUBBOuMs0e9o24oopj6H+geRCX0YJ+TJLBK2eHyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlastindex": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/array.prototype.findlastindex/-/array.prototype.findlastindex-1.2.6.tgz",
      "integrity": "sha512-F/TKATkzseUExPlfvmwQKGITM3DGTK+vkAsCZoDc5daVygbJBnjEUCbgkAvVFsgfXfX4YIqZ/27G3k3tdXrTxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-shim-unscopables": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flat": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.3.3.tgz",
      "integrity": "sha512-rwG/ja1neyLqCuGZ5YYrznA62D4mZXg0i1cIskIUKSiqF3Cje9/wXAls9B9s1Wa2fomMsIv8czB8jZcPmxCXFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flatmap": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flatmap/-/array.prototype.flatmap-1.3.3.tgz",
      "integrity": "sha512-Y7Wt51eKJSyi80hFrJCePGGNo5ktJCslFuboqJsbf57CCPcm5zztluPlc4/aD8sWsKvlwatezpV4U1efk8kpjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.tosorted": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/array.prototype.tosorted/-/array.prototype.tosorted-1.1.4.tgz",
      "integrity": "sha512-p6Fx8B7b7ZhL/gmUsAy0D15WhvDccw3mnGNbZpi3pmeJdxtWsj2jEaI4Y6oo3XiHfzuSgPwKc04MYt6KgvC/wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3",
        "es-errors": "^1.3.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/arraybuffer.prototype.slice": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/arraybuffer.prototype.slice/-/arraybuffer.prototype.slice-1.0.4.tgz",
      "integrity": "sha512-BNoCY6SXXPQ7gF2opIP4GBE+Xw7U+pHMYKuzjgCN3GwiaIR09UUeKfheyIry77QtrCBlC0KK0q5/TER/tYh3PQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.1",
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "is-array-buffer": "^3.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ast-types-flow": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.8.tgz",
      "integrity": "sha512-OH/2E5Fg20h2aPrbe+QL8JZQFko0YZaF+j4mnQ7BGhfavO7OpSLa8a0y9sBwomHdSbkhTS8TQNayBfnW5DwbvQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/async-function": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-function/-/async-function-1.0.0.tgz",
      "integrity": "sha512-hsU18Ae8CDTR6Kgu9DYf0EbCr/a5iGL0rytQDobUcdpYOKokk8LEjVphnXkDkgpi0wYVsqrXuP0bZxJaTqdgoA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/autoprefixer": {
      "version": "10.4.19",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.19.tgz",
      "integrity": "sha512-BaENR2+zBZ8xXhM4pUaKUxlVdxZ0EZhjvbopwnXmxRUfqDmwSpC2lAi/QXvx7NRdPCo1WKEcEF6mV64si1z4Ew==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.23.0",
        "caniuse-lite": "^1.0.30001599",
        "fraction.js": "^4.3.7",
        "normalize-range": "^0.1.2",
        "picocolors": "^1.0.0",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/available-typed-arrays": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.7.tgz",
      "integrity": "sha512-wvUjBtSGN7+7SjNpq/9M2Tg350UZD3q62IFZLbRAR1bSMlCo1ZaeW+BJ+D090e4hIIZLBcTDWe4Mh4jvUDajzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "possible-typed-array-names": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/axe-core": {
      "version": "4.13.0",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.13.0.tgz",
      "integrity": "sha512-UzGt8zg7Ny8djbYMhxl2zuEevVa7r2gJjYY5Lwr1xM7+XU2nd6CkIWFTVcCIbAP63vSz71NaVyyuSk9lHKcy0A==",
      "dev": true,
      "license": "MPL-2.0",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/axobject-query": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-4.1.0.tgz",
      "integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.23",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.23.tgz",
      "integrity": "sha512-le521dGVfxM7yRX0EikCoSz+rOK+hHzdDt/E7mG1jOJB/6WAAUuwVroLwaB7ApaUsz5Q0kFlDXLSA9MheUIfRQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/bcryptjs": {
      "version": "2.4.3",
      "resolved": "https://registry.npmjs.org/bcryptjs/-/bcryptjs-2.4.3.tgz",
      "integrity": "sha512-V/Hy/X9Vt7f3BbPJEi8BdVFMByHi+jNXrYkW3huaybV/kQ0KJg0Y6PkEMbn+zeT+i+SiKZ/HMqJGIIt4LZDqNQ==",
      "license": "MIT"
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.21",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.21.tgz",
      "integrity": "sha512-9zeA+KLZNNzglF2TPKRQEDyx6Yby7daAkuy8MiPzpXPsYDWi/DRM8jmwUDxokQjYqBpv5DgPiwD4h4ZZSy1Ujw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.29.0",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.29.0.tgz",
      "integrity": "sha512-3GSvyjvDI4Dur1Meg2BekJquu5uF+9R9a1+5M1Mde192eZoXbeXjzgOsgqPS2V8D5wrrip0gR5Hf/GhWQ9ZzaA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.23",
        "caniuse-lite": "^1.0.30001810",
        "electron-to-chromium": "^1.5.427",
        "node-releases": "^2.0.55",
        "update-browserslist-db": "^1.3.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/call-bind": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.9.tgz",
      "integrity": "sha512-a/hy+pNsFUTR+Iz8TCJvXudKVLAnz/DyeSUo10I5yvFDQJBFU2s9uqQpoSrJlroHUKoKqzg+epxyP9lqFdzfBQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "get-intrinsic": "^1.3.0",
        "set-function-length": "^1.2.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase": {
      "version": "5.3.1",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-5.3.1.tgz",
      "integrity": "sha512-L28STB170nwWS63UjtlEOE3dldQApaJXZkOI1uMFfzf3rRuPegHaHesyee+YxQ+W6SvRDQV6UrdOdRiR153wJg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001810",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001810.tgz",
      "integrity": "sha512-TITQPUkaz+aVk5GL6NhOdwk1aEaNTSDPsGFWrTuhKGtjTF70jL/Oht2W4c6rXUe5fu7Ie19VIahAXHIIiWWNeg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.0.tgz",
      "integrity": "sha512-jFI8IQw4hczaL4ALINxqLEXQbWcNjoSkloa4IaufXCJr6QawJyw7tuRysRsrE8w2p/4gGaxKIt/hX3qz/IbD1A==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "2.0.0"
      },
      "funding": {
        "url": "https://joebell.co.uk"
      }
    },
    "node_modules/class-variance-authority/node_modules/clsx": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.0.0.tgz",
      "integrity": "sha512-rQ1+kcj+ttHG0MKVGBUXwayCCF1oh39BF5COIpRzuCEv8Mwjv0XucrI2ExNTOn9IlLifGClWQcU9BrZORvtw6Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/cliui": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-6.0.0.tgz",
      "integrity": "sha512-t6wbgtoCXvAzst7QgXxJYqPt0usEfbgQdftEPbLL/cvv6HPE5VgvqCuAIDR0NgU52ds6rFwqrgakNLrHEjCbrQ==",
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.0",
        "wrap-ansi": "^6.2.0"
      }
    },
    "node_modules/cliui/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/cliui/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/wrap-ansi": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz",
      "integrity": "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.6.0.tgz",
      "integrity": "sha512-U71cyTamuh1CRNCfpGY6to28lxvNwPG4Guz/EVjgf3Jmzv0vlDp1atT9eS5dDjMYHucpHbWns6Lwf3BKz6svdw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/damerau-levenshtein": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",
      "integrity": "sha512-sdQSFB7+llfUcQHUQO3+B8ERRj0Oa4w9POWMI/puGtuf7gFywGmkaLCElnudfTiKZV+NvHqL0ifzdrI8Ro7ESA==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/data-view-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-buffer/-/data-view-buffer-1.0.2.tgz",
      "integrity": "sha512-EmKO5V3OLXh1rtK2wgXRansaK1/mtVdTUEiEI0W8RkvgT05kfxaH29PliLnpLP73yYO6142Q72QNa8Wx/A5CqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/data-view-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-byte-length/-/data-view-byte-length-1.0.2.tgz",
      "integrity": "sha512-tuhGbE6CfTM9+5ANGf+oQb72Ky/0+s3xKUpHvShfiz2RxMFgFPjsXuRLBVMtvMs15awe45SRb83D6wH4ew6wlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/inspect-js"
      }
    },
    "node_modules/data-view-byte-offset": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/data-view-byte-offset/-/data-view-byte-offset-1.0.1.tgz",
      "integrity": "sha512-BS8PfmtDGnrgYdOonGZQdLZslWIeCGFP9tpan0hi1Co2Zr2NKADsvGYA8XxuG/4UWgJ6Cjtv+YJnB6MM69QGlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/date-fns": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-3.6.0.tgz",
      "integrity": "sha512-fRHTG8g/Gif+kSh50gaGEdToemgfj74aRX3swtiouboip5JDLAyDE9F11nHMIcvOaXeOC6D7SpNhi7uFyB7Uww==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decamelize": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/decamelize/-/decamelize-1.2.0.tgz",
      "integrity": "sha512-z2S+W9X73hAUUki+N+9Za2lBlun89zigOyGrsax+KUQ6wKW4ZoWpEYBkGhQjwAjjDCkWxhY0VKEhk8wzY7F5cA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/define-data-property": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/define-data-property/-/define-data-property-1.1.4.tgz",
      "integrity": "sha512-rBMvIzlpA8v6E+SJZoo++HAYqsLrkg7MSfIinMPFhmkorw7X+dOXVJQs+QT69zGkzMyfDnIMN2Wid1+NbL3T+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0",
        "es-errors": "^1.3.0",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/define-properties": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.1.tgz",
      "integrity": "sha512-8QmQKqEASLd5nx0U1B1okLElbUuuttJ/AnYmRXbbbGDWh6uS208EjD4Xqq/I9wK7u0v6O08XhTWnt5XtEbR6Dg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.0.1",
        "has-property-descriptors": "^1.0.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/detect-node-es": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
      "license": "MIT"
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dijkstrajs": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/dijkstrajs/-/dijkstrajs-1.0.3.tgz",
      "integrity": "sha512-qiSlmBq9+BCdCA/L46dw8Uy93mloxsPSbwnm5yrKn2vMPiy8KyAskTF6zuV/j5BMsmOGZDPs7KjU+mjb670kfA==",
      "license": "MIT"
    },
    "node_modules/dir-glob": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-3.0.1.tgz",
      "integrity": "sha512-WkrWp9GR4KXfKGYzOLmTuGVi1UWFfws377n9cc55/tb6DuqyF6pcQ5AbiHEshaDpY9v6oaSr2XCDidGmMwdzIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-type": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/doctrine": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
      "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.428",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.428.tgz",
      "integrity": "sha512-1JxbaFJj1bRKurj1uY3l4xxpU9kOUAUjcIgApj0qu1Pao5GhoIWI8iL0BeMYJ2njig1hBx0A7eKD9VGjH9wlHw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/es-abstract": {
      "version": "1.24.2",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.2.tgz",
      "integrity": "sha512-2FpH9Q5i2RRwyEP1AylXe6nYLR5OhaJTZwmlcP0dL/+JCbgg7yyEo/sEK6HeGZRf3dFpWwThaRHVApXSkW3xeg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.2",
        "arraybuffer.prototype.slice": "^1.0.4",
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "data-view-buffer": "^1.0.2",
        "data-view-byte-length": "^1.0.2",
        "data-view-byte-offset": "^1.0.1",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-set-tostringtag": "^2.1.0",
        "es-to-primitive": "^1.3.0",
        "function.prototype.name": "^1.1.8",
        "get-intrinsic": "^1.3.0",
        "get-proto": "^1.0.1",
        "get-symbol-description": "^1.1.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "internal-slot": "^1.1.0",
        "is-array-buffer": "^3.0.5",
        "is-callable": "^1.2.7",
        "is-data-view": "^1.0.2",
        "is-negative-zero": "^2.0.3",
        "is-regex": "^1.2.1",
        "is-set": "^2.0.3",
        "is-shared-array-buffer": "^1.0.4",
        "is-string": "^1.1.1",
        "is-typed-array": "^1.1.15",
        "is-weakref": "^1.1.1",
        "math-intrinsics": "^1.1.0",
        "object-inspect": "^1.13.4",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.7",
        "own-keys": "^1.0.1",
        "regexp.prototype.flags": "^1.5.4",
        "safe-array-concat": "^1.1.3",
        "safe-push-apply": "^1.0.0",
        "safe-regex-test": "^1.1.0",
        "set-proto": "^1.0.0",
        "stop-iteration-iterator": "^1.1.0",
        "string.prototype.trim": "^1.2.10",
        "string.prototype.trimend": "^1.0.9",
        "string.prototype.trimstart": "^1.0.8",
        "typed-array-buffer": "^1.0.3",
        "typed-array-byte-length": "^1.0.3",
        "typed-array-byte-offset": "^1.0.4",
        "typed-array-length": "^1.0.7",
        "unbox-primitive": "^1.1.0",
        "which-typed-array": "^1.1.19"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-abstract-get": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/es-abstract-get/-/es-abstract-get-1.0.0.tgz",
      "integrity": "sha512-6PMWXpdhshVvFp+FoWYs1EvG1Nj0tvk0dZM+XcK0xMEM1czRVcP6ohqPWHy6qPagSpC8j4+p89WXlT+xXJs/fg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.2",
        "is-callable": "^1.2.7",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-iterator-helpers": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.4.0.tgz",
      "integrity": "sha512-c/A0P0oxkACDc+cKWw8evLXK83oBKgn0qPOqCYT4x9uolpCIJAcYvJC9QYKNDRPsTeGyCrQ326jrvgZWdCdK5Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-set-tostringtag": "^2.1.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "iterator.prototype": "^1.1.5",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-shim-unscopables": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/es-shim-unscopables/-/es-shim-unscopables-1.1.0.tgz",
      "integrity": "sha512-d9T8ucsEhh8Bi1woXCf+TIKDIROLG5WCkxg8geBCbvk22kzwC5G2OnXVMO6FUsvQlgUUXQ2itephWDLqDzbeCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-to-primitive": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.3.4.tgz",
      "integrity": "sha512-yPDz7wqpg1/mmHLmS3tcfTfbw5f1eryXvyghYBffGdERwe+mV7ZcWzTR8LR17Kvqt3qfPurjlonmnq3MKXIOXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-abstract-get": "^1.0.0",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "is-callable": "^1.2.7",
        "is-date-object": "^1.1.0",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-8.57.0.tgz",
      "integrity": "sha512-dZ6+mexnaTIbSBZWgou51U6OmzIhYM2VcNdtiTtI7qPNZm35Akpr0f6vtw3w1Kmn5PYo+tZVfh13WrhpS6oLqQ==",
      "deprecated": "This version is no longer supported. Please see https://eslint.org/version-support for other options.",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.2.0",
        "@eslint-community/regexpp": "^4.6.1",
        "@eslint/eslintrc": "^2.1.4",
        "@eslint/js": "8.57.0",
        "@humanwhocodes/config-array": "^0.11.14",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@nodelib/fs.walk": "^1.2.8",
        "@ungap/structured-clone": "^1.2.0",
        "ajv": "^6.12.4",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.2",
        "debug": "^4.3.2",
        "doctrine": "^3.0.0",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^7.2.2",
        "eslint-visitor-keys": "^3.4.3",
        "espree": "^9.6.1",
        "esquery": "^1.4.2",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^6.0.1",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "globals": "^13.19.0",
        "graphemer": "^1.4.0",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "is-path-inside": "^3.0.3",
        "js-yaml": "^4.1.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "levn": "^0.4.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.2",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3",
        "strip-ansi": "^6.0.1",
        "text-table": "^0.2.0"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-config-next": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-14.2.5.tgz",
      "integrity": "sha512-zogs9zlOiZ7ka+wgUnmcM0KBEDjo4Jis7kxN1jvC0N4wynQ2MIx/KBkg4mVF63J5EK4W0QMCn7xO3vNisjaAoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@next/eslint-plugin-next": "14.2.5",
        "@rushstack/eslint-patch": "^1.3.3",
        "@typescript-eslint/parser": "^5.4.2 || ^6.0.0 || 7.0.0 - 7.2.0",
        "eslint-import-resolver-node": "^0.3.6",
        "eslint-import-resolver-typescript": "^3.5.2",
        "eslint-plugin-import": "^2.28.1",
        "eslint-plugin-jsx-a11y": "^6.7.1",
        "eslint-plugin-react": "^7.33.2",
        "eslint-plugin-react-hooks": "^4.5.0 || 5.0.0-canary-7118f5dd7-20230705"
      },
      "peerDependencies": {
        "eslint": "^7.23.0 || ^8.0.0",
        "typescript": ">=3.3.1"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-import-resolver-node": {
      "version": "0.3.10",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.10.tgz",
      "integrity": "sha512-tRrKqFyCaKict5hOd244sL6EQFNycnMQnBe+j8uqGNXYzsImGbGUU4ibtoaBmv5FLwJwcFJNeg1GeVjQfbMrDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7",
        "is-core-module": "^2.16.1",
        "resolve": "^2.0.0-next.6"
      }
    },
    "node_modules/eslint-import-resolver-node/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-import-resolver-typescript": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-typescript/-/eslint-import-resolver-typescript-3.10.1.tgz",
      "integrity": "sha512-A1rHYb06zjMGAxdLSkN2fXPBwuSaQ0iO5M/hdyS0Ajj1VBaRp0sPD3dn1FhME3c/JluGFbwSxyCfqdSbtQLAHQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@nolyfill/is-core-module": "1.0.39",
        "debug": "^4.4.0",
        "get-tsconfig": "^4.10.0",
        "is-bun-module": "^2.0.0",
        "stable-hash": "^0.0.5",
        "tinyglobby": "^0.2.13",
        "unrs-resolver": "^1.6.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-import-resolver-typescript"
      },
      "peerDependencies": {
        "eslint": "*",
        "eslint-plugin-import": "*",
        "eslint-plugin-import-x": "*"
      },
      "peerDependenciesMeta": {
        "eslint-plugin-import": {
          "optional": true
        },
        "eslint-plugin-import-x": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils": {
      "version": "2.14.0",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.14.0.tgz",
      "integrity": "sha512-W2WCRZ9Dqntd+2u8jJcVMV2PKulc6RdLgUUoh/yQr3uB6lo/ZOeGx11sv60/8S4QFFKNslAlWhr9u0Ef7ZW6Ig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import": {
      "version": "2.32.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.32.0.tgz",
      "integrity": "sha512-whOE1HFo/qJDyX4SnXzP4N6zOWn79WhnCUY/iDR0mPfQZO8wcYE4JClzI2oZrhBnnMUCBCHZhO6VQyoBU95mZA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rtsao/scc": "^1.1.0",
        "array-includes": "^3.1.9",
        "array.prototype.findlastindex": "^1.2.6",
        "array.prototype.flat": "^1.3.3",
        "array.prototype.flatmap": "^1.3.3",
        "debug": "^3.2.7",
        "doctrine": "^2.1.0",
        "eslint-import-resolver-node": "^0.3.9",
        "eslint-module-utils": "^2.12.1",
        "hasown": "^2.0.2",
        "is-core-module": "^2.16.1",
        "is-glob": "^4.0.3",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "object.groupby": "^1.0.3",
        "object.values": "^1.2.1",
        "semver": "^6.3.1",
        "string.prototype.trimend": "^1.0.9",
        "tsconfig-paths": "^3.15.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/eslint-plugin-jsx-a11y": {
      "version": "6.10.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.10.2.tgz",
      "integrity": "sha512-scB3nz4WmG75pV8+3eRUQOHZlNSUhFNq37xnpgRkCCELU3XMvXAxLk1eqWWyE22Ki4Q01Fnsw9BA3cJHDPgn2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "aria-query": "^5.3.2",
        "array-includes": "^3.1.8",
        "array.prototype.flatmap": "^1.3.2",
        "ast-types-flow": "^0.0.8",
        "axe-core": "^4.10.0",
        "axobject-query": "^4.1.0",
        "damerau-levenshtein": "^1.0.8",
        "emoji-regex": "^9.2.2",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^3.3.5",
        "language-tags": "^1.0.9",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "safe-regex-test": "^1.0.3",
        "string.prototype.includes": "^2.0.1"
      },
      "engines": {
        "node": ">=4.0"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-react": {
      "version": "7.37.5",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.37.5.tgz",
      "integrity": "sha512-Qteup0SqU15kdocexFNAJMvCJEfa2xUKNV4CC1xsVMrIIqEy3SQ/rqyxCWNzfrd3/ldy6HMlD2e0JDVpDg2qIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.8",
        "array.prototype.findlast": "^1.2.5",
        "array.prototype.flatmap": "^1.3.3",
        "array.prototype.tosorted": "^1.1.4",
        "doctrine": "^2.1.0",
        "es-iterator-helpers": "^1.2.1",
        "estraverse": "^5.3.0",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^2.4.1 || ^3.0.0",
        "minimatch": "^3.1.2",
        "object.entries": "^1.1.9",
        "object.fromentries": "^2.0.8",
        "object.values": "^1.2.1",
        "prop-types": "^15.8.1",
        "resolve": "^2.0.0-next.5",
        "semver": "^6.3.1",
        "string.prototype.matchall": "^4.0.12",
        "string.prototype.repeat": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7"
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "5.0.0-canary-7118f5dd7-20230705",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.0.0-canary-7118f5dd7-20230705.tgz",
      "integrity": "sha512-AZYbMo/NW9chdL7vk6HQzQhT+PvTAEVqWk9ziruUoW2kAOcN5qNyelv70e0F1VNQAbvutOC9oc+xfWycI9FxDw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0"
      }
    },
    "node_modules/eslint-plugin-react/node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/eslint-plugin-react/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/eslint-scope": {
      "version": "7.2.2",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-7.2.2.tgz",
      "integrity": "sha512-dOt21O7lTMhDM+X9mB4GX+DZrZtCUJPL/wlcTqxyrx5IvO0IYtILdtrQGQp+8n5S0gwSVmOf9NQrjMOgfQZlIg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/espree/-/espree-9.6.1.tgz",
      "integrity": "sha512-oruZaFkjorTpF32kDSI5/75ViwGeZginGGy2NoOSg3Q9bnwlnmDm4HLnkl0RE3n+njDXR037aY1+x58Z/zFdwQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.9.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^3.4.1"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/file-entry-cache": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-6.0.1.tgz",
      "integrity": "sha512-7Gps/XWymbLk2QLYK4NzpMOrYjMhdIxXuIvy2QBsLE6ljuodKvdkWs/cpyJJ3CVIVpH0Oi1Hvg1ovbMzLdFBBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^3.0.4"
      },
      "engines": {
        "node": "^10.12.0 || >=12.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-3.2.0.tgz",
      "integrity": "sha512-CYcENa+FtcUKLmhhqyctpclsq7QF38pKjZHsGNiSQF5r4FtoKDWabFDl3hzaEQMvT1LHEysw5twgLvpYYb4vbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.3",
        "rimraf": "^3.0.2"
      },
      "engines": {
        "node": "^10.12.0 || >=12.0.0"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.4.tgz",
      "integrity": "sha512-5+ybhBZANEJxaH3X5evAFatUxLfEHSr7n6kYJ+1Qd0mUqr4eu9gIf6GDbWHf8RJijHrjjO8G+la14SlL2SeS1Q==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/for-each": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.5.tgz",
      "integrity": "sha512-dKx12eRCVIzqCxFGplyFKJMPvLEWgmNtUrpTiJIR5u97zEhRG8ySrtboPHZXx7daLxQVrl643cTzbab2tkQjxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/foreground-child": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.1.tgz",
      "integrity": "sha512-gIXjKqtFuWEgzFRJA9WCQeSJLZDjgJUOMCMzxtvFq/37KojM1BFGufqsCy0r4qSQmYLsZYMeyRqzIWOMup03sw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "cross-spawn": "^7.0.6",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/fraction.js": {
      "version": "4.3.7",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-4.3.7.tgz",
      "integrity": "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "patreon",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/function.prototype.name": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/function.prototype.name/-/function.prototype.name-1.2.0.tgz",
      "integrity": "sha512-jObKIik1P2QjPHP5nz5BaOtUlfgS0fWo8IUByNXkM+o+02sJOi94em77GwJKQSJ3gfPHdgzLNrHc1uokV4P/ew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2",
        "hasown": "^2.0.4",
        "is-callable": "^1.2.7",
        "is-document.all": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/functions-have-names": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/functions-have-names/-/functions-have-names-1.2.3.tgz",
      "integrity": "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/generator-function": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/generator-function/-/generator-function-2.0.1.tgz",
      "integrity": "sha512-SFdFmIJi+ybC0vjlHN0ZGVGHc3lgE0DxPAT0djjVg+kjOnSqclqmj0KQ7ykTOLP6YxoqOvuAODGdcHJn+43q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-nonce": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-symbol-description": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/get-symbol-description/-/get-symbol-description-1.1.0.tgz",
      "integrity": "sha512-w9UMqWwJxHNOvoNzSJ2oPF5wvYcvP7jUvYzhp67yEhTi17ZDBBC1z9pTdGuzjD+EFIqLSYRweZjqfiPzQ06Ebg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.14.3",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.3.tgz",
      "integrity": "sha512-++QEw4DIY7WGoukz+/+A/8dGYPT9l9yIadnmSgZ8Rjr3YVSVDipQSO9CdnJo9ePqFqUUqh+wk9uIaoiAwsiPkA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/glob": {
      "version": "10.3.10",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.3.10.tgz",
      "integrity": "sha512-fa46+tv1Ak0UPK1TOy/pZrIybNNt4HCv7SDzwyfiOZkvZLEbjsZkJBPtDHVshZjbecAoAGSC20MjLDG/qr679g==",
      "deprecated": "Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^2.3.5",
        "minimatch": "^9.0.1",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0",
        "path-scurry": "^1.10.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/glob/node_modules/brace-expansion": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.7.tgz",
      "integrity": "sha512-uZbew1NqdmPDTMJ8ah1y+b+9QEJrfkXFk3RcTQw3X0jW/xRUvFKsg1CfQdSYGdTbXZWExtU3J3ccxtnfw1Fi0g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/glob/node_modules/minimatch": {
      "version": "9.0.9",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.9.tgz",
      "integrity": "sha512-OBwBN9AL4dqmETlpS2zasx+vTeWclWzkblfZk7KTA5j3jeOONz/tRCnZomUyvNg83wL5Zv9Ss6HMJXAgL8R2Yg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.2"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/globals": {
      "version": "13.24.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-13.24.0.tgz",
      "integrity": "sha512-AhO5QUcj8llrbG09iWhPU2B204J1xnPeL8kQmVorSsy+Sjj1sk8gIyh6cUocGmH4L0UuhAJy+hJMRA4mgA4mFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "type-fest": "^0.20.2"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/globalthis": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.4.tgz",
      "integrity": "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.2.1",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/globby": {
      "version": "11.1.0",
      "resolved": "https://registry.npmjs.org/globby/-/globby-11.1.0.tgz",
      "integrity": "sha512-jhIXaOzy1sb8IyocaruWSn1TjmnBVs8Ayhcy83rmxNJ8q2uWKCAj3CnJY+KpGSXCueAPc0i05kVvVKtP1t9S3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-union": "^2.1.0",
        "dir-glob": "^3.0.1",
        "fast-glob": "^3.2.9",
        "ignore": "^5.2.0",
        "merge2": "^1.4.1",
        "slash": "^3.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/graphemer": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/graphemer/-/graphemer-1.4.0.tgz",
      "integrity": "sha512-EtKwoO6kxCL9WO5xipiHTZlSzBm7WLT627TqC/uVRd0HKmq8NXyebnNYxDoBi7wt8eTWrUrKXCOVaFq9x1kgag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/has-bigints": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.1.0.tgz",
      "integrity": "sha512-R3pbpkcIqv2Pm3dUwgjclDRVmWpTJW2DcMzcIhEXEx1oh/CEMObMm3KLmRJOdvhM7o4uQBnwr8pzRK2sJWIqfg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-property-descriptors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-property-descriptors/-/has-property-descriptors-1.0.2.tgz",
      "integrity": "sha512-55JNKuIW+vq4Ke1BjOTjM2YctQIvCT7GFzHwmfZPGo5wnrgkid0YQtnAleFSqumZm4az3n2BS+erby5ipJdgrg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-proto": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.2.0.tgz",
      "integrity": "sha512-KIL7eQPfHQRC8+XluaIw7BHUwwqL19bQn4hzNgdr+1wXoU0KKj6rufu47lhY7KbJR2C6T6+PfyN0Ea7wkSS+qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
      "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/internal-slot": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.1.0.tgz",
      "integrity": "sha512-4gd7VpWNQNB4UKKCFFVcp1AVv+FMOgs9NKzjHKusc8jTMhd5eL1NqQqOpE0KzMds804/yHlglp3uxgluOqAPLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "hasown": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/is-array-buffer": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
      "integrity": "sha512-DDfANUiiG2wC1qawP66qlTugJeL5HyzMpfr8lLK+jMQirGzNod0B12cFB/9q838Ru27sBwfw78/rdoU7RERz6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-async-function": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-async-function/-/is-async-function-2.1.1.tgz",
      "integrity": "sha512-9dgM/cZBnNvjzaMYHVoxxfPj2QXt22Ev7SuuPrs+xav0ukGB0S6d4ydZdEiM48kLx5kDV+QBPrpVnFyefL8kkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "async-function": "^1.0.0",
        "call-bound": "^1.0.3",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bigint": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.1.0.tgz",
      "integrity": "sha512-n4ZT37wG78iz03xPRKJrHTdZbe3IicyucEtdRsV5yglwc3GyUfbAfpSeD0FJ41NbUNSt5wbhqfp1fS+BgnvDFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-bigints": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-boolean-object": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.2.2.tgz",
      "integrity": "sha512-wa56o2/ElJMYqjCjGkXri7it5FbebW5usLw/nPmCMs5DeZ7eziSYZhSmPRn0txqeW4LnAmQQU7FgqLpsEFKM4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bun-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-bun-module/-/is-bun-module-2.0.0.tgz",
      "integrity": "sha512-gNCGbnnnnFAUGKeZ9PdbyeGYJqewpmc2aKHUEMO5nQPWU9lOmv7jcmQIv+qHD8fXW6W7qfuCwX4rY9LNRjXrkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.7.1"
      }
    },
    "node_modules/is-callable": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
      "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.2",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz",
      "integrity": "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-data-view": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-data-view/-/is-data-view-1.0.2.tgz",
      "integrity": "sha512-RKtWF8pGmS87i2D6gqQu/l7EYRlVdfzemCJN/P3UOs//x1QE7mfhvzHIApBTRf7axvT6DMGwSwBXYCT0nfB9xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "get-intrinsic": "^1.2.6",
        "is-typed-array": "^1.1.13"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-date-object": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.1.0.tgz",
      "integrity": "sha512-PwwhEakHVKTdRNVOw+/Gyh0+MzlCl4R6qKvkhuvLtPMggI1WAHt9sOwZxQLSGpUaDnrdyDsomoRgNnCfKNSXXg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-document.all": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-document.all/-/is-document.all-1.0.0.tgz",
      "integrity": "sha512-+XSoyS05OdBbhFuELhgTCpFNHkpBOJqtsZfUFFpe5QTw+9Sjbh8zitxhQkYAo6wV7e1Vb8cAPvpCk9jGam/82g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-finalizationregistry": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-finalizationregistry/-/is-finalizationregistry-1.1.1.tgz",
      "integrity": "sha512-1pC6N8qWJbWoPtEjgcL2xyhQOP491EQjeUo3qTKcmV8YSDDJrOepfG8pcC7h/QgnQHYSv0mJ3Z/ZWxmatVrysg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-generator-function": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.1.2.tgz",
      "integrity": "sha512-upqt1SkGkODW9tsGNG5mtXTXtECizwtS2kA161M+gJPc1xdb/Ax629af6YrTwcOeQHbewrPNlE5Dx7kzvXTizA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "generator-function": "^2.0.0",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-map": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-map/-/is-map-2.0.3.tgz",
      "integrity": "sha512-1Qed0/Hr2m+YqxnM09CjA2d/i6YZNfF6R2oRAOj36eUdS6qIV/huPJNSEpKbupewFs+ZsJlxsjjPbc0/afW6Lw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-negative-zero": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.3.tgz",
      "integrity": "sha512-5KoIu2Ngpyek75jXodFvnafB6DJgr3u8uuK0LEZJjrU19DrMD3EVERaR8sjz8CCGgpZvxPl9SuE1GMVPFHx1mw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-number-object": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-number-object/-/is-number-object-1.1.1.tgz",
      "integrity": "sha512-lZhclumE1G6VYD8VHe35wFaIif+CTy5SJIi5+3y4psDgWu4wPDoBhF8NxUOinEc7pHgiTsT6MaBb92rKhhD+Xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-path-inside": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-3.0.3.tgz",
      "integrity": "sha512-Fd4gABb+ycGAmKou8eMftCupSir5lRxqf4aD/vd0cD2qc4HL07OjCeuHMr8Ro4CoMaeCKDB0/ECBOVWjTwUvPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-set": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-set/-/is-set-2.0.3.tgz",
      "integrity": "sha512-iPAjerrse27/ygGLxw+EBR9agv9Y6uLeYVJMu+QNCoouJ1/1ri0mGrcWpfCqFZuzzx3WjtwxG098X+n4OuRkPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-shared-array-buffer": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-shared-array-buffer/-/is-shared-array-buffer-1.0.4.tgz",
      "integrity": "sha512-ISWac8drv4ZGfwKl5slpHG9OwPNty4jOWPRIhBpxOoD+hqITiwuipOQ2bNthAzwA3B4fIjO4Nln74N0S9byq8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-string": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.1.1.tgz",
      "integrity": "sha512-BtEeSsoaQjlSPBemMQIrY1MY0uM6vnS1g5fmufYOtnxLGUZM2178PKbhsk7Ffv58IX+ZtcvoGwccYsh0PglkAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-symbol": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.1.1.tgz",
      "integrity": "sha512-9gGx6GTtCQM73BgmHQXfDmLtfjjTUDSyoxTCbp5WtoixAhfgsDirWIcVQ/IHpvI5Vgd5i/J5F7B9cN/WlVbC/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-symbols": "^1.1.0",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-typed-array": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.15.tgz",
      "integrity": "sha512-p3EcsicXjit7SaskXHs1hA91QxgTw46Fv6EFKKGS5DRFLD8yKnohjF3hxoju94b/OcMZoQukzpPpBE9uLVKzgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakmap": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/is-weakmap/-/is-weakmap-2.0.2.tgz",
      "integrity": "sha512-K5pXYOm9wqY1RgjpL3YTkF39tni1XajUIkawTLUo9EZEVUFga5gSQJF8nNS7ZwJQ02y+1YCNYcMh+HIf1ZqE+w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-weakref/-/is-weakref-1.1.1.tgz",
      "integrity": "sha512-6i9mGWSlqzNMEqpCp93KwRS1uUOodk2OJ6b+sq7ZPDSy2WuI5NFIxp/254TytR8ftefexkWn5xNiHUNpPOfSew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakset": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-weakset/-/is-weakset-2.0.4.tgz",
      "integrity": "sha512-mfcwb6IzQyOKTs84CQMrOwW4gQcaTOAWJ0zzJCl2WSPDrWk/OzDaImWFH3djXhb24g4eudZfLRozAvPGw4d9hQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/isarray": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
      "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/iterator.prototype": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/iterator.prototype/-/iterator.prototype-1.1.5.tgz",
      "integrity": "sha512-H0dkQoCa3b2VEeKQBOxFph+JAbcrQdE7KC0UkqwpLmv2EC4P41QXP+rqo9wYodACiG5/WM5s9oDApTU8utwj9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "get-proto": "^1.0.0",
        "has-symbols": "^1.1.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/jackspeak": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-2.3.6.tgz",
      "integrity": "sha512-N3yCS/NegsOBokc8GAdM8UcmfsKiSS8cipheD/nivzr700H+nsMOxJjQnvwOcRYVuFkdH0wGUvW2WbXGmrZGbQ==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/jose": {
      "version": "5.10.0",
      "resolved": "https://registry.npmjs.org/jose/-/jose-5.10.0.tgz",
      "integrity": "sha512-s+3Al/p9g32Iq+oqXxkW//7jk2Vig6FF1CFqzVXoTUXt2qz89YWbL+OwS17NFYEvxC35n0FKeGO2LGYSxeM2Gg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.3.2",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.3.2.tgz",
      "integrity": "sha512-SFNOvSJ+Dgf/9An904Yx+CgSlIPCkIpao4qo51lpee25TIRejdH3rhR4EZMGoNx3/TP3O+wzWuiTFl4sqbltzA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/puzrin"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/nodeca"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
      "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.0"
      },
      "bin": {
        "json5": "lib/cli.js"
      }
    },
    "node_modules/jsx-ast-utils": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-3.3.5.tgz",
      "integrity": "sha512-ZZow9HBI5O6EPgSJLUb8n2NKgmVWTwCvHGwFuJlMjvLFqlGG6pjirPhtdsseaLZjSibD8eegzmYpUZwoIlj2cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.6",
        "array.prototype.flat": "^1.3.1",
        "object.assign": "^4.1.4",
        "object.values": "^1.1.6"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/language-subtag-registry": {
      "version": "0.3.23",
      "resolved": "https://registry.npmjs.org/language-subtag-registry/-/language-subtag-registry-0.3.23.tgz",
      "integrity": "sha512-0K65Lea881pHotoGEa5gDlMxt3pctLi2RplBb7Ezh4rRdLEOtgi7n4EwK9lamnUCkKBqaeKRVebTq6BAxSkpXQ==",
      "dev": true,
      "license": "CC0-1.0"
    },
    "node_modules/language-tags": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/language-tags/-/language-tags-1.0.9.tgz",
      "integrity": "sha512-MbjN408fEndfiQXbFQ1vnd+1NoLDsnQW41410oQBXiyXDMYH5z505juWa4KUE1LqxRC7DgOgZDbKLxHIwm27hA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "language-subtag-registry": "^0.3.20"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lilconfig": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz",
      "integrity": "sha512-utWOt/GHzuUxnLKxB6dk81RoOeoNeHgbrXiuGk4yyF5qlRz+iIVWu56E2fqGHFrXz0QNUhLB/8nKqvRH66JKGQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/lucide-react": {
      "version": "0.408.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.408.0.tgz",
      "integrity": "sha512-8kETAAeWmOvtGIr7HPHm51DXoxlfkNncQ5FZWXR+abX8saQwMYXANWIkUstaYtcKSo/imOe/q+tVFA8ANzdSVA==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.3.tgz",
      "integrity": "sha512-tEBHqDnIoM/1rXME1zgka9g6Q2lcoCkxHLuc7ODJ5BxbP5d4c2Z5cGgtXAku59200Cx7diuHTOYfSBD8n6mm8A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.19",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.19.tgz",
      "integrity": "sha512-Y2tUNy4ouw6tq5oDSKeQYGOyhkUBhNOcGV/02KC+6kd9eDGqdZd++mjMiIDilrBYvjEnCYvVtsuHCuP+okSfug==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/napi-postinstall": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/napi-postinstall/-/napi-postinstall-0.3.4.tgz",
      "integrity": "sha512-PHI5f1O0EP5xJ9gQmFGMS6IZcrVvTjpXjz7Na41gTE7eE2hK11lg04CECCYEEjdc17EV4DO+fkGEtt7TpTaTiQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "napi-postinstall": "lib/cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/napi-postinstall"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/next": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/next/-/next-14.2.5.tgz",
      "integrity": "sha512-0f8aRfBVL+mpzfBjYfQuLWh2WyAwtJXCRfkPF4UJ5qd2YwrHczsrSzXU4tRMV0OAxR8ZJZWPFn6uhSC56UTsLA==",
      "deprecated": "This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.",
      "license": "MIT",
      "dependencies": {
        "@next/env": "14.2.5",
        "@swc/helpers": "0.5.5",
        "busboy": "1.6.0",
        "caniuse-lite": "^1.0.30001579",
        "graceful-fs": "^4.2.11",
        "postcss": "8.4.31",
        "styled-jsx": "5.1.1"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "14.2.5",
        "@next/swc-darwin-x64": "14.2.5",
        "@next/swc-linux-arm64-gnu": "14.2.5",
        "@next/swc-linux-arm64-musl": "14.2.5",
        "@next/swc-linux-x64-gnu": "14.2.5",
        "@next/swc-linux-x64-musl": "14.2.5",
        "@next/swc-win32-arm64-msvc": "14.2.5",
        "@next/swc-win32-ia32-msvc": "14.2.5",
        "@next/swc-win32-x64-msvc": "14.2.5"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.41.2",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next-auth": {
      "version": "5.0.0-beta.19",
      "resolved": "https://registry.npmjs.org/next-auth/-/next-auth-5.0.0-beta.19.tgz",
      "integrity": "sha512-YHu1igcAxZPh8ZB7GIM93dqgY6gcAzq66FOhQFheAdOx1raxNcApt05nNyNCSB6NegSiyJ4XOPsaNow4pfDmsg==",
      "license": "ISC",
      "dependencies": {
        "@auth/core": "0.32.0"
      },
      "peerDependencies": {
        "@simplewebauthn/browser": "^9.0.1",
        "@simplewebauthn/server": "^9.0.2",
        "next": "^14 || ^15.0.0-0",
        "nodemailer": "^6.6.5",
        "react": "^18.2.0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@simplewebauthn/browser": {
          "optional": true
        },
        "@simplewebauthn/server": {
          "optional": true
        },
        "nodemailer": {
          "optional": true
        }
      }
    },
    "node_modules/next-auth/node_modules/@auth/core": {
      "version": "0.32.0",
      "resolved": "https://registry.npmjs.org/@auth/core/-/core-0.32.0.tgz",
      "integrity": "sha512-3+ssTScBd+1fd0/fscAyQN1tSygXzuhysuVVzB942ggU4mdfiTbv36P0ccVnExKWYJKvu3E2r3/zxXCCAmTOrg==",
      "license": "ISC",
      "dependencies": {
        "@panva/hkdf": "^1.1.1",
        "@types/cookie": "0.6.0",
        "cookie": "0.6.0",
        "jose": "^5.1.3",
        "oauth4webapi": "^2.9.0",
        "preact": "10.11.3",
        "preact-render-to-string": "5.2.3"
      },
      "peerDependencies": {
        "@simplewebauthn/browser": "^9.0.1",
        "@simplewebauthn/server": "^9.0.2",
        "nodemailer": "^6.8.0"
      },
      "peerDependenciesMeta": {
        "@simplewebauthn/browser": {
          "optional": true
        },
        "@simplewebauthn/server": {
          "optional": true
        },
        "nodemailer": {
          "optional": true
        }
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.4.31",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
      "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.6",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/node-exports-info": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/node-exports-info/-/node-exports-info-1.6.2.tgz",
      "integrity": "sha512-kXs9Go0cah0qHVV2v389IXQLdLCeE1xfFtjOAF+iobu0OIoG1pje8At2vMHyaPMiPMnG/LWP50twML21eMcAag==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array.prototype.flatmap": "^1.3.3",
        "es-errors": "^1.3.0",
        "object.entries": "^1.1.9",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/node-exports-info/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.55",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.55.tgz",
      "integrity": "sha512-mIrE/Cw9y+9Au6dS5vDKDhQza9YvG6w+ZrS6X+ZzA7yFW/soAeaups4Qzn1bL6g5FVy8WtP79+0j82oPIbqRjQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/normalize-range": {
      "version": "0.1.2",
      "resolved": "https://registry.npmjs.org/normalize-range/-/normalize-range-0.1.2.tgz",
      "integrity": "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/oauth4webapi": {
      "version": "2.17.0",
      "resolved": "https://registry.npmjs.org/oauth4webapi/-/oauth4webapi-2.17.0.tgz",
      "integrity": "sha512-lbC0Z7uzAFNFyzEYRIC+pkSVvDHJTbEW+dYlSBAlCYDe6RxUkJ26bClhk8ocBZip1wfI9uKTe0fm4Ib4RHn6uQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.assign": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.7.tgz",
      "integrity": "sha512-nK28WOo+QIjBkDduTINE4JkF/UJJKyf2EJxvJKfblDpyg0Q+pkOHNTL0Qwy6NP6FhE/EnzV73BxxqcJaXY9anw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0",
        "has-symbols": "^1.1.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.entries": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/object.entries/-/object.entries-1.1.9.tgz",
      "integrity": "sha512-8u/hfXFRBD1O0hPUjioLhoWFHRmt6tKA4/vZPyckBr18l1KE9uHrFaFaUi8MDRTpi4uak2goyPTSNJLXX2k2Hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.fromentries": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.8.tgz",
      "integrity": "sha512-k6E21FzySsSK5a21KRADBd/NGneRegFO5pLHfdQLpRDETUNJueLXs3WCzyQ3tFRDYgbq3KHGXfTbi2bs8WQ6rQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.groupby": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/object.groupby/-/object.groupby-1.0.3.tgz",
      "integrity": "sha512-+Lhy3TQTuzXI5hevh8sBGqbmurHbbIjAi0Z4S63nthVLmLxfbj4T54a4CfZrXIrt9iP4mVAPYMo/v99taj3wjQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.values": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.2.1.tgz",
      "integrity": "sha512-gXah6aZrcUxjWg2zR2MwouP2eHlCBzdV4pygudehaKXSGW4v2AsRQUK+lwwXhii6KFZcunEnmSUoYp5CXibxtA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/own-keys": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/own-keys/-/own-keys-1.0.2.tgz",
      "integrity": "sha512-19YVAg7T+WTrxggPukVq7DjTv6+PJ867TmhCvBsYwmbFCsZd344rq2Ld1p0wo8f8Qrrhgp82c6FJRqdXWtSEhg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "object-keys": "^1.1.1",
        "safe-push-apply": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-try": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/p-try/-/p-try-2.2.0.tgz",
      "integrity": "sha512-R4nPAVTAU0B9D35/Gk3uJf/7XYbQcyohSKdvAxIRSNghFl4e71hVoGnBNQz9cWaXxO2I10KTC+3jMdvvoKw6dQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-type": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
      "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/pngjs": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/pngjs/-/pngjs-5.0.0.tgz",
      "integrity": "sha512-40QW5YalBNfQo5yRYmiw7Yz6TKKVr3h6970B2YE+3fQpsWcrbj1PzJgxeJ19DRQjhMbKPIuMY8rFaXc8moolVw==",
      "license": "MIT",
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/possible-typed-array-names": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/possible-typed-array-names/-/possible-typed-array-names-1.1.0.tgz",
      "integrity": "sha512-/+5VFTchJDoVj3bhoqi6UeymcD00DAwb1nJwamzPvHEszJ4FpF6SNNbUbOS8yI56qHzdV8eK0qEfOSiodkTdxg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.40",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.40.tgz",
      "integrity": "sha512-YF2kKIUzAofPMpfH6hOi2cGnv/HrUlfucspc7pDyvv7kGdqXrfj8SCl/t8owkEgKEuu8ZcRjSOxFxVLqwChZ2Q==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.0.1",
        "source-map-js": "^1.2.0"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-import/node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.4.tgz",
      "integrity": "sha512-bIoJLOmjCO1S9XdY/DcnR5hJxvrDir1PbGChrzXG3vw0/FOliy/fA3dmdhQ441kah4gKv+TwckGzex6wNS5cnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/preact": {
      "version": "10.11.3",
      "resolved": "https://registry.npmjs.org/preact/-/preact-10.11.3.tgz",
      "integrity": "sha512-eY93IVpod/zG3uMF22Unl8h9KkrcKIRs2EGar8hwLZZDU1lkjph303V9HZBwufh2s736U6VXuhD109LYqPoffg==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/preact"
      }
    },
    "node_modules/preact-render-to-string": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/preact-render-to-string/-/preact-render-to-string-5.2.3.tgz",
      "integrity": "sha512-aPDxUn5o3GhWdtJtW0svRC2SS/l8D9MAgo2+AWml+BhDImb27ALf04Q2d+AHqUUOc6RdSXFIBVa2gxzgMKgtZA==",
      "license": "MIT",
      "dependencies": {
        "pretty-format": "^3.8.0"
      },
      "peerDependencies": {
        "preact": ">=10"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/pretty-format": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-3.8.0.tgz",
      "integrity": "sha512-WuxUnVtlWL1OfZFQFuqvnvs6MiAGk9UNsBostyBOB0Is9wb5uRESevA6rnl/rkksXaGX3GzZhPup5d6Vp1nFew==",
      "license": "MIT"
    },
    "node_modules/prisma": {
      "version": "5.16.1",
      "resolved": "https://registry.npmjs.org/prisma/-/prisma-5.16.1.tgz",
      "integrity": "sha512-Z1Uqodk44diztImxALgJJfNl2Uisl9xDRvqybMKEBYJLNKNhDfAHf+ZIJbZyYiBhLMbKU9cYGdDVG5IIXEnL2Q==",
      "devOptional": true,
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/engines": "5.16.1"
      },
      "bin": {
        "prisma": "build/index.js"
      },
      "engines": {
        "node": ">=16.13"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/qrcode": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/qrcode/-/qrcode-1.5.4.tgz",
      "integrity": "sha512-1ca71Zgiu6ORjHqFBDpnSMTR2ReToX4l1Au1VFLyVeBTFavzQnv5JxMFr3ukHVKpSrSA2MCk0lNJSykjUfz7Zg==",
      "license": "MIT",
      "dependencies": {
        "dijkstrajs": "^1.0.1",
        "pngjs": "^5.0.0",
        "yargs": "^15.3.1"
      },
      "bin": {
        "qrcode": "bin/qrcode"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/react-remove-scroll": {
      "version": "2.5.7",
      "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.5.7.tgz",
      "integrity": "sha512-FnrTWO4L7/Bhhf3CYBNArEG/yROV0tKmTv7/3h9QCFvH6sndeFf1wPqOcbFVu5VAulS5dV1wGT3GZZ/1GawqiA==",
      "license": "MIT",
      "dependencies": {
        "react-remove-scroll-bar": "^2.3.4",
        "react-style-singleton": "^2.2.1",
        "tslib": "^2.1.0",
        "use-callback-ref": "^1.3.0",
        "use-sidecar": "^1.1.2"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll-bar": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",
      "integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",
      "license": "MIT",
      "dependencies": {
        "react-style-singleton": "^2.2.2",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-style-singleton": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.3.tgz",
      "integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",
      "license": "MIT",
      "dependencies": {
        "get-nonce": "^1.0.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz",
      "integrity": "sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/reflect.getprototypeof": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/reflect.getprototypeof/-/reflect.getprototypeof-1.0.10.tgz",
      "integrity": "sha512-00o4I+DVrefhv+nX0ulyi3biSHCPDe+yLv5o/p6d/UVlirijB8E16FtfwSAi4g3tcqrQ4lRAqQSoFEZJehYEcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.7",
        "get-proto": "^1.0.1",
        "which-builtin-type": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/regexp.prototype.flags": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.5.4.tgz",
      "integrity": "sha512-dYqgNSZbDwkaJ2ceRd9ojCGjBq+mOm9LmtXnAnEGyHhN/5R7iDW2TRw3h+o/jCFxus3P2LfWIIiwowAjANm7IA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-errors": "^1.3.0",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/require-main-filename": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/require-main-filename/-/require-main-filename-2.0.0.tgz",
      "integrity": "sha512-NKN5kMDylKuldxYLSUfrbo5Tuzh4hd+2E8NPPX02mZtn1VuREQToYe/ZdlJy+J3uCpfaiGF05e7B8W0iXbQHmg==",
      "license": "ISC"
    },
    "node_modules/resolve": {
      "version": "2.0.0-next.7",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.7.tgz",
      "integrity": "sha512-tqt+NBWwyaMgw3zDsnygx4CByWjQEJHOPMdslYhppaQSJUtL/D4JO9CcBBlhPoI8lz9oJIDXkwXfhF4aWqP8xQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.2",
        "node-exports-info": "^1.6.0",
        "object-keys": "^1.1.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rimraf": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
      "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
      "deprecated": "Rimraf versions prior to v4 are no longer supported",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "glob": "^7.1.3"
      },
      "bin": {
        "rimraf": "bin.js"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/rimraf/node_modules/glob": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz",
      "integrity": "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==",
      "deprecated": "Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      },
      "engines": {
        "node": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/safe-array-concat": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.4.tgz",
      "integrity": "sha512-wtZlHyOje6OZTGqAoaDKxFkgRtkF9CnHAVnCHKfuj200wAgL+bSJhdsCD2l0Qx/2ekEXjPWcyKkfGb5CPboslg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",
        "has-symbols": "^1.1.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">=0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-push-apply": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
      "integrity": "sha512-iKE9w/Z7xCzUMIZqdBsp6pEQvwuEebH4vdpjcDWnyzaI6yl6O9FHvVpmGelvEHNsoY6wGblkxR6Zty/h00WiSA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "7.8.5",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.5.tgz",
      "integrity": "sha512-Y7/KDsb8LjooZpwaqGyulO6DQlksgCncchHGk+sZIY4SBvUocMBEFH5Ur1fI4dV+Jvl0w6cjvucaIi40puRioA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/set-blocking": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/set-blocking/-/set-blocking-2.0.0.tgz",
      "integrity": "sha512-KiKBS8AnWGEyLzofFfmvKwpdPzqiy16LvQfK3yv/fVH7Bj13/wl3JSR1J+rfgRE9q7xUJK4qvgS8raSOeLUehw==",
      "license": "ISC"
    },
    "node_modules/set-function-length": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
      "integrity": "sha512-pgRc4hJ4/sNjWCSS9AmnS40x3bNMDTknHgL5UaMBTMyJnU90EgWh1Rz+MC9eFu4BuN/UwZjKQuY/1v3rM7HMfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.2.4",
        "gopd": "^1.0.1",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-function-name": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/set-function-name/-/set-function-name-2.0.2.tgz",
      "integrity": "sha512-7PGFlmtwsEADb0WYyvCMa1t+yke6daIG4Wirafur5kcf+MhUnPms1UeR0CKQdTZD81yESwMHbtn+TR+dMviakQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-proto": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/set-proto/-/set-proto-1.0.0.tgz",
      "integrity": "sha512-RJRdvCo6IAnPdsvP/7m6bsQqNnn1FCBX5ZNtFL98MmFF/4xAIJTIg1YbHW5DC2W5SKZanrC6i4HsJqlajw/dZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.1.tgz",
      "integrity": "sha512-6x6dK6zJdpTzF4sQeNYxwtvBzf6Eg4GtlesS94HOvTudUeyK2WXAaIfmDgsyslYrRBeFIlsi54AYsFGUuhmvrQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4",
        "side-channel-list": "^1.0.1",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/slash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-3.0.0.tgz",
      "integrity": "sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stable-hash": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/stable-hash/-/stable-hash-0.0.5.tgz",
      "integrity": "sha512-+L3ccpzibovGXFK+Ap/f8LOS0ahMrHTf3xu7mMLSpEGU0EO9ucaysSylKo9eRDFNhWve/y275iPmIZ4z39a9iA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/stop-iteration-iterator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/stop-iteration-iterator/-/stop-iteration-iterator-1.1.0.tgz",
      "integrity": "sha512-eLoXW/DHyl62zxY4SCaIgnRhuMr6ri4juEYARS8E6sCEqzKpOiE521Ucofdx+KnDZl5xmvGYaaKCk5FEOxJCoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "internal-slot": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/string-width/node_modules/ansi-regex": {
      "version": "6.3.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.3.0.tgz",
      "integrity": "sha512-WpDfL7NO6j7tH88IDBNVdUJxDh9nmCteAVW9dsep846XdwF4naCBK+/tGLX3KJgcpgMRXCFlTM2hKGoK9FsdrQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/string-width/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/string.prototype.includes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.includes/-/string.prototype.includes-2.0.1.tgz",
      "integrity": "sha512-o7+c9bW6zpAdJHTtujeePODAhkuicdAryFsfVKwA+wGw89wJ4GTY484WTucM9hLtDEOpOvI+aHnzqnC5lHp4Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.matchall": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/string.prototype.matchall/-/string.prototype.matchall-4.1.0.tgz",
      "integrity": "sha512-tHNHTxInrYLCga9O9YGxWA3G9/nnzQw8UGAyqGx3Ar1pSTTzIuM4woFSq4SowkXCjJIwq5sIiQvEfRI9tCH1qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "regexp.prototype.flags": "^1.5.4",
        "set-function-name": "^2.0.2",
        "side-channel": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.repeat": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/string.prototype.repeat/-/string.prototype.repeat-1.0.0.tgz",
      "integrity": "sha512-0u/TldDbKD8bFCQ/4f5+mNRrXwZ8hg2w7ZR8wa16e8z9XpePWl3eGEcUD0OXpEH/VJH/2G3gjUtR3ZOiBe2S/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "node_modules/string.prototype.trim": {
      "version": "1.2.11",
      "resolved": "https://registry.npmjs.org/string.prototype.trim/-/string.prototype.trim-1.2.11.tgz",
      "integrity": "sha512-PwvK7BU+CMTJGYQCTZb5RWXIML92lftJLhQz1tBzgKiqGxJaMlBAa48POXaNAC2s4y8jr3EFqrkF9+44neS46w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-data-property": "^1.1.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.2",
        "es-object-atoms": "^1.1.2",
        "has-property-descriptors": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimend": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.10.tgz",
      "integrity": "sha512-2+3aDAOmPTmuFwjDnmJG2ctEkQKVki7vOSqaxkv42Mowj1V6PnvuwFCRrR5lChUux1TBskPjfkeTOhqczDMxTw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimstart": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.8.tgz",
      "integrity": "sha512-UXSH262CSZY1tfu3G3Secr6uGLCFVPMhIqHjlgCUtCCcgihYc/xKs9djMTMUOb2j1mVSeU8EU6NWc/iQKU6Gfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.1.tgz",
      "integrity": "sha512-pW7uC1l4mBZ8ugbiZrcIsiIvVx1UmTfw7UkC3Um2tmfUq9Bhk8IiyEIPl6F8agHgjzku6j0xQEZbfA5uSgSaCw==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.4.0.tgz",
      "integrity": "sha512-49AwoOQNKdqKPd9CViyH5wJoSKsCDjUlzL8DxuGp3P1FsGY36NJDAa18jLZcaHAUUuTj+JB8IAo8zWgBNvBF7A==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.7",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.7.tgz",
      "integrity": "sha512-rxWZbe87YJb4OcSopb7up2Ba4U82BoiSGUdoDr3Ydrg9ckxFS/YWsvhN323GMcddgU65QRy7JndC7ahhInhvlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.5.3",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.0",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.0",
        "lilconfig": "^2.1.0",
        "micromatch": "^4.0.5",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.0.0",
        "postcss": "^8.4.23",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.1",
        "postcss-nested": "^6.0.1",
        "postcss-selector-parser": "^6.0.11",
        "resolve": "^1.22.2",
        "sucrase": "^3.32.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tailwindcss-animate": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/tailwindcss-animate/-/tailwindcss-animate-1.0.7.tgz",
      "integrity": "sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "tailwindcss": ">=3.0.0 || insiders"
      }
    },
    "node_modules/tailwindcss/node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.0.0",
        "yaml": "^2.3.4"
      },
      "engines": {
        "node": ">= 14"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "postcss": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/tailwindcss/node_modules/postcss-load-config/node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/tailwindcss/node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/text-table": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
      "integrity": "sha512-N+8UisAXDGk8PFXP4HAzVR9nbfmVJ3zYLAWiTIoqC5v5isinhr+r5uaO8+7r3BMfuNIufIsA7RdpVgacC2cSpw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
      "license": "MIT"
    },
    "node_modules/ts-api-utils": {
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-1.4.3.tgz",
      "integrity": "sha512-i3eMG77UTMD0hZhgRS562pv83RC6ukSAC2GMNWc+9dieh/+jDM5u5YG+NHX6VNDRHQcHwmsTHctP9LhbC3WxVw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=16"
      },
      "peerDependencies": {
        "typescript": ">=4.2.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tsconfig-paths": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.15.0.tgz",
      "integrity": "sha512-2Ac2RgzDe/cn48GvOe3M+o82pEFewD3UPbyoUHHdKasHwJKjds4fLXWf/Ux5kATBKN20oaFGu+jbElp1pos0mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json5": "^0.0.29",
        "json5": "^1.0.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/type-fest": {
      "version": "0.20.2",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.20.2.tgz",
      "integrity": "sha512-Ne+eE4r0/iWnpAxD852z3A+N0Bt5RN//NjJwRd2VFHEmrywxf5vsZlh4R6lixl6B+wz/8d+maTSAkN1FIkI3LQ==",
      "dev": true,
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/typed-array-buffer": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
      "integrity": "sha512-nAYYwfY3qnzX30IkA6AQZjVbtK6duGontcQm1WSG1MD94YLqK0515GNApXkoxKOWMusVssAHWLh9SeaoefYFGw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/typed-array-byte-length": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-byte-length/-/typed-array-byte-length-1.0.3.tgz",
      "integrity": "sha512-BaXgOuIxz8n8pIq3e7Atg/7s+DpiYrxn4vdot3w9KbnBhcRQq6o3xemQdIfynqSeXeDrF32x+WvfzmOjPiY9lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-byte-offset": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/typed-array-byte-offset/-/typed-array-byte-offset-1.0.4.tgz",
      "integrity": "sha512-bTlAFB/FBYMcuX81gbL4OcpH5PmlFHqlCCpAl8AlEzMz5k53oNDvN8p1PNOWLEmI2x4orp3raOFB51tv9X+MFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "reflect.getprototypeof": "^1.0.9"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-length": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.8.tgz",
      "integrity": "sha512-phPGCwqr2+Qo0fwniCE8e4pKnGu/yFb5nD5Y8bf0EEeiI5GklnACYA9GFy/DrAeRrKHXvHn+1SUsOWgJp6RO+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.9",
        "for-each": "^0.3.5",
        "gopd": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "possible-typed-array-names": "^1.1.0",
        "reflect.getprototypeof": "^1.0.10"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typescript": {
      "version": "5.5.4",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.5.4.tgz",
      "integrity": "sha512-Mtq29sKDAEYP7aljRgtPOpTvOfbwRWlS6dPRzwjdE+C0R4brX/GUyhHSecbHMFLNBLcJIPt9nl9yG5TZ1weH+Q==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/unbox-primitive": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
      "integrity": "sha512-nWJ91DjeOkej/TA8pXQ3myruKpKEYgqvpw9lz4OPHj/NWFNluYrjbz9j01CJ8yKQd2g4jFoOkINCTW2I5LEEyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-bigints": "^1.0.2",
        "has-symbols": "^1.1.0",
        "which-boxed-primitive": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/undici-types": {
      "version": "5.26.5",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-5.26.5.tgz",
      "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==",
      "license": "MIT"
    },
    "node_modules/unrs-resolver": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.12.2.tgz",
      "integrity": "sha512-dmlRxBJJayXjqTwC+JtF1HhJmgf3ftQ3YejFcZrf4+KKtJv0qDsK1pjqaaVjG7wJ5NJ6UVP1OqRMQ71Z4C3rxQ==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "napi-postinstall": "^0.3.4"
      },
      "funding": {
        "url": "https://opencollective.com/unrs-resolver"
      },
      "optionalDependencies": {
        "@unrs/resolver-binding-android-arm-eabi": "1.12.2",
        "@unrs/resolver-binding-android-arm64": "1.12.2",
        "@unrs/resolver-binding-darwin-arm64": "1.12.2",
        "@unrs/resolver-binding-darwin-x64": "1.12.2",
        "@unrs/resolver-binding-freebsd-x64": "1.12.2",
        "@unrs/resolver-binding-linux-arm-gnueabihf": "1.12.2",
        "@unrs/resolver-binding-linux-arm-musleabihf": "1.12.2",
        "@unrs/resolver-binding-linux-arm64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-arm64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-loong64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-loong64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-ppc64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-riscv64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-riscv64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-s390x-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-x64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-x64-musl": "1.12.2",
        "@unrs/resolver-binding-openharmony-arm64": "1.12.2",
        "@unrs/resolver-binding-wasm32-wasi": "1.12.2",
        "@unrs/resolver-binding-win32-arm64-msvc": "1.12.2",
        "@unrs/resolver-binding-win32-ia32-msvc": "1.12.2",
        "@unrs/resolver-binding-win32-x64-msvc": "1.12.2"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.3.tgz",
      "integrity": "sha512-pJ2sYawQS0R/WI928Gj5GlPhTGzbMelq0+4INtSYNDV9ErKJcX6xjGWkoG/VnB3dpUm00zALaqkrUD77pO5TDQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-callback-ref": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.3.tgz",
      "integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sidecar": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.3.tgz",
      "integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",
      "license": "MIT",
      "dependencies": {
        "detect-node-es": "^1.1.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
      "license": "BSD-2-Clause"
    },
    "node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "license": "MIT",
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/which-boxed-primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.1.1.tgz",
      "integrity": "sha512-TbX3mj8n0odCBFVlY8AxkqcHASw3L60jIuF8jFP78az3C2YhmGvqbHBpAjTRH2/xqYunrJ9g1jSyjCjpoWzIAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-bigint": "^1.1.0",
        "is-boolean-object": "^1.2.1",
        "is-number-object": "^1.1.1",
        "is-string": "^1.1.1",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-builtin-type": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/which-builtin-type/-/which-builtin-type-1.2.1.tgz",
      "integrity": "sha512-6iBczoX+kDQ7a3+YJBnh3T+KZRxM/iYNPXicqk66/Qfm1b93iu+yOImkg0zHbj5LNOcNv1TEADiZ0xa34B4q6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "function.prototype.name": "^1.1.6",
        "has-tostringtag": "^1.0.2",
        "is-async-function": "^2.0.0",
        "is-date-object": "^1.1.0",
        "is-finalizationregistry": "^1.1.0",
        "is-generator-function": "^1.0.10",
        "is-regex": "^1.2.1",
        "is-weakref": "^1.0.2",
        "isarray": "^2.0.5",
        "which-boxed-primitive": "^1.1.0",
        "which-collection": "^1.0.2",
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-collection": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/which-collection/-/which-collection-1.0.2.tgz",
      "integrity": "sha512-K4jVyjnBdgvc86Y6BkaLZEN933SwYOuBFkdmBu9ZfkcAbdVbpITnDmjvZ/aQjRXQrv5EPkTnD1s39GiiqbngCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-map": "^2.0.3",
        "is-set": "^2.0.3",
        "is-weakmap": "^2.0.2",
        "is-weakset": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-module": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/which-module/-/which-module-2.0.1.tgz",
      "integrity": "sha512-iBdZ57RDvnOR9AGBhML2vFZf7h8vmBjhoaZqODJBFWHVtKkDmKuHai3cx5PgVMrX5YDNp27AofYbAwctSS+vhQ==",
      "license": "ISC"
    },
    "node_modules/which-typed-array": {
      "version": "1.1.22",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.22.tgz",
      "integrity": "sha512-fvO4ExWMFsqyhG3AiPAObMuY1lxaqgYcxbc49CNdWDDECOJNgQyvsOWVwbZc+qf3rzRtxojBK+CMEv0Ld5CYpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "for-each": "^0.3.5",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-regex": {
      "version": "6.3.0",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.3.0.tgz",
      "integrity": "sha512-WpDfL7NO6j7tH88IDBNVdUJxDh9nmCteAVW9dsep846XdwF4naCBK+/tGLX3KJgcpgMRXCFlTM2hKGoK9FsdrQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.3.tgz",
      "integrity": "sha512-4Dj6M28JB+oAH8kFkTLUo+a2jwOFkuqb3yucU0CANcRRUbxS0cP0nZYCGjcc3BNXwRIsUVmDGgzawme7zvJHvg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrap-ansi/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/ws": {
      "version": "8.21.3",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.21.3.tgz",
      "integrity": "sha512-201TZ/kPWxoPr/OKWjquZR1SWKXcvxdH+e1xrx89b3YbmzLMFCLfnaG1HFIgWzJOEWZ7MvpK++odZufgYR50Rw==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/y18n": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-4.0.3.tgz",
      "integrity": "sha512-JKhqTOwSrqNA1NY5lSztJ1GrBiUodLMmIZuLiDaMRJ+itFd+ABVE8XBjOvIWL+rSqNDC74LCSFmlb/U4UZ4hJQ==",
      "license": "ISC"
    },
    "node_modules/yaml": {
      "version": "2.9.1",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.9.1.tgz",
      "integrity": "sha512-3NxN8+78OdzbT7C/WjGsyfPAtJaN3FNDsWxv7Y7mcDsT/oOmgW8BpyQQFFBnvZE3j9Y2Sdz1ULFLezL7Eb2yFw==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/eemeli"
      }
    },
    "node_modules/yargs": {
      "version": "15.4.1",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-15.4.1.tgz",
      "integrity": "sha512-aePbxDmcYW++PaqBsJ+HYUFwCdv4LVvdnhBy78E57PIor8/OVvhMrADFFEDh8DHDFRv/O9i3lPhsENjO7QX0+A==",
      "license": "MIT",
      "dependencies": {
        "cliui": "^6.0.0",
        "decamelize": "^1.2.0",
        "find-up": "^4.1.0",
        "get-caller-file": "^2.0.1",
        "require-directory": "^2.1.1",
        "require-main-filename": "^2.0.0",
        "set-blocking": "^2.0.0",
        "string-width": "^4.2.0",
        "which-module": "^2.0.0",
        "y18n": "^4.0.0",
        "yargs-parser": "^18.1.2"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs-parser": {
      "version": "18.1.3",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-18.1.3.tgz",
      "integrity": "sha512-o50j0JeToy/4K6OZcaQmW6lyXXKhq7csREXcDwk2omFPJEwUNOVtJKvmDr9EI1fAJZUyZcRF7kxGBWmRXudrCQ==",
      "license": "ISC",
      "dependencies": {
        "camelcase": "^5.0.0",
        "decamelize": "^1.2.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/yargs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/yargs/node_modules/find-up": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-4.1.0.tgz",
      "integrity": "sha512-PpOwAdQ/YlXQ2vj8a3h8IipDuYRi3wceVQQGYWxNINccq40Anw7BlsEXCMbt1Zt+OLA6Fq9suIpIWD0OsnISlw==",
      "license": "MIT",
      "dependencies": {
        "locate-path": "^5.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/locate-path": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-5.0.0.tgz",
      "integrity": "sha512-t7hw9pI+WvuwNJXwk5zVHpyhIqzg2qTlklJOf0mVxGSbe3Fp2VieZcduNYjaLDoy6p9uGpQEGWG87WpMKlNq8g==",
      "license": "MIT",
      "dependencies": {
        "p-locate": "^4.1.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/p-limit": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-2.3.0.tgz",
      "integrity": "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w==",
      "license": "MIT",
      "dependencies": {
        "p-try": "^2.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/yargs/node_modules/p-locate": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-4.1.0.tgz",
      "integrity": "sha512-R79ZZ/0wAxKGu3oYMlz8jy/kbhsNrS7SKZ7PxEHBgJ5+F2mtFW2fK2cOtBh1cHYkQsbzFV7I+EoRKe6Yt0oK7A==",
      "license": "MIT",
      "dependencies": {
        "p-limit": "^2.2.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "3.23.8",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.23.8.tgz",
      "integrity": "sha512-XBx9AXhXktjUqnepgTiE5flcKIYWi/rme0Eaj+5Y0lftuGBq+jyRu/md4WnuxqgP1ubdpNCsYEYPxrzVHD8d6g==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}
```

### `package.json`

```json
{
  "name": "gift-list-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "check:storage": "node scripts/check-storage.mjs"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "next-auth": "5.0.0-beta.19",
    "@auth/prisma-adapter": "2.4.2",
    "@prisma/client": "5.16.1",
    "bcryptjs": "2.4.3",
    "zod": "3.23.8",
    "clsx": "2.1.1",
    "tailwind-merge": "2.4.0",
    "class-variance-authority": "0.7.0",
    "lucide-react": "0.408.0",
    "@radix-ui/react-slot": "1.1.0",
    "@radix-ui/react-label": "2.1.0",
    "@radix-ui/react-dialog": "1.1.1",
    "@radix-ui/react-dropdown-menu": "2.1.1",
    "@radix-ui/react-toast": "1.2.1",
    "@radix-ui/react-tabs": "1.1.0",
    "date-fns": "3.6.0",
    "@supabase/supabase-js": "2.45.4",
    "qrcode": "1.5.4"
  },
  "devDependencies": {
    "typescript": "5.5.4",
    "@types/node": "20.14.14",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@types/bcryptjs": "2.4.6",
    "@types/qrcode": "1.5.5",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.40",
    "tailwindcss": "3.4.7",
    "tailwindcss-animate": "1.0.7",
    "prisma": "5.16.1",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5"
  }
}
```

### `postcss.config.mjs`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `prisma/schema.prisma`

```prisma
// Schema Prisma — Plataforma de Lista de Presentes
// Fase 1: modelo de dados completo já preparado para as fases seguintes.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

enum EventType {
  CHA_PANELA
  CHA_CASA_NOVA
}

enum PixKeyType {
  CPF
  CNPJ
  EMAIL
  TELEFONE
  ALEATORIA
}

enum ReservationStatus {
  TEMPORARY
  CONFIRMED
  COMPLETED
  CANCELLED
  EXPIRED
}

enum PaymentMethod {
  EXTERNAL_PURCHASE
  PIX
}

enum PixStatus {
  NOT_APPLICABLE
  NOT_DECLARED
  DECLARED
  CONFIRMED
}

/// Tipo de item da lista: produto comum ou vaquinha (contribuição em valor livre até uma meta).
enum GiftKind {
  PRODUCT
  FUND
}

/// Ciclo de vida de uma contribuição de vaquinha (sempre via Pix, confirmada manualmente pelo anfitrião).
enum ContributionStatus {
  DECLARED
  CONFIRMED
  CANCELLED
}

/// Paletas pré-definidas que o anfitrião pode escolher para a página pública.
enum ThemeName {
  SALVIA
  TERRACOTA
}

// ---------------------------------------------------------------------------
// Autenticação (Auth.js / Prisma Adapter)
// ---------------------------------------------------------------------------

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String? // null quando o login é apenas via Google
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]

  // Um usuário pode ser anfitrião de várias listas
  events        Event[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ---------------------------------------------------------------------------
// Domínio principal
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Convidado (identificação leve — Fase 8)
// ---------------------------------------------------------------------------

// O convidado NÃO é um User autenticado (sem senha, sem Auth.js). Ele se
// identifica com nome + e-mail + telefone, guardados aqui, e um cookie
// assinado no navegador lembra quem ele é. Para gerenciar a reserva de outro
// aparelho, ele se identifica de novo com o mesmo e-mail + telefone.
//
// Trade-off consciente: sem verificação de e-mail/SMS, alguém que souber o
// e-mail E o telefone de um convidado poderia se passar por ele. Aceitável
// para o público inicial (convidados conhecidos do anfitrião), mas não
// deve ser usado como está para uma lista pública/aberta.
model Guest {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  reservations  GiftReservation[]
  contributions Contribution[]

  @@unique([email])
  @@map("guests")
}

model Event {
  id            String    @id @default(cuid())
  ownerId       String
  title         String
  type          EventType
  description   String?   @db.Text
  eventDate     DateTime?
  coverImageUrl String?
  profileImageUrl String? // avatar circular sobreposto à capa
  theme         ThemeName @default(SALVIA)

  // URL pública: /lista/[slug]-[secureToken]
  slug        String @unique
  secureToken String @unique

  pixKey     String?
  pixKeyType PixKeyType?

  // Fase 9 — conteúdo configurável da lista
  deliveryAddress String? @db.Text // endereço para entrega do presente, se o convidado preferir enviar
  locationName    String? // nome do local do evento (ex: "Salão de Festas Village Noble")
  locationAddress String? @db.Text
  locationMapsUrl String? // link opcional pro Google Maps / Waze

  published Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  owner User   @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  gifts Gift[]

  @@index([ownerId])
  @@map("events")
}

model Gift {
  id          String  @id @default(cuid())
  eventId     String
  name        String
  description String? @db.Text
  imageUrl    String?
  purchaseUrl String?

  kind GiftKind @default(PRODUCT)

  // Sempre em centavos — nunca float. Em vaquinha (kind = FUND) é a META total.
  priceInCents Int

  // Só vaquinha: menor valor que um convidado pode contribuir.
  minContributionInCents Int?

  quantity Int @default(1)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  event         Event             @relation(fields: [eventId], references: [id], onDelete: Cascade)
  reservations  GiftReservation[]
  contributions Contribution[]

  @@index([eventId])
  @@map("gifts")
}

model GiftReservation {
  id      String @id @default(cuid())
  giftId  String
  guestId String

  status ReservationStatus @default(TEMPORARY)

  paymentMethod PaymentMethod?
  pixStatus     PixStatus      @default(NOT_APPLICABLE)

  reservedAt          DateTime  @default(now())
  expiresAt           DateTime
  purchaseConfirmedAt DateTime?
  pixDeclaredAt       DateTime?
  pixConfirmedAt      DateTime?
  cancelledAt         DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  gift  Gift  @relation(fields: [giftId], references: [id], onDelete: Cascade)
  guest Guest @relation(fields: [guestId], references: [id], onDelete: Cascade)

  // Consulta de disponibilidade: por presente + status
  @@index([giftId, status])
  @@index([guestId])
  @@map("gift_reservations")
}

// ---------------------------------------------------------------------------
// Vaquinha — contribuições em valor livre (mínimo definido pelo anfitrião)
// ---------------------------------------------------------------------------

// A meta NÃO limita nada: as contribuições podem ultrapassar o objetivo (evita
// conflito entre convidados que contribuem ao mesmo tempo). O progresso separa o
// que o anfitrião já confirmou (CONFIRMED) do que só foi declarado (DECLARED).
model Contribution {
  id      String @id @default(cuid())
  giftId  String
  guestId String

  // Sempre em centavos.
  amountInCents Int
  status        ContributionStatus @default(DECLARED)

  declaredAt  DateTime  @default(now())
  confirmedAt DateTime?
  cancelledAt DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  gift  Gift  @relation(fields: [giftId], references: [id], onDelete: Cascade)
  guest Guest @relation(fields: [guestId], references: [id], onDelete: Cascade)

  @@index([giftId, status])
  @@index([guestId])
  @@map("contributions")
}
```

### `README.md`

```markdown
# Plataforma de Lista de Presentes

Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Prisma +
Auth.js, com Supabase (Postgres + Storage).

### Fase 1 — Fundação

- Estrutura de pastas (`app`, `components`, `lib`, `actions`, `schemas`, `types`)
- Schema Prisma completo (User, Event, Gift, GiftReservation + enums), já
  pensado para as regras de concorrência e histórico das fases futuras
- Autenticação com Auth.js: cadastro e login por e-mail/senha (hash com
  bcrypt) e login com Google, sessão JWT
- Middleware protegendo `/dashboard/*`
- Landing page e identidade visual inicial (paleta verde-sálvia / rosa-empoeirado,
  tipografia Fraunces + Inter)

### Fase 2 — Anfitrião

- Criação e edição de lista (nome, tipo de evento, data, descrição, chave Pix)
- Slug único + token seguro gerados automaticamente para a URL pública
  (a página pública em si é a Fase 3 — por enquanto o link já é gerado e
  copiável no dashboard, mas ainda não resolve)
- Publicar / despublicar lista (bloqueado se não houver nenhum presente)
- Cadastro, edição e exclusão de presentes, com upload de imagem para o
  Supabase Storage (bucket `gift-images`)
- Validação server-side com Zod em toda ação crítica; valores monetários
  sempre em centavos (nunca float)
- Regra "nova quantidade não pode ficar menor que reservas já ativas" já
  implementada (ainda sempre 0 até a Fase 4, mas a checagem já vale)
- Botão de copiar link e Web Share API

### Fase 3 — Lista pública

- Página pública em `/lista/[slug]-[secureToken]` — só resolve se slug **e**
  token baterem e a lista estiver publicada (senão, 404)
- Hero com capa, tipo do evento, data e mensagem para os convidados
- Cards de presentes com disponibilidade calculada a partir de
  `quantity - reservas ativas` (três estados: disponível, última unidade,
  indisponível — hoje sempre disponível, já que a Fase 4 ainda não existe)
- Cadastro/login do convidado reaproveitando o mesmo fluxo de autenticação da
  Fase 1 (mesma entidade `User` para anfitrião e convidado), com retorno
  automático para a lista após o login (`callbackUrl`)
- SEO básico (title, description, Open Graph) na página pública
- O botão "Quero presentear" para convidado já logado ainda não cria reserva
  de fato — isso é a Fase 4

### Fase 4 — Reservas

- Reserva temporária (`TEMPORARY`) criada dentro de uma transação com
  isolamento **Serializable** no Postgres: se dois convidados tentarem
  reservar a última unidade ao mesmo tempo, o banco garante que só uma
  transação seja aceita — a outra recebe "presente indisponível" de forma
  segura, sem depender só de checagem no código
- Expiração tratada a cada carregamento da página e a cada nova tentativa de
  reserva (reservas `TEMPORARY` vencidas viram `EXPIRED` automaticamente,
  liberando a unidade)
- Convidado escolhe o método (loja externa ou Pix) e confirma — a reserva
  passa de `TEMPORARY` para `CONFIRMED` (a tela mostra que os próximos
  passos — link da loja, chave Pix — chegam na Fase 5)
- Desistência: convidado pode cancelar a qualquer momento (reserva
  temporária ou já confirmada), liberando a unidade para outra pessoa
- Contador visual de tempo restante da reserva na própria página pública

### Fase 5 — Compra externa e Pix

- **Compra em loja**: abre o link cadastrado pelo anfitrião em nova aba e o
  convidado volta e marca "Já comprei este presente"
  (`paymentMethod = EXTERNAL_PURCHASE`, `status = COMPLETED`)
- **Pix**: mostra o valor exato, o nome do anfitrião, a chave e o tipo, com
  botões de copiar. Inclui **QR Code** e **Pix Copia e Cola** (BR Code /
  padrão EMV do BACEN) gerados localmente — sem integração bancária
- A chave Pix só é entregue ao convidado que tem uma reserva ativa com método
  Pix; ela nunca aparece na página pública antes de ser necessária
- Convidado declara o pagamento ("Já fiz o Pix" → `pixStatus = DECLARED`) e o
  anfitrião confirma o recebimento manualmente (`pixStatus = CONFIRMED`)
- **Dashboard do anfitrião**: indicadores (presentes, selecionados,
  disponíveis, Pix pendentes e confirmados em R$) e a lista de presentes
  escolhidos com nome do convidado — visível só para o dono da lista

### Fase 6 — Refinamento

- **Loading states**: skeletons na lista pública e no dashboard (`loading.tsx`),
  com `aria-busy`/`aria-live`
- **Tratamento de erros**: `error.tsx` global e logger estruturado
  (`lib/logger.ts`) — detalhes técnicos vão para o log do servidor, o usuário
  vê só "Não foi possível concluir essa ação"
- **Acessibilidade**: skip link ("Pular para o conteúdo"), `role="alert"` em
  todas as mensagens de erro, `aria-label` nos botões de ícone, diálogo de
  confirmação acessível (`role="alertdialog"`) no lugar do `confirm()` nativo,
  foco visível e navegação por teclado
- **Desistência com Pix declarado** exibe aviso extra deixando claro que não
  há estorno automático (seção 15)
- **Responsividade**: alvos de toque maiores no mobile, tipografia fluida,
  botões empilhados em telas estreitas
- **SEO**: `metadataBase`, Open Graph, `robots.ts` e `sitemap.ts`. A página
  pública gera prévia bonita no WhatsApp mas é **noindex** — listas são
  privadas por link, não devem ser indexadas
- **Empty states** amigáveis com título e texto de apoio
- Animações discretas apenas nos diálogos e transições de card

## Configurando o Supabase Storage (necessário para upload de imagens)

1. No painel do Supabase, vá em **Storage** → **New bucket**.
2. Crie um bucket chamado exatamente `gift-images` e marque como **Public**.
3. Em **Project Settings → API**, copie a **service_role key** (é diferente
   da anon key) e coloque em `SUPABASE_SERVICE_ROLE_KEY` no `.env`.
   Atenção: essa chave nunca deve ser exposta no frontend — só é usada nas
   Server Actions.

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Copie `.env.example` para `.env` e preencha:
   - `DATABASE_URL`: string de conexão do seu projeto Supabase/PostgreSQL
   - `AUTH_SECRET`: gere com `openssl rand -base64 32`
   - `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`: credenciais OAuth do Google Cloud Console
     (Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`)

3. Suba o schema no banco:
   ```bash
   npm run db:push
   ```

4. Rode o projeto:
   ```bash
   npm run dev
   ```

5. Acesse `http://localhost:3000`.

### Fase 8 — Identificação leve do convidado (sem senha)

- O convidado deixou de ser um `User` com senha. Agora é uma entidade
  própria `Guest`: nome + e-mail + telefone, sem autenticação Auth.js
- Ao clicar em "Quero presentear" pela primeira vez, um diálogo pede esses
  três dados, cria (ou reconhece) o `Guest` e guarda um cookie httpOnly
  neste navegador por 180 dias
- Pra acessar de outro aparelho, ele se identifica de novo com o **mesmo
  e-mail + telefone** — é isso que permite "alterar depois"
- Único cuidado de identidade que mantemos: se o e-mail já existir com um
  telefone diferente, recusamos (evita que alguém troque o telefone e
  assuma o nome de outro convidado)
- Botão "Não é você? Trocar" no topo da lista pública esquece o convidado
  atual deste navegador
- O anfitrião **não muda em nada** — continua com login normal
  (Google ou e-mail+senha) via Auth.js

> **Trade-off de segurança, aceito conscientemente para o público inicial
> (amigos, lista fechada):** sem verificação por e-mail ou SMS, quem souber
> o e-mail E o telefone de alguém consegue se passar por essa pessoa e
> mexer na reserva dela. Não é adequado para uma lista aberta ao público
> geral — se um dia isso mudar, a Fase 8 pode evoluir para um link mágico
> por e-mail sem precisar redesenhar o modelo de dados (o `Guest` continua
> o mesmo, só a forma de provar identidade muda).

⚠️ **Isso é uma mudança de schema.** O `guestId` de `GiftReservation` antes
apontava para `User` e agora aponta para uma tabela nova, `Guest`. Se você
já tem reservas de teste no banco, rode `npm run db:push` e aceite resetar
a tabela `gift_reservations` (ou apague os dados de teste manualmente antes)
— não tem como migrar reservas antigas automaticamente, porque os IDs de
`User` e `Guest` não coincidem.

### Fase 9 — Conteúdo configurável da lista

- **Capa/banner**: upload direto na página de gestão da lista (aparece em
  largura total no topo da página pública e na prévia do WhatsApp)
- **Data e horário** do evento juntos (antes só tínhamos a data)
- **Local do evento**: nome + endereço + link opcional do Google Maps
- **Endereço para entrega do presente**: campo separado, mostrado aos
  convidados que preferirem enviar em vez de levar no dia
- **Mensagem para os convidados** agora preserva quebras de linha
  (parágrafos), pra dar pra escrever um texto mais longo como no exemplo
  que você me mandou
- Aviso fixo "a compra não é feita por aqui" — aparece sozinho quando a
  lista tem pelo menos um presente de compra externa; não é um campo
  configurável porque é um fato sobre a plataforma, não uma escolha do
  anfitrião

⚠️ Mais uma mudança de schema (`Event` ganhou `deliveryAddress`,
`locationName`, `locationAddress`, `locationMapsUrl`). Rode `npm run db:push`
de novo — esses campos são todos opcionais, então não deve pedir para
resetar nenhuma tabela desta vez.

## Refatoração de front-end (pós-MVP)

A partir daqui, o trabalho passou a seguir um roteiro à parte, focado em
polimento de interface, com 4 fases próprias (A–D). Fases A–I (acima) já
estavam concluídas e continuam valendo — esta parte só reorganiza e refina
a camada visual por cima delas.

### Fase A — Identidade visual pública (concluída)

- **Sistema de toast** de verdade (shadcn/ui + Radix Toast, biblioteca que já
  estava instalada desde a Fase 1 mas nunca tinha sido usada)
- **Avatar circular** sobreposto à capa (`profileImageUrl`, novo campo,
  upload próprio no dashboard) — a capa em si já existia da Fase 9
- **Sistema de temas**: paletas "Sálvia" (padrão) e "Terracota", escolhidas
  pelo anfitrião no formulário da lista, aplicadas via `data-theme` — só na
  página pública, o dashboard mantém a identidade padrão do produto
- **`HeaderPublico`**: componente próprio, reaproveitando o que a Fase 9 já
  tinha (capa, título, local, data, mensagem, endereço de entrega) mais o
  avatar e um botão de compartilhar que usa `navigator.share` no mobile e
  copia + Toast no desktop

⚠️ Mudança de schema pequena: `Event` ganhou `profileImageUrl` e `theme`
(default `SALVIA`). `npm run db:push` — sem risco de perda de dado.

### Fase B — Vitrine e estados de carregamento (concluída)

- **Grid responsivo**: 2 colunas no mobile, 3 no tablet, 4 no desktop
  (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`), tanto na grade real quanto
  no skeleton
- **Busca + ordenação sincronizadas com a URL** (`?q=busca&sort=price_asc`):
  sobrevivem a um F5, e dá pra mandar o link já filtrado pra alguém. Busca
  com debounce de 300ms; ordenação por menor/maior preço ou disponíveis
  primeiro
- **`GiftsSection`**: virou um Server Component assíncrono próprio, isolado
  do resto da página. Ele que faz as consultas de reserva/disponibilidade e
  aplica o filtro/ordenação — a página em si só busca o evento
- **Skeleton com Suspense de verdade**: `<Suspense key={...}
  fallback={<GiftCardSkeletonList />}>` envolve o `GiftsSection`. A troca de
  `key` a cada busca/ordenação garante que o skeleton reaparece mesmo numa
  navegação client-side (`router.replace`), não só no primeiro carregamento
- Filtro e ordenação continuam client-side/em memória (não viraram query no
  banco) — para o tamanho típico de uma lista de presentes (dezenas de
  itens, não milhares), isso é mais simples e rápido do que ir ao Postgres
  a cada tecla

Nenhuma mudança de schema nesta fase.
### Fase C — Dashboard em Tabs (concluída)

- Página de gestão da lista deixou de ser uma pilha longa de Cards e virou
  4 abas (`@radix-ui/react-tabs`, também já usado noutros pontos do
  projeto): **Resumo, Presentes, Personalização, Configurações**
- **Resumo** (aba padrão): 3 métricas em destaque — Total arrecadado via
  Pix, Presentes reservados, Presentes disponíveis — mais 2 métricas
  secundárias (total de presentes, Pix pendentes) e a lista de "Últimas
  reservas" com nome do convidado, método e status
- **Presentes**: exatamente o que já existia (tabela + "Adicionar
  presente"), só que agora isolado numa aba própria
- **Personalização**: capa, foto de perfil (Fase A) e o seletor de tema —
  que ganhou vida própria: antes era um campo dentro do formulário grande,
  agora é um `<select>` que salva sozinho ao trocar (com Toast de
  confirmação), sem precisar clicar em "Salvar alterações" lá embaixo
- **Configurações**: o formulário de informações do evento (nome, tipo,
  data, local, endereço de entrega, mensagem, Pix) — igual ao que já
  existia, só que sem o campo de tema (que migrou pra Personalização)
- O link da lista e o botão de publicar continuam visíveis acima das
  abas, porque são as duas ações que o anfitrião mais usa, custe qual
  aba estiver aberta

Nenhuma mudança de schema nesta fase (o tema já tinha sido adicionado na
Fase A; aqui só ganhou uma tela própria).
### Fase D — Empty states, fallback de imagem (já existe, será revisado) e toasts em todos os fluxos

## Status

Todas as 6 fases do plano original estão implementadas. Antes de publicar
para uso real, recomendo:

1. Testar o QR Code / Copia e Cola do Pix com um valor baixo (R$ 1,00) no app
   do seu banco — geração de BR Code só se confirma na prática.
2. Configurar `NEXT_PUBLIC_SITE_URL` com o domínio real no deploy da Vercel.
3. Rodar `npm run db:migrate` (em vez de `db:push`) para gerar migrations
   versionadas antes do primeiro deploy de produção.
4. Opcional: cron job (Vercel Cron) para limpar reservas expiradas
   periodicamente — hoje a expiração já é tratada sob demanda, o cron seria
   só higiene.
```

### `scripts/check-storage.mjs`

```javascript
/**
 * Diagnóstico do Supabase Storage.
 * Rode com:  node scripts/check-storage.mjs
 *
 * Testa, em ordem: variáveis de ambiente, existência do bucket, se ele é
 * público, upload real de um arquivo e leitura da URL pública.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const BUCKET = "gift-images";

// Carrega o .env sem dependência externa
try {
  const env = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of env.split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
} catch {
  console.log("Aviso: não consegui ler o .env — usando variáveis do ambiente.\n");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("1) Variáveis de ambiente");
console.log("   NEXT_PUBLIC_SUPABASE_URL:", url ? "definida" : "FALTANDO");
console.log("   SUPABASE_SERVICE_ROLE_KEY:", serviceKey ? "definida" : "FALTANDO");

if (!url || !serviceKey) {
  console.log("\nPare aqui: preencha as duas no .env antes de continuar.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

console.log("\n2) Bucket");
const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
if (bucketsError) {
  console.log("   ERRO ao listar buckets:", bucketsError.message);
  console.log("   Provável causa: a service_role key está incorreta.");
  process.exit(1);
}

const bucket = buckets.find((b) => b.name === BUCKET);
if (!bucket) {
  console.log(`   ERRO: o bucket "${BUCKET}" não existe.`);
  console.log(`   Nomes encontrados: ${buckets.map((b) => b.name).join(", ") || "(nenhum)"}`);
  console.log("   Solução: crie o bucket no painel Storage com esse nome exato.");
  process.exit(1);
}
console.log(`   Bucket "${BUCKET}" existe.`);
console.log("   Público:", bucket.public ? "sim" : "NÃO — precisa ser público");

console.log("\n3) Upload de teste");
// 1x1 PNG transparente
const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const bytes = Buffer.from(pngBase64, "base64");
const testPath = `diagnostico/${Date.now()}.png`;

const { error: uploadError } = await supabase.storage
  .from(BUCKET)
  .upload(testPath, bytes, { contentType: "image/png" });

if (uploadError) {
  console.log("   ERRO no upload:", uploadError.message);
  process.exit(1);
}
console.log("   Upload OK:", testPath);

const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(testPath);
console.log("\n4) URL pública");
console.log("   ", publicData.publicUrl);

const response = await fetch(publicData.publicUrl);
console.log("   Status HTTP:", response.status, response.ok ? "(acessível)" : "(NÃO acessível)");
if (!response.ok) {
  console.log("   Provável causa: o bucket não está marcado como público.");
}

await supabase.storage.from(BUCKET).remove([testPath]);
console.log("\nArquivo de teste removido. Diagnóstico concluído.");
```

### `scripts/generate-project-snapshot.mjs`

```javascript
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(projectRoot, "PROJECT_SNAPSHOT.md");
const excludedDirectories = new Set([".git", ".next", "node_modules"]);
const excludedFiles = new Set([".env", ".env.local", "PROJECT_SNAPSHOT.md", "tsconfig.tsbuildinfo"]);
const includedRootFiles = new Set([
  ".env.example",
  ".eslintrc.json",
  ".gitignore",
  "next-env.d.ts",
  "next.config.mjs",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "README.md",
  "tailwind.config.ts",
  "tsconfig.json",
]);

async function collectFiles(directory, relativeDirectory = "") {
  const entries = await (await import("node:fs/promises")).readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        files.push(...(await collectFiles(path.join(directory, entry.name), relativePath)));
      }
      continue;
    }

    if (relativeDirectory === "" && !includedRootFiles.has(entry.name)) {
      continue;
    }

    if (excludedFiles.has(entry.name)) {
      continue;
    }

    files.push(relativePath);
  }

  return files;
}

function languageFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    ".css": "css",
    ".json": "json",
    ".mjs": "javascript",
    ".prisma": "prisma",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".md": "markdown",
    ".d.ts": "typescript",
  }[extension] ?? "";
}

function redactSecrets(content, filePath) {
  if (path.basename(filePath) !== ".env.example") {
    return content;
  }

  return content.replace(/^([A-Z0-9_]*(?:SECRET|KEY|TOKEN|PASSWORD|URL)[A-Z0-9_]*)=(.*)$/gm, "$1=\"[redacted in snapshot]\"");
}

function treeFor(files) {
  const root = {};

  for (const file of files) {
    let current = root;
    const parts = file.split(path.sep);

    for (const part of parts.slice(0, -1)) {
      current[part] ??= {};
      current = current[part];
    }

    current[parts.at(-1)] = null;
  }

  function render(node, prefix = "") {
    const entries = Object.entries(node);
    return entries
      .map(([name, child], index) => {
        const last = index === entries.length - 1;
        const branch = last ? "└── " : "├── ";
        const nextPrefix = prefix + (last ? "    " : "│   ");
        const lines = [`${prefix}${branch}${name}`];
        if (child) {
          lines.push(...render(child, nextPrefix));
        }
        return lines;
      })
      .flat();
  }

  return ["gift-list-platform/", ...render(root, "")].join("\n");
}

const files = await collectFiles(projectRoot);
const sections = [];

for (const file of files) {
  const absolutePath = path.join(projectRoot, file);
  const content = redactSecrets(await readFile(absolutePath, "utf8"), file);
  sections.push(`### \`${file.replaceAll("\\", "/")}\`\n\n\`\`\`${languageFor(file)}\n${content.trimEnd()}\n\`\`\``);
}

const snapshot = [
  "# Snapshot do projeto",
  "",
  `> Gerado em ${new Date().toISOString()} por \`npm run snapshot\`.`,
  ">",
  "> Este arquivo documenta a estrutura e o conteúdo dos arquivos-fonte/configuração do projeto.",
  "> Dependências instaladas, artefatos de build, caches e arquivos `.env` locais são omitidos.",
  "",
  "## Estrutura incluída",
  "",
  "```text",
  treeFor(files),
  "```",
  "",
  "## Conteúdo dos arquivos",
  "",
  sections.join("\n\n"),
  "",
].join("\n");

await writeFile(outputPath, snapshot, "utf8");
console.log(`Snapshot gerado: ${path.relative(projectRoot, outputPath)} (${files.length} arquivos)`);
```

### `src/actions/auth.actions.ts`

```typescript
"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schemas/auth.schema";

type SignUpResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Cria um novo usuário (anfitrião ou convidado — mesma entidade User).
 * Toda validação é refeita aqui no servidor, mesmo que o formulário já valide no cliente.
 */
export async function signUpAction(formData: FormData): Promise<SignUpResult> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Já existe uma conta com este e-mail." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  return { success: true };
}
```

### `src/actions/contribution.actions.ts`

```typescript
"use server";

import QRCode from "qrcode";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPixPayload } from "@/lib/pix-payload";
import { logger } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";
import { formatCentsToBRL } from "@/lib/utils";
import { MAX_AMOUNT_IN_CENTS } from "@/schemas/gift.schema";

type SimpleResult = { success: true } | { success: false; error: string };

export type ContributionPixDetails = {
  amountLabel: string;
  hostName: string;
  pixKey: string;
  pixKeyType: string;
  copyPasteCode: string;
  qrCodeDataUrl: string | null;
};

/**
 * Carrega a vaquinha e valida tudo que vale para qualquer contribuição: o item
 * é uma vaquinha, a lista está publicada, o Pix está configurado e o valor
 * respeita o mínimo. NÃO há teto pela meta: contribuir além dela é permitido.
 */
async function loadFundForContribution(giftId: string, amountInCents: number) {
  const gift = await prisma.gift.findUnique({
    where: { id: giftId },
    include: { event: { include: { owner: { select: { name: true } } } } },
  });

  if (!gift || gift.kind !== "FUND" || !gift.event.published) {
    return { ok: false as const, error: "Vaquinha não encontrada." };
  }
  if (!gift.event.pixKey || !gift.event.pixKeyType) {
    return { ok: false as const, error: "O anfitrião ainda não cadastrou uma chave Pix." };
  }
  if (!Number.isInteger(amountInCents) || amountInCents <= 0) {
    return { ok: false as const, error: "Informe um valor válido." };
  }

  const min = gift.minContributionInCents ?? 1;
  if (amountInCents < min) {
    return { ok: false as const, error: `O valor mínimo é ${formatCentsToBRL(min)}.` };
  }
  if (amountInCents > MAX_AMOUNT_IN_CENTS) {
    return { ok: false as const, error: `O valor máximo é ${formatCentsToBRL(MAX_AMOUNT_IN_CENTS)}.` };
  }

  return { ok: true as const, gift, event: gift.event };
}

/** Gera o Pix (QR + copia e cola) com o valor escolhido. Não grava nada ainda. */
export async function getContributionPixAction(
  giftId: string,
  amountInCents: number
): Promise<{ success: true; details: ContributionPixDetails } | { success: false; error: string }> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se para contribuir." };

  const loaded = await loadFundForContribution(giftId, amountInCents);
  if (!loaded.ok) return { success: false, error: loaded.error };

  const { event } = loaded;
  const hostName = event.owner.name?.trim() || event.title;
  const copyPasteCode = buildPixPayload({
    pixKey: event.pixKey!,
    merchantName: hostName,
    amountInCents,
  });

  let qrCodeDataUrl: string | null = null;
  try {
    qrCodeDataUrl = await QRCode.toDataURL(copyPasteCode, { width: 280, margin: 1 });
  } catch (error) {
    // Sem QR, o copia e cola sozinho resolve.
    logger.error("contributionQrCode", error, { giftId });
  }

  return {
    success: true,
    details: {
      amountLabel: formatCentsToBRL(amountInCents),
      hostName,
      pixKey: event.pixKey!,
      pixKeyType: event.pixKeyType!,
      copyPasteCode,
      qrCodeDataUrl,
    },
  };
}

/** Convidado avisa que fez o Pix. Só aqui a contribuição passa a existir (e a contar na barra). */
export async function declareContributionAction(
  giftId: string,
  amountInCents: number
): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se para contribuir." };

  const loaded = await loadFundForContribution(giftId, amountInCents);
  if (!loaded.ok) return { success: false, error: loaded.error };

  // Duplo clique / reenvio: a mesma contribuição declarada há poucos segundos não vira duas.
  const recentDuplicate = await prisma.contribution.findFirst({
    where: {
      giftId,
      guestId: guest.id,
      amountInCents,
      status: "DECLARED",
      declaredAt: { gt: new Date(Date.now() - 60_000) },
    },
  });
  if (!recentDuplicate) {
    await prisma.contribution.create({
      data: { giftId, guestId: guest.id, amountInCents },
    });
  }

  revalidatePath(`/dashboard/eventos/${loaded.gift.eventId}`);
  return { success: true };
}

/** Convidado desfaz uma contribuição que ainda não foi confirmada (ex.: digitou o valor errado). */
export async function cancelContributionAction(contributionId: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: { gift: { select: { eventId: true } } },
  });
  if (!contribution || contribution.guestId !== guest.id) {
    return { success: false, error: "Contribuição não encontrada." };
  }
  if (contribution.status !== "DECLARED") {
    return {
      success: false,
      error: "Essa contribuição já foi confirmada pelo anfitrião. Fale com ele para qualquer ajuste.",
    };
  }

  await prisma.contribution.update({
    where: { id: contributionId },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  revalidatePath(`/dashboard/eventos/${contribution.gift.eventId}`);
  return { success: true };
}

async function requireOwnedContribution(contributionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { ok: false as const, error: "Você precisa estar logado." };

  const contribution = await prisma.contribution.findUnique({
    where: { id: contributionId },
    include: { gift: { include: { event: { select: { ownerId: true, id: true } } } } },
  });
  if (!contribution || contribution.gift.event.ownerId !== session.user.id) {
    return { ok: false as const, error: "Contribuição não encontrada." };
  }
  return { ok: true as const, contribution, eventId: contribution.gift.event.id };
}

/** Anfitrião confirma que o Pix caiu — passa de "aguardando" para "confirmado". */
export async function confirmContributionAction(contributionId: string): Promise<SimpleResult> {
  const owned = await requireOwnedContribution(contributionId);
  if (!owned.ok) return { success: false, error: owned.error };

  if (owned.contribution.status !== "DECLARED") {
    return { success: false, error: "Essa contribuição não está aguardando confirmação." };
  }

  await prisma.contribution.update({
    where: { id: contributionId },
    data: { status: "CONFIRMED", confirmedAt: new Date() },
  });

  revalidatePath(`/dashboard/eventos/${owned.eventId}`);
  return { success: true };
}

/** Anfitrião recusa uma contribuição que não recebeu (ou foi declarada por engano). */
export async function rejectContributionAction(contributionId: string): Promise<SimpleResult> {
  const owned = await requireOwnedContribution(contributionId);
  if (!owned.ok) return { success: false, error: owned.error };

  if (owned.contribution.status === "CANCELLED") {
    return { success: false, error: "Essa contribuição já foi removida." };
  }

  await prisma.contribution.update({
    where: { id: contributionId },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  revalidatePath(`/dashboard/eventos/${owned.eventId}`);
  return { success: true };
}
```

### `src/actions/event.actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildEventSlug, generateSecureToken } from "@/lib/slug";
import { eventSchema } from "@/schemas/event.schema";
import { uploadImage } from "@/lib/supabase-storage";
import { logger } from "@/lib/logger";

type ActionResult = { success: true } | { success: false; error: string };

async function requireOwnerEvent(eventId: string, userId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ownerId !== userId) {
    return null;
  }
  return event;
}

export async function createEventAction(formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    eventDate: formData.get("eventDate"),
    pixKey: formData.get("pixKey"),
    pixKeyType: formData.get("pixKeyType"),
    deliveryAddress: formData.get("deliveryAddress"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    locationMapsUrl: formData.get("locationMapsUrl"),
    theme: formData.get("theme"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const {
    title,
    type,
    description,
    eventDate,
    pixKey,
    pixKeyType,
    deliveryAddress,
    locationName,
    locationAddress,
    locationMapsUrl,
    theme,
  } = parsed.data;

  // Tenta algumas vezes até achar um slug livre (colisão é rara, mas o slug é único no banco).
  let event;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      event = await prisma.event.create({
        data: {
          ownerId: session.user.id,
          title,
          type,
          description: description || null,
          eventDate: eventDate ?? null,
          pixKey: pixKey || null,
          pixKeyType: pixKeyType || null,
          deliveryAddress: deliveryAddress || null,
          locationName: locationName || null,
          locationAddress: locationAddress || null,
          locationMapsUrl: locationMapsUrl || null,
          theme: theme || "SALVIA",
          slug: buildEventSlug(title),
          secureToken: generateSecureToken(),
        },
      });
      break;
    } catch {
      // colisão de slug/token — tenta de novo com novos valores aleatórios
      continue;
    }
  }

  if (!event) {
    return { success: false, error: "Não foi possível criar a lista. Tente novamente." };
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/eventos/${event.id}`);
}

export async function updateEventAction(
  eventId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    eventDate: formData.get("eventDate"),
    pixKey: formData.get("pixKey"),
    pixKeyType: formData.get("pixKeyType"),
    deliveryAddress: formData.get("deliveryAddress"),
    locationName: formData.get("locationName"),
    locationAddress: formData.get("locationAddress"),
    locationMapsUrl: formData.get("locationMapsUrl"),
    theme: formData.get("theme"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const {
    title,
    type,
    description,
    eventDate,
    pixKey,
    pixKeyType,
    deliveryAddress,
    locationName,
    locationAddress,
    locationMapsUrl,
    theme,
  } = parsed.data;

  await prisma.event.update({
    where: { id: eventId },
    data: {
      title,
      type,
      description: description || null,
      eventDate: eventDate ?? null,
      pixKey: pixKey || null,
      pixKeyType: pixKeyType || null,
      deliveryAddress: deliveryAddress || null,
      locationName: locationName || null,
      locationAddress: locationAddress || null,
      locationMapsUrl: locationMapsUrl || null,
      theme: theme || "SALVIA",
    },
  });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function setEventPublishedAction(
  eventId: string,
  published: boolean
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  if (published) {
    const giftCount = await prisma.gift.count({ where: { eventId } });
    if (giftCount === 0) {
      return { success: false, error: "Adicione ao menos um presente antes de publicar." };
    }
  }

  await prisma.event.update({ where: { id: eventId }, data: { published } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  revalidatePath("/dashboard");
  return { success: true };
}

export async function updateEventCoverImageAction(
  eventId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  const imageFile = formData.get("cover");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { success: false, error: "Selecione uma imagem." };
  }

  const uploadResult = await uploadImage(imageFile, `events/${eventId}/cover`);
  if (!uploadResult.success) {
    logger.error("updateEventCoverImage", new Error(uploadResult.error), { eventId });
    return { success: false, error: uploadResult.error };
  }

  await prisma.event.update({ where: { id: eventId }, data: { coverImageUrl: uploadResult.url } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function updateEventThemeAction(
  eventId: string,
  theme: "SALVIA" | "TERRACOTA"
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  await prisma.event.update({ where: { id: eventId }, data: { theme } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function updateEventProfileImageAction(
  eventId: string,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Você precisa estar logado." };
  }

  const owned = await requireOwnerEvent(eventId, session.user.id);
  if (!owned) {
    return { success: false, error: "Lista não encontrada." };
  }

  const imageFile = formData.get("profile");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { success: false, error: "Selecione uma imagem." };
  }

  const uploadResult = await uploadImage(imageFile, `events/${eventId}/profile`);
  if (!uploadResult.success) {
    logger.error("updateEventProfileImage", new Error(uploadResult.error), { eventId });
    return { success: false, error: uploadResult.error };
  }

  await prisma.event.update({ where: { id: eventId }, data: { profileImageUrl: uploadResult.url } });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}
```

### `src/actions/gift.actions.ts`

```typescript
"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/supabase-storage";
import { giftSchema, parsePriceToCents } from "@/schemas/gift.schema";
import { logger } from "@/lib/logger";

type ActionResult = { success: true } | { success: false; error: string };

const ACTIVE_RESERVATION_STATUSES = ["TEMPORARY", "CONFIRMED", "COMPLETED"] as const;

async function requireOwnedEvent(eventId: string, userId: string) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event || event.ownerId !== userId) return null;
  return event;
}

async function requireOwnedGift(giftId: string, userId: string) {
  const gift = await prisma.gift.findUnique({ where: { id: giftId }, include: { event: true } });
  if (!gift || gift.event.ownerId !== userId) return null;
  return gift;
}

function parseGiftForm(formData: FormData, kindOverride?: "PRODUCT" | "FUND") {
  const kind = kindOverride ?? (formData.get("kind") === "FUND" ? "FUND" : "PRODUCT");

  return giftSchema.safeParse({
    kind,
    name: formData.get("name"),
    description: formData.get("description"),
    // Vaquinha não tem link de loja nem quantidade: sempre 1 item, sem estoque.
    purchaseUrl: kind === "FUND" ? "" : formData.get("purchaseUrl"),
    price: formData.get("price"),
    minContribution: formData.get("minContribution"),
    quantity: kind === "FUND" ? 1 : formData.get("quantity"),
  });
}

export async function createGiftAction(eventId: string, formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const event = await requireOwnedEvent(eventId, session.user.id);
  if (!event) return { success: false, error: "Lista não encontrada." };

  const parsed = parseGiftForm(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { kind, name, description, purchaseUrl, price, minContribution, quantity } = parsed.data;
  const priceInCents = parsePriceToCents(price);

  const imageFile = formData.get("image");
  let imageUrl: string | undefined;

  if (imageFile instanceof File && imageFile.size > 0) {
    const uploadResult = await uploadImage(imageFile, `events/${eventId}`);
    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }
    imageUrl = uploadResult.url;
  }

  await prisma.gift.create({
    data: {
      eventId,
      kind,
      name,
      description: description || null,
      purchaseUrl: purchaseUrl || null,
      priceInCents,
      minContributionInCents: kind === "FUND" && minContribution ? parsePriceToCents(minContribution) : null,
      quantity,
      imageUrl,
    },
  });

  revalidatePath(`/dashboard/eventos/${eventId}`);
  return { success: true };
}

export async function updateGiftAction(giftId: string, formData: FormData): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const gift = await requireOwnedGift(giftId, session.user.id);
  if (!gift) return { success: false, error: "Presente não encontrado." };

  // O tipo (produto/vaquinha) não muda depois de criado: reservas e contribuições têm regras diferentes.
  const parsed = parseGiftForm(formData, gift.kind);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { kind, name, description, purchaseUrl, price, minContribution, quantity } = parsed.data;

  // Regra do documento: a nova quantidade nunca pode ficar menor que o número
  // de reservas já ativas (ainda sempre 0 até a Fase 4, mas a checagem já vale).
  const activeReservations = await prisma.giftReservation.count({
    where: { giftId, status: { in: [...ACTIVE_RESERVATION_STATUSES] } },
  });

  if (quantity < activeReservations) {
    return {
      success: false,
      error: `A quantidade não pode ser menor que ${activeReservations} (já reservado por convidados).`,
    };
  }

  const imageFile = formData.get("image");
  let imageUrl = gift.imageUrl ?? undefined;

  if (imageFile instanceof File && imageFile.size > 0) {
    const uploadResult = await uploadImage(imageFile, `events/${gift.eventId}`);
    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }
    imageUrl = uploadResult.url;
  }

  await prisma.gift.update({
    where: { id: giftId },
    data: {
      name,
      description: description || null,
      purchaseUrl: purchaseUrl || null,
      priceInCents: parsePriceToCents(price),
      minContributionInCents: kind === "FUND" && minContribution ? parsePriceToCents(minContribution) : null,
      quantity,
      imageUrl,
    },
  });

  revalidatePath(`/dashboard/eventos/${gift.eventId}`);
  return { success: true };
}

export async function deleteGiftAction(giftId: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const gift = await requireOwnedGift(giftId, session.user.id);
  if (!gift) return { success: false, error: "Presente não encontrado." };

  const activeReservations = await prisma.giftReservation.count({
    where: { giftId, status: { in: [...ACTIVE_RESERVATION_STATUSES] } },
  });

  if (activeReservations > 0) {
    return {
      success: false,
      error: "Este presente já foi escolhido por um convidado e não pode ser excluído.",
    };
  }

  // Cancelar em cascata apagaria o histórico de dinheiro que o convidado diz ter enviado.
  const activeContributions = await prisma.contribution.count({
    where: { giftId, status: { in: ["DECLARED", "CONFIRMED"] } },
  });
  if (activeContributions > 0) {
    return {
      success: false,
      error:
        "Esta vaquinha já recebeu contribuições e não pode ser excluída. Recuse as contribuições pendentes antes, se for o caso.",
    };
  }

  await prisma.gift.delete({ where: { id: giftId } });

  revalidatePath(`/dashboard/eventos/${gift.eventId}`);
  return { success: true };
}
```

### `src/actions/guest.actions.ts`

```typescript
"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { guestIdentifySchema } from "@/schemas/guest.schema";
import { GUEST_COOKIE_NAME, GUEST_COOKIE_MAX_AGE_SECONDS, getCurrentGuest } from "@/lib/guest-session";

type IdentifyResult = { success: true; guestName: string } | { success: false; error: string };

/**
 * Identifica o convidado por nome + e-mail + telefone (sem senha) e guarda
 * um cookie httpOnly para lembrá-lo neste navegador.
 *
 * Se o e-mail já existir com um telefone DIFERENTE, recusamos — é a única
 * checagem de identidade que temos nesse modelo simplificado, então vale
 * mantê-la (impede que alguém troque só o e-mail e assuma o nome de outro
 * convidado, mesmo sem senha).
 */
export async function identifyGuestAction(formData: FormData): Promise<IdentifyResult> {
  const parsed = guestIdentifySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { name, email, phone } = parsed.data;

  try {
    const existing = await prisma.guest.findUnique({ where: { email } });

    let guest;
    if (existing) {
      if (existing.phone !== phone) {
        return {
          success: false,
          error:
            "Esse e-mail já está cadastrado com outro telefone. Confira os dados ou avise o anfitrião.",
        };
      }
      guest = existing.name === name ? existing : await prisma.guest.update({
        where: { id: existing.id },
        data: { name },
      });
    } else {
      guest = await prisma.guest.create({ data: { name, email, phone } });
    }

    cookies().set(GUEST_COOKIE_NAME, guest.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: GUEST_COOKIE_MAX_AGE_SECONDS,
    });

    return { success: true, guestName: guest.name };
  } catch (error) {
    logger.error("identifyGuest", error, { email });
    return { success: false, error: "Não foi possível identificar você agora. Tente novamente." };
  }
}

/** "Trocar" — esquece o convidado identificado neste navegador. */
export async function forgetGuestAction(): Promise<{ success: true }> {
  cookies().delete(GUEST_COOKIE_NAME);
  return { success: true };
}

export async function getIdentifiedGuestNameAction(): Promise<string | null> {
  const guest = await getCurrentGuest();
  return guest?.name ?? null;
}
```

### `src/actions/payment.actions.ts`

```typescript
"use server";

import QRCode from "qrcode";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { buildPixPayload } from "@/lib/pix-payload";
import { logger } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";

type SimpleResult = { success: true } | { success: false; error: string };

export type PaymentDetails =
  | { kind: "EXTERNAL_PURCHASE"; purchaseUrl: string | null; giftName: string }
  | {
      kind: "PIX";
      giftName: string;
      amountLabel: string;
      hostName: string;
      pixKey: string;
      pixKeyType: string;
      copyPasteCode: string;
      qrCodeDataUrl: string | null;
    };

/**
 * Devolve os dados de pagamento da reserva. A chave Pix só sai daqui se quem
 * pediu for o próprio dono de uma reserva ativa com método PIX — ou seja, ela
 * nunca fica exposta na página pública antes de ser realmente necessária.
 */
export async function getPaymentDetailsAction(
  reservationId: string
): Promise<{ success: true; details: PaymentDetails } | { success: false; error: string }> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: { include: { owner: { select: { name: true } } } } } } },
  });

  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }

  if (!["CONFIRMED", "COMPLETED"].includes(reservation.status)) {
    return { success: false, error: "Essa reserva não está ativa." };
  }

  const { gift } = reservation;
  const { event } = gift;

  if (reservation.paymentMethod === "EXTERNAL_PURCHASE") {
    return {
      success: true,
      details: {
        kind: "EXTERNAL_PURCHASE",
        purchaseUrl: gift.purchaseUrl,
        giftName: gift.name,
      },
    };
  }

  if (reservation.paymentMethod === "PIX") {
    if (!event.pixKey || !event.pixKeyType) {
      return {
        success: false,
        error: "O anfitrião ainda não cadastrou uma chave Pix. Escolha comprar em uma loja.",
      };
    }

    const hostName = event.owner.name?.trim() || event.title;
    const copyPasteCode = buildPixPayload({
      pixKey: event.pixKey,
      merchantName: hostName,
      amountInCents: gift.priceInCents,
    });

    let qrCodeDataUrl: string | null = null;
    try {
      qrCodeDataUrl = await QRCode.toDataURL(copyPasteCode, { width: 280, margin: 1 });
    } catch (error) {
      // Se a geração do QR falhar, o Copia e Cola sozinho já resolve.
      logger.error("pixQrCode", error, { reservationId });
      qrCodeDataUrl = null;
    }

    return {
      success: true,
      details: {
        kind: "PIX",
        giftName: gift.name,
        amountLabel: (gift.priceInCents / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        hostName,
        pixKey: event.pixKey,
        pixKeyType: event.pixKeyType,
        qrCodeDataUrl,
        copyPasteCode,
      },
    };
  }

  return { success: false, error: "Método de pagamento não definido." };
}

/** Convidado informa que comprou o presente na loja externa. */
export async function confirmExternalPurchaseAction(reservationId: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "EXTERNAL_PURCHASE") {
    return { success: false, error: "Essa reserva não é de compra em loja." };
  }
  if (reservation.status !== "CONFIRMED") {
    return { success: false, error: "Essa reserva não pode mais ser atualizada." };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: { status: "COMPLETED", purchaseConfirmedAt: new Date() },
  });

  return { success: true };
}

/** Convidado declara que fez o Pix — ainda depende da confirmação manual do anfitrião. */
export async function declarePixPaymentAction(reservationId: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) return { success: false, error: "Identifique-se novamente para continuar." };

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return { success: false, error: "Essa reserva não é de pagamento via Pix." };
  }
  if (reservation.status !== "CONFIRMED") {
    return { success: false, error: "Essa reserva não pode mais ser atualizada." };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: { pixStatus: "DECLARED", pixDeclaredAt: new Date() },
  });

  return { success: true };
}

/** Anfitrião confirma que recebeu o Pix — só o dono da lista pode fazer isso. */
export async function confirmPixReceivedAction(reservationId: string): Promise<SimpleResult> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Você precisa estar logado." };

  const reservation = await prisma.giftReservation.findUnique({
    where: { id: reservationId },
    include: { gift: { include: { event: true } } },
  });

  if (!reservation || reservation.gift.event.ownerId !== session.user.id) {
    return { success: false, error: "Reserva não encontrada." };
  }
  if (reservation.paymentMethod !== "PIX") {
    return { success: false, error: "Essa reserva não é de pagamento via Pix." };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: {
      pixStatus: "CONFIRMED",
      pixConfirmedAt: new Date(),
      status: "COMPLETED",
    },
  });

  return { success: true };
}
```

### `src/actions/reservation.actions.ts`

```typescript
"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { RESERVATION_TIMEOUT_MINUTES } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { getCurrentGuest } from "@/lib/guest-session";

type ReservationSummary = {
  id: string;
  status: "TEMPORARY" | "CONFIRMED";
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX" | null;
  expiresAt: string;
};

type ActionResult =
  | { success: true; reservation: ReservationSummary }
  | { success: false; error: string };

type SimpleResult = { success: true } | { success: false; error: string };

/**
 * Cria uma reserva temporária para o presente, dentro de uma transação
 * SERIALIZABLE: se dois convidados tentarem reservar a última unidade ao
 * mesmo tempo, o Postgres garante que só uma das transações seja aceita — a
 * outra falha com erro de serialização e recebe "presente indisponível".
 */
export async function createReservationAction(giftId: string): Promise<ActionResult> {
  const guest = await getCurrentGuest();
  if (!guest) {
    return { success: false, error: "Identifique-se para escolher um presente." };
  }
  const guestId = guest.id;

  try {
    const reservation = await prisma.$transaction(
      async (tx) => {
        const now = new Date();

        // 1. Expira reservas temporárias vencidas antes de contar disponibilidade.
        await tx.giftReservation.updateMany({
          where: { giftId, status: "TEMPORARY", expiresAt: { lt: now } },
          data: { status: "EXPIRED" },
        });

        // 2. Se o próprio convidado já tem uma reserva ativa deste presente, reaproveita.
        const existingMine = await tx.giftReservation.findFirst({
          where: { giftId, guestId, status: { in: ["TEMPORARY", "CONFIRMED"] } },
        });
        if (existingMine) return existingMine;

        const gift = await tx.gift.findUnique({ where: { id: giftId } });
        if (!gift) throw new Error("GIFT_NOT_FOUND");
        // Vaquinha não se "reserva": a participação é por contribuição (contribution.actions).
        if (gift.kind === "FUND") throw new Error("NOT_RESERVABLE");

        // 3. Conta reservas ativas de TODOS os convidados e compara com a quantidade.
        const activeCount = await tx.giftReservation.count({
          where: { giftId, status: { in: ["TEMPORARY", "CONFIRMED", "COMPLETED"] } },
        });

        if (activeCount >= gift.quantity) {
          throw new Error("UNAVAILABLE");
        }

        return tx.giftReservation.create({
          data: {
            giftId,
            guestId,
            status: "TEMPORARY",
            expiresAt: new Date(now.getTime() + RESERVATION_TIMEOUT_MINUTES * 60_000),
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );

    return {
      success: true,
      reservation: {
        id: reservation.id,
        status: reservation.status as "TEMPORARY" | "CONFIRMED",
        paymentMethod: reservation.paymentMethod,
        expiresAt: reservation.expiresAt.toISOString(),
      },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "UNAVAILABLE") {
      return { success: false, error: "Esse presente acabou de ser escolhido por outra pessoa." };
    }
    if (message === "NOT_RESERVABLE") {
      return { success: false, error: "Este item é uma vaquinha: use o botão Contribuir." };
    }
    if (message === "GIFT_NOT_FOUND") {
      return { success: false, error: "Presente não encontrado." };
    }
    // Erro de serialização do Postgres (conflito de concorrência) cai aqui.
    logger.error("createReservation", err, { giftId, guestId });
    return { success: false, error: "Não foi possível reservar agora. Tente novamente." };
  }
}

/** Convidado escolhe o método (loja externa ou Pix) e confirma — a reserva vira definitiva. */
export async function confirmReservationMethodAction(
  reservationId: string,
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX"
): Promise<ActionResult> {
  const guest = await getCurrentGuest();
  if (!guest) {
    return { success: false, error: "Identifique-se novamente para continuar." };
  }

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }

  if (reservation.status !== "TEMPORARY") {
    return { success: false, error: "Essa reserva não está mais disponível para confirmação." };
  }

  if (reservation.expiresAt < new Date()) {
    await prisma.giftReservation.update({ where: { id: reservationId }, data: { status: "EXPIRED" } });
    return { success: false, error: "Sua reserva expirou. Escolha o presente novamente." };
  }

  const updated = await prisma.giftReservation.update({
    where: { id: reservationId },
    data: {
      status: "CONFIRMED",
      paymentMethod,
      pixStatus: paymentMethod === "PIX" ? "NOT_DECLARED" : "NOT_APPLICABLE",
    },
  });

  return {
    success: true,
    reservation: {
      id: updated.id,
      status: "CONFIRMED",
      paymentMethod: updated.paymentMethod,
      expiresAt: updated.expiresAt.toISOString(),
    },
  };
}

/** Convidado desiste de um presente reservado (temporário ou já confirmado). */
export async function cancelReservationAction(reservationId: string): Promise<SimpleResult> {
  const guest = await getCurrentGuest();
  if (!guest) {
    return { success: false, error: "Identifique-se novamente para continuar." };
  }

  const reservation = await prisma.giftReservation.findUnique({ where: { id: reservationId } });
  if (!reservation || reservation.guestId !== guest.id) {
    return { success: false, error: "Reserva não encontrada." };
  }

  if (!["TEMPORARY", "CONFIRMED"].includes(reservation.status)) {
    return { success: false, error: "Essa reserva não pode mais ser cancelada." };
  }

  await prisma.giftReservation.update({
    where: { id: reservationId },
    data: { status: "CANCELLED", cancelledAt: new Date() },
  });

  return { success: true };
}
```

### `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

### `src/app/cadastro/cadastro-form.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { signUpAction } from "@/actions/auth.actions";

export function CadastroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signUpAction(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      const params = new URLSearchParams({ cadastro: "sucesso" });
      if (callbackUrl) params.set("callbackUrl", callbackUrl);
      router.push(`/login?${params.toString()}`);
    });
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Seu nome"
          required
          minLength={2}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="voce@email.com"
          aria-describedby={error ? "cadastro-error" : undefined}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Senha</Label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          aria-describedby="password-hint"
          required
          minLength={8}
        />
        <p id="password-hint" className="text-xs text-muted-foreground">
          Use pelo menos 8 caracteres.
        </p>
      </div>

      {error && (
        <p id="cadastro-error" role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
```

### `src/app/cadastro/page.tsx`

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CadastroForm } from "./cadastro-form";

export const metadata: Metadata = { title: "Criar conta" };

export default function CadastroPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle as="h1">Criar conta</CardTitle>
          <CardDescription>Comece sua lista de presentes em poucos minutos.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <CadastroForm />
          </Suspense>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Entrar
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
```

### `src/app/dashboard/eventos/[id]/cover-image-uploader.tsx`

```tsx
"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { GiftImage } from "@/components/gift-image";
import { updateEventCoverImageAction } from "@/actions/event.actions";
import { Upload } from "lucide-react";

export function CoverImageUploader({
  eventId,
  currentUrl,
}: {
  eventId: string;
  currentUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.set("cover", file);

    startTransition(async () => {
      const result = await updateEventCoverImageAction(eventId, formData);
      if (!result.success) {
        toast({ title: "Não foi possível enviar a capa", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Capa atualizada" });
      router.refresh();
    });

    // Permite selecionar o mesmo arquivo de novo depois, se precisar.
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-20 w-32 flex-shrink-0 overflow-hidden rounded-md border border-border">
        <GiftImage src={currentUrl} alt="Capa da lista" width={128} height={80} />
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          {isPending ? "Enviando..." : currentUrl ? "Trocar capa" : "Adicionar capa"}
        </Button>
      </div>
    </div>
  );
}
```

### `src/app/dashboard/eventos/[id]/event-dashboard-view.tsx`

```tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Event, Gift } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventForm } from "./event-form";
import { PublishToggle } from "./publish-toggle";
import { ShareLinkButtons } from "./share-link-buttons";
import { GiftFormDialog } from "./gift-form-dialog";
import { GiftList } from "./gift-list";
import { GuestSelections, type GuestSelection } from "./guest-selections";
import { CoverImageUploader } from "./cover-image-uploader";
import { ProfileImageUploader } from "./profile-image-uploader";
import { ThemeSelector } from "./theme-selector";
import { FundsOverview, type FundOverviewItem } from "./funds-overview";
import type { FundTotals } from "@/lib/fund";

type ActionResult = { success: true } | { success: false; error: string };

interface Metric {
  label: string;
  value: string;
}

export interface EventDashboardViewProps {
  event: Event & { gifts: Gift[] };
  primaryMetrics: Metric[];
  secondaryMetrics: Metric[];
  selections: GuestSelection[];
  publicUrl: string;
  updateAction: (formData: FormData) => Promise<ActionResult>;
  defaultTab?: string;
  /** Vaquinhas da lista, com as contribuições, para a aba Resumo. */
  funds: FundOverviewItem[];
  fundTotals: Record<string, FundTotals>;
  pixConfigured: boolean;
}

/** Parte visual da página do evento: recebe tudo pronto, sem acessar banco nem sessão. */
export function EventDashboardView({
  event,
  primaryMetrics,
  secondaryMetrics,
  selections,
  publicUrl,
  updateAction,
  defaultTab = "resumo",
  funds,
  fundTotals,
  pixConfigured,
}: EventDashboardViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Suas listas
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h1 className="break-words font-serif text-2xl font-medium text-foreground sm:text-3xl">
              {event.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {event.type === "CHA_PANELA" ? "Chá de Panela" : "Chá de Casa Nova"}
            </p>
          </div>
          <PublishToggle eventId={event.id} published={event.published} />
        </div>
      </div>

      {/* Abas logo abaixo do título: o conteúdo começa na primeira tela, mesmo no celular. */}
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="presentes">Presentes</TabsTrigger>
          <TabsTrigger value="personalizacao">Personalização</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        {/* Resumo */}
        <TabsContent value="resumo" className="flex flex-col gap-6">
          {/* Todas as métricas na mesma grade: colunas alinhadas em qualquer largura. */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {[...primaryMetrics, ...secondaryMetrics].map((metric, index) => (
              <Card key={metric.label} className={index === 0 ? "col-span-2 md:col-span-1" : undefined}>
                <CardContent className="p-4">
                  <p className="font-serif text-2xl text-foreground">{metric.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {funds.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Vaquinhas</CardTitle>
                <CardDescription>
                  Acompanhe a evolução e confirme os Pix que chegarem. A meta pode ser superada — as
                  contribuições continuam abertas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FundsOverview funds={funds} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Link da sua lista</CardTitle>
              <CardDescription>
                {event.published
                  ? "Compartilhe com seus convidados pelo WhatsApp ou redes sociais."
                  : "Publique a lista para que este link fique acessível aos convidados."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShareLinkButtons url={publicUrl} published={event.published} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas reservas</CardTitle>
              <CardDescription>
                Da mais recente para a mais antiga. Só você vê os nomes dos convidados — eles não
                aparecem na lista pública.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GuestSelections selections={selections} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Presentes */}
        <TabsContent value="presentes">
          <Card>
            <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
              <div>
                <CardTitle>Presentes e vaquinhas</CardTitle>
                <CardDescription>
                  {event.gifts.length === 1 ? "1 item" : `${event.gifts.length} itens`}
                </CardDescription>
              </div>
              <GiftFormDialog eventId={event.id} pixConfigured={pixConfigured} />
            </CardHeader>
            <CardContent>
              <GiftList
                eventId={event.id}
                gifts={event.gifts}
                fundTotals={fundTotals}
                pixConfigured={pixConfigured}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personalização — largura de leitura: campos e uploaders não precisam esticar. */}
        <TabsContent value="personalizacao" className="flex max-w-3xl flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Capa e foto da lista</CardTitle>
              <CardDescription>
                A capa fica ao fundo, no topo da página; a foto de perfil fica redonda, metade sobre a
                capa e metade sobre o conteúdo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Capa (banner)</p>
                <CoverImageUploader eventId={event.id} currentUrl={event.coverImageUrl} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ideal: 1800 × 600 px (proporção 3:1). No celular as laterais podem ser cortadas,
                  então deixe o que importa no centro.
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Foto de perfil</p>
                <ProfileImageUploader eventId={event.id} currentUrl={event.profileImageUrl} />
                <p className="mt-2 text-xs text-muted-foreground">
                  Ideal: imagem quadrada, a partir de 400 × 400 px.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tema</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeSelector eventId={event.id} theme={event.theme} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações */}
        <TabsContent value="configuracoes" className="max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Informações do evento</CardTitle>
              <CardDescription>
                Dados exibidos aos convidados, local, endereço de entrega e sua chave Pix.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EventForm
                action={updateAction}
                submitLabel="Salvar alterações"
                hideTheme
                initialValues={event}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### `src/app/dashboard/eventos/[id]/event-form.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import type { Event } from "@prisma/client";

type ActionResult = { success: true } | { success: false; error: string };

function toDatetimeLocalValue(date: Date | string): string {
  const d = new Date(date);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface EventFormProps {
  action: (formData: FormData) => Promise<ActionResult>;
  submitLabel: string;
  /** Esconde o campo de tema — usado na aba Configurações, já que o tema tem seletor próprio na aba Personalização. */
  hideTheme?: boolean;
  initialValues?: Pick<
    Event,
    | "title"
    | "type"
    | "description"
    | "eventDate"
    | "pixKey"
    | "pixKeyType"
    | "deliveryAddress"
    | "locationName"
    | "locationAddress"
    | "locationMapsUrl"
    | "theme"
  >;
}

/** Grupo de campos com título: separa visualmente os assuntos de um formulário longo. */
function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-4 border-t border-border pt-6 first:border-t-0 first:pt-0">
      <div>
        <legend className="p-0 font-serif text-lg font-medium text-foreground">{title}</legend>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function EventForm({ action, submitLabel, hideTheme = false, initialValues }: EventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result && !result.success) {
        // Fica também inline: o formulário é longo e o erro costuma ser de um campo específico.
        setError(result.error);
        toast({ title: "Não foi possível salvar", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Alterações salvas" });
      router.refresh();
    });
  }

  // datetime-local espera "YYYY-MM-DDTHH:mm" em horário local (não UTC).
  const eventDateValue = initialValues?.eventDate ? toDatetimeLocalValue(initialValues.eventDate) : "";

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <FormSection title="Sobre o evento">
        <Field label="Nome do evento" htmlFor="title">
          <Input
            id="title"
            name="title"
            placeholder="Ex: Chá de casa nova do Lucas e Vitória"
            defaultValue={initialValues?.title}
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tipo do evento" htmlFor="type">
            <Select id="type" name="type" defaultValue={initialValues?.type ?? ""} required>
              <option value="" disabled>
                Selecione...
              </option>
              <option value="CHA_PANELA">Chá de Panela</option>
              <option value="CHA_CASA_NOVA">Chá de Casa Nova</option>
            </Select>
          </Field>
          <Field label="Data e horário (opcional)" htmlFor="eventDate">
            <Input id="eventDate" name="eventDate" type="datetime-local" defaultValue={eventDateValue} />
          </Field>
        </div>

        {!hideTheme && (
          <Field
            label="Tema visual da lista"
            htmlFor="theme"
            hint="Muda as cores só na página pública vista pelos convidados."
          >
            <Select id="theme" name="theme" defaultValue={initialValues?.theme ?? "SALVIA"}>
              <option value="SALVIA">Sálvia (padrão)</option>
              <option value="TERRACOTA">Terracota</option>
            </Select>
          </Field>
        )}
      </FormSection>

      <FormSection title="Local" description="Opcional — aparece no topo da lista, com link para o mapa.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do local" htmlFor="locationName">
            <Input
              id="locationName"
              name="locationName"
              placeholder="Ex: Salão de Festas Village Noble"
              defaultValue={initialValues?.locationName ?? ""}
            />
          </Field>
          <Field label="Link do Google Maps" htmlFor="locationMapsUrl">
            <Input
              id="locationMapsUrl"
              name="locationMapsUrl"
              type="url"
              inputMode="url"
              placeholder="https://maps.google.com/..."
              defaultValue={initialValues?.locationMapsUrl ?? ""}
            />
          </Field>
        </div>
        <Field label="Endereço" htmlFor="locationAddress">
          <Textarea
            id="locationAddress"
            name="locationAddress"
            placeholder="Rua, número, bairro, cidade"
            defaultValue={initialValues?.locationAddress ?? ""}
          />
        </Field>
      </FormSection>

      <FormSection title="Mensagem e entrega" description="Opcional — o que seus convidados leem antes de escolher.">
        <Field
          label="Mensagem para os convidados"
          htmlFor="description"
          hint="Quebras de linha são preservadas e **texto entre asteriscos duplos** fica em negrito."
        >
          <Textarea
            id="description"
            name="description"
            className="min-h-[160px]"
            placeholder="Estamos muito felizes em compartilhar esse momento com vocês..."
            defaultValue={initialValues?.description ?? ""}
          />
        </Field>
        <Field
          label="Endereço para entrega do presente"
          htmlFor="deliveryAddress"
          hint="Mostrado aos convidados que preferirem enviar o presente em vez de levá-lo no dia."
        >
          <Textarea
            id="deliveryAddress"
            name="deliveryAddress"
            placeholder="Rua, número, complemento, CEP"
            defaultValue={initialValues?.deliveryAddress ?? ""}
          />
        </Field>
      </FormSection>

      <FormSection title="Pix" description="Opcional — necessário para receber presentes em dinheiro.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tipo da chave" htmlFor="pixKeyType">
            <Select id="pixKeyType" name="pixKeyType" defaultValue={initialValues?.pixKeyType ?? ""}>
              <option value="">Não informar agora</option>
              <option value="CPF">CPF</option>
              <option value="CNPJ">CNPJ</option>
              <option value="EMAIL">E-mail</option>
              <option value="TELEFONE">Telefone</option>
              <option value="ALEATORIA">Chave aleatória</option>
            </Select>
          </Field>
          <Field label="Chave Pix" htmlFor="pixKey">
            <Input id="pixKey" name="pixKey" defaultValue={initialValues?.pixKey ?? ""} />
          </Field>
        </div>
      </FormSection>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end border-t border-border pt-6">
        <Button type="submit" disabled={isPending} className="w-full sm:w-auto sm:min-w-[11rem]">
          {isPending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
```

### `src/app/dashboard/eventos/[id]/funds-overview.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PiggyBank } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GiftImage } from "@/components/gift-image";
import { FundProgress } from "@/components/fund-progress";
import { toast } from "@/hooks/use-toast";
import { cn, formatCentsToBRL } from "@/lib/utils";
import type { FundTotals } from "@/lib/fund";
import { confirmContributionAction, rejectContributionAction } from "@/actions/contribution.actions";

export interface FundContributionItem {
  id: string;
  guestName: string;
  amountInCents: number;
  status: "DECLARED" | "CONFIRMED";
  /** ISO 8601 */
  declaredAt: string;
}

export interface FundOverviewItem {
  giftId: string;
  name: string;
  imageUrl: string | null;
  minInCents: number;
  totals: FundTotals;
  contributions: FundContributionItem[];
}

const RECENT_LIMIT = 5;
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

export function FundsOverview({ funds }: { funds: FundOverviewItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      {funds.map((fund) => (
        <FundBlock key={fund.giftId} fund={fund} />
      ))}
    </div>
  );
}

function FundBlock({ fund }: { fund: FundOverviewItem }) {
  const [showAll, setShowAll] = useState(false);

  // Aguardando confirmação sempre primeiro (é onde o anfitrião precisa agir); depois, as mais recentes.
  const ordered = [...fund.contributions].sort((a, b) => {
    if (a.status !== b.status) return a.status === "DECLARED" ? -1 : 1;
    return b.declaredAt.localeCompare(a.declaredAt);
  });
  const visible = showAll
    ? ordered
    : ordered.filter((item, index) => index < RECENT_LIMIT || item.status === "DECLARED");
  const hiddenCount = ordered.length - visible.length;

  return (
    <section aria-labelledby={`fund-${fund.giftId}`} className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-border bg-white">
          <GiftImage src={fund.imageUrl} alt="" fill fit="contain" sizes="48px" />
        </div>
        <div className="min-w-0">
          <h3 id={`fund-${fund.giftId}`} className="flex items-center gap-2 font-medium text-foreground">
            <PiggyBank className="h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">{fund.name}</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Mínimo por pessoa: {formatCentsToBRL(fund.minInCents)}
          </p>
        </div>
      </div>

      <FundProgress size="lg" {...fund.totals} />

      {fund.contributions.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
          Ainda sem contribuições. Compartilhe o link da lista para os convidados começarem a contribuir.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <ul className="flex flex-col divide-y divide-border rounded-lg border border-border">
            {visible.map((item) => (
              <ContributionRow key={item.id} item={item} />
            ))}
          </ul>
          {(hiddenCount > 0 || showAll) && ordered.length > RECENT_LIMIT && (
            <Button variant="ghost" size="sm" className="self-center" onClick={() => setShowAll((current) => !current)}>
              {showAll ? "Mostrar só as mais recentes" : `Ver todas (${ordered.length})`}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

function ContributionRow({ item }: { item: FundContributionItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [removeOpen, setRemoveOpen] = useState(false);
  const awaiting = item.status === "DECLARED";

  function handleConfirm() {
    startTransition(async () => {
      const result = await confirmContributionAction(item.id);
      if (!result.success) {
        toast({ title: "Não foi possível confirmar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: "Contribuição confirmada",
        description: `${formatCentsToBRL(item.amountInCents)} de ${item.guestName} entrou na vaquinha.`,
      });
      router.refresh();
    });
  }

  function handleRemove() {
    startTransition(async () => {
      const result = await rejectContributionAction(item.id);
      setRemoveOpen(false);
      if (!result.success) {
        toast({ title: "Não foi possível remover", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Contribuição removida", description: "O valor deixou de contar na vaquinha." });
      router.refresh();
    });
  }

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 p-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">
          {formatCentsToBRL(item.amountInCents)}{" "}
          <span className="font-normal text-muted-foreground">· {item.guestName}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {dateFormatter.format(new Date(item.declaredAt))} ·{" "}
          <span className={cn("font-medium", awaiting ? "text-secondary-strong" : "text-primary")}>
            {awaiting ? "Aguardando confirmação" : "Pix confirmado"}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        {awaiting && (
          <Button size="sm" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Confirmando..." : "Confirmar recebimento"}
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setRemoveOpen(true)}
          disabled={isPending}
          aria-label={`${awaiting ? "Recusar" : "Remover"} contribuição de ${formatCentsToBRL(item.amountInCents)} de ${item.guestName}`}
        >
          {awaiting ? "Recusar" : "Remover"}
        </Button>
      </div>

      <ConfirmDialog
        open={removeOpen}
        onOpenChange={setRemoveOpen}
        title={awaiting ? "Recusar esta contribuição?" : "Remover esta contribuição?"}
        description={`${formatCentsToBRL(item.amountInCents)} de ${item.guestName} deixa de contar na vaquinha. ${
          awaiting ? "Use quando o Pix não chegou ou foi declarado por engano." : "Use só se o valor foi devolvido ou lançado errado."
        }`}
        confirmLabel={awaiting ? "Sim, recusar" : "Sim, remover"}
        isPending={isPending}
        onConfirm={handleRemove}
      />
    </li>
  );
}
```

### `src/app/dashboard/eventos/[id]/gift-form-dialog.tsx`

```tsx
"use client";

import { Fragment, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Gift as GiftIcon, PiggyBank, Plus } from "lucide-react";
import type { Gift } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createGiftAction, updateGiftAction } from "@/actions/gift.actions";

type ActionResult = { success: true } | { success: false; error: string };
type Kind = "PRODUCT" | "FUND";

interface GiftFormDialogProps {
  eventId: string;
  gift?: Gift;
  trigger?: React.ReactNode;
  /** Sem chave Pix ninguém consegue contribuir com uma vaquinha: avisamos já na criação. */
  pixConfigured?: boolean;
}

const KIND_OPTIONS: { value: Kind; title: string; description: string; icon: typeof GiftIcon }[] = [
  {
    value: "PRODUCT",
    title: "Presente",
    description: "Um item que o convidado escolhe e compra ou paga.",
    icon: GiftIcon,
  },
  {
    value: "FUND",
    title: "Vaquinha",
    description: "Vários convidados contribuem em Pix, cada um com o valor que quiser.",
    icon: PiggyBank,
  },
];

function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function GiftFormDialog({ eventId, gift, trigger, pixConfigured = true }: GiftFormDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(gift);
  // O tipo não muda depois de criado: reservas e contribuições seguem regras diferentes.
  const [kind, setKind] = useState<Kind>(gift?.kind ?? "PRODUCT");
  const isFund = kind === "FUND";

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setError(null);
      // Ao criar, o próximo item volta a começar como "Presente".
      if (!isEditing) setKind("PRODUCT");
    }
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const action: (fd: FormData) => Promise<ActionResult> = isEditing
        ? (fd) => updateGiftAction(gift!.id, fd)
        : (fd) => createGiftAction(eventId, fd);

      const result = await action(formData);
      if (!result.success) {
        // Fica inline (dentro do modal, junto dos campos) e também vira toast.
        setError(result.error);
        toast({ title: "Não foi possível salvar", description: result.error, variant: "destructive" });
        return;
      }
      const noun = isFund ? "Vaquinha" : "Presente";
      toast({ title: isEditing ? `${noun} atualizada` : `${noun} adicionada` });
      handleOpenChange(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <Plus className="mr-1.5 h-4 w-4" />
            Adicionar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (isFund ? "Editar vaquinha" : "Editar presente") : "Novo item da lista"}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="kind" value={kind} />

          {!isEditing && (
            <div role="radiogroup" aria-label="Tipo do item" className="grid grid-cols-2 gap-2">
              {KIND_OPTIONS.map(({ value, title, description, icon: Icon }) => {
                const selected = kind === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setKind(value)}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      selected ? "border-primary bg-primary/5" : "border-input bg-card hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {title}
                    </span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              defaultValue={gift?.name}
              placeholder={isFund ? "Lua de mel" : "Jogo de panelas"}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={gift?.description ?? ""}
              placeholder={isFund ? "Conte para onde vai o dinheiro e por que é especial." : undefined}
            />
          </div>

          {/* key por variante: sem ela o React reaproveita o <input> da "Quantidade" (valor 1) no campo "Mínimo"
              ao trocar de Presente para Vaquinha, e o 1 vazaria como mínimo de R$ 1,00. */}
          {isFund ? (
            <Fragment key="fund-fields">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">Meta total (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    inputMode="decimal"
                    placeholder="5.000,00"
                    defaultValue={gift ? centsToInput(gift.priceInCents) : ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="minContribution">Mínimo por pessoa (R$)</Label>
                  <Input
                    id="minContribution"
                    name="minContribution"
                    inputMode="decimal"
                    placeholder="50,00"
                    defaultValue={gift?.minContributionInCents ? centsToInput(gift.minContributionInCents) : ""}
                    required
                  />
                </div>
              </div>
              <p className="-mt-2 text-xs text-muted-foreground">
                Cada convidado escolhe quanto contribuir a partir do mínimo. A meta não é um limite: dá para
                arrecadar mais do que ela, o que evita conflito quando várias pessoas contribuem ao mesmo tempo.
              </p>
              {!pixConfigured && (
                <p role="alert" className="rounded-md bg-muted p-3 text-sm text-foreground">
                  Você ainda não cadastrou a chave Pix. Faça isso em <strong>Configurações</strong> — sem ela, os
                  convidados não conseguem contribuir.
                </p>
              )}
            </Fragment>
          ) : (
            <Fragment key="product-fields">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">Valor (R$)</Label>
                  <Input
                    id="price"
                    name="price"
                    inputMode="decimal"
                    placeholder="450,00"
                    defaultValue={gift ? centsToInput(gift.priceInCents) : ""}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    defaultValue={gift?.quantity ?? 1}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="purchaseUrl">Link da loja (opcional)</Label>
                <Input
                  id="purchaseUrl"
                  name="purchaseUrl"
                  type="url"
                  placeholder="https://..."
                  defaultValue={gift?.purchaseUrl ?? ""}
                />
              </div>
            </Fragment>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="image">
              Imagem {isEditing ? "(envie apenas se quiser trocar)" : "(opcional)"}
            </Label>
            <Input id="image" name="image" type="file" accept="image/png,image/jpeg,image/webp" />
            <p className="text-xs text-muted-foreground">
              A imagem aparece inteira em um quadrado — sem cortes. Fundo branco fica melhor.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="mt-1">
            {isPending ? "Salvando..." : isEditing ? "Salvar alterações" : isFund ? "Criar vaquinha" : "Adicionar presente"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### `src/app/dashboard/eventos/[id]/gift-list.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Gift } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/lib/utils";
import { deleteGiftAction } from "@/actions/gift.actions";
import { GiftFormDialog } from "./gift-form-dialog";
import { PackageOpen, Pencil, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { GiftImage } from "@/components/gift-image";
import { toast } from "@/hooks/use-toast";
import { computeFundProgress, type FundTotals } from "@/lib/fund";
import { PiggyBank } from "lucide-react";

// Mesmas colunas no cabeçalho e nas linhas: miniatura | nome | quantidade | valor | ações.
// No celular, quantidade e valor descem para baixo do nome e só sobram 3 colunas.
const ROW_GRID = "grid grid-cols-[3rem_1fr_auto] items-center gap-x-3 md:grid-cols-[3rem_1fr_6rem_8rem_6.5rem]";

interface GiftListProps {
  eventId: string;
  gifts: Gift[];
  /** Totais por vaquinha (chave = id do presente). */
  fundTotals: Record<string, FundTotals>;
  pixConfigured: boolean;
}

export function GiftList({ eventId, gifts, fundTotals, pixConfigured }: GiftListProps) {
  if (gifts.length === 0) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="Sua lista ainda está vazia"
        description="Adicione seu primeiro presente para começar."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div
        className={`${ROW_GRID} hidden bg-muted/40 px-3 py-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid`}
        aria-hidden="true"
      >
        <span className="col-span-2">Presente</span>
        <span>Quantidade</span>
        <span>Valor</span>
        <span className="text-right">Ações</span>
      </div>
      <ul className="divide-y divide-border">
        {gifts.map((gift) => (
          <GiftRow
            key={gift.id}
            eventId={eventId}
            gift={gift}
            fundTotals={fundTotals[gift.id]}
            pixConfigured={pixConfigured}
          />
        ))}
      </ul>
    </div>
  );
}

function GiftRow({
  eventId,
  gift,
  fundTotals,
  pixConfigured,
}: {
  eventId: string;
  gift: Gift;
  fundTotals?: FundTotals;
  pixConfigured: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function confirmDelete() {
    startTransition(async () => {
      const result = await deleteGiftAction(gift.id);
      setConfirmOpen(false);
      if (!result.success) {
        toast({
          title: "Não foi possível excluir o presente",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({ title: "Presente excluído", description: `“${gift.name}” foi removido da lista.` });
      router.refresh();
    });
  }

  const price = formatCentsToBRL(gift.priceInCents);
  const isFund = gift.kind === "FUND";
  const fund = isFund && fundTotals ? computeFundProgress(fundTotals) : null;

  return (
    <li className={`${ROW_GRID} px-3 py-3`}>
      <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
        <GiftImage src={gift.imageUrl} alt={gift.name} fill fit="contain" sizes="48px" />
      </div>

      <div className="min-w-0">
        <p className="line-clamp-2 break-words font-medium text-foreground">
          {isFund && (
            <span className="mr-1.5 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 align-middle text-[11px] font-medium text-primary">
              <PiggyBank className="h-3 w-3" aria-hidden="true" />
              Vaquinha
            </span>
          )}
          {gift.name}
        </p>
        {/* Só no celular: no desktop esses dados têm coluna própria. */}
        <p className="mt-0.5 text-sm text-muted-foreground md:hidden">
          {isFund ? `Meta ${price}` : `${price} · ${gift.quantity} un.`}
        </p>
        {fund && (
          <div className="mt-1.5 max-w-xs">
            <div
              role="progressbar"
              aria-label={`Progresso de ${gift.name}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(fund.percent, 100)}
              className="relative h-1.5 overflow-hidden rounded-full bg-muted"
            >
              <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${fund.confirmedBarPercent}%` }} />
              <div
                className="absolute inset-y-0 bg-primary/40"
                style={{ left: `${fund.confirmedBarPercent}%`, width: `${fund.pendingBarPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatCentsToBRL(fund.raisedInCents)} de {price} · {fund.percent}%
              {fund.reached && " · meta atingida 🎉"}
            </p>
          </div>
        )}
      </div>

      <span className="hidden text-sm text-muted-foreground md:block">{isFund ? "—" : gift.quantity}</span>
      <span className="hidden text-sm text-muted-foreground md:block">
        {isFund ? `Meta ${price}` : price}
      </span>

      <div className="flex justify-end gap-1">
        <GiftFormDialog
          eventId={eventId}
          gift={gift}
          pixConfigured={pixConfigured}
          trigger={
            <Button size="icon" variant="ghost" aria-label={`Editar ${gift.name}`}>
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setConfirmOpen(true)}
          disabled={isPending}
          aria-label={`Excluir ${gift.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title={`Excluir "${gift.name}"?`}
          description="Essa ação não pode ser desfeita."
          confirmLabel="Excluir"
          isPending={isPending}
          onConfirm={confirmDelete}
        />
      </div>
    </li>
  );
}
```

### `src/app/dashboard/eventos/[id]/guest-selections.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { toast } from "@/hooks/use-toast";
import { confirmPixReceivedAction } from "@/actions/payment.actions";
import { Inbox } from "lucide-react";

const RECENT_LIMIT = 8;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });

function isAwaitingPixConfirmation(selection: GuestSelection): boolean {
  return selection.paymentMethod === "PIX" && selection.pixStatus === "DECLARED";
}

export interface GuestSelection {
  reservationId: string;
  /** ISO 8601 — a lista chega ordenada da mais recente para a mais antiga. */
  reservedAt: string;
  giftName: string;
  guestName: string;
  priceLabel: string;
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX" | null;
  status: string;
  pixStatus: string;
}

function statusLabel(selection: GuestSelection): string {
  if (selection.paymentMethod === "PIX") {
    if (selection.pixStatus === "CONFIRMED") return "Pix confirmado";
    if (selection.pixStatus === "DECLARED") return "Aguardando confirmação";
    return "Aguardando pagamento";
  }
  if (selection.status === "COMPLETED") return "Compra confirmada";
  if (selection.status === "CONFIRMED") return "Selecionado";
  return "Reserva em andamento";
}

export function GuestSelections({ selections }: { selections: GuestSelection[] }) {
  const [showAll, setShowAll] = useState(false);

  if (selections.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Ainda não há presentes escolhidos"
        description="Assim que seus convidados escolherem, eles aparecem aqui com o método e o status."
        className="py-10"
      />
    );
  }

  // Um Pix aguardando confirmação nunca some atrás do "Ver todas": é a única
  // ação que o anfitrião precisa fazer aqui.
  const visible = showAll
    ? selections
    : selections.filter(
        (selection, index) => index < RECENT_LIMIT || isAwaitingPixConfirmation(selection)
      );
  const hiddenCount = selections.length - visible.length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border">
        {visible.map((selection) => (
          <SelectionRow key={selection.reservationId} selection={selection} />
        ))}
      </div>
      {(hiddenCount > 0 || showAll) && selections.length > RECENT_LIMIT && (
        <Button
          variant="ghost"
          size="sm"
          className="self-center"
          onClick={() => setShowAll((current) => !current)}
        >
          {showAll ? "Mostrar só as mais recentes" : `Ver todas (${selections.length})`}
        </Button>
      )}
    </div>
  );
}

function SelectionRow({ selection }: { selection: GuestSelection }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const awaitingConfirmation = isAwaitingPixConfirmation(selection);

  function handleConfirm() {
    startTransition(async () => {
      const result = await confirmPixReceivedAction(selection.reservationId);
      if (!result.success) {
        toast({
          title: "Não foi possível confirmar o Pix",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Pix confirmado",
        description: `Recebimento de “${selection.giftName}” registrado.`,
      });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <div>
        <p className="font-medium text-foreground">{selection.giftName}</p>
        <p className="text-sm text-muted-foreground">
          {selection.guestName} · {selection.priceLabel} ·{" "}
          {selection.paymentMethod === "PIX" ? "Pix" : "Compra externa"} ·{" "}
          {dateFormatter.format(new Date(selection.reservedAt))}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`text-sm ${
            selection.pixStatus === "CONFIRMED" || selection.status === "COMPLETED"
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          {statusLabel(selection)}
        </span>
        {awaitingConfirmation && (
          <Button size="sm" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Confirmando..." : "Confirmar recebimento"}
          </Button>
        )}
      </div>
    </div>
  );
}
```

### `src/app/dashboard/eventos/[id]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateEventAction } from "@/actions/event.actions";
import type { GuestSelection } from "./guest-selections";
import { EventDashboardView } from "./event-dashboard-view";
import { computeGiftAvailability, ACTIVE_RESERVATION_STATUSES } from "@/lib/gift-availability";
import { formatCentsToBRL } from "@/lib/utils";
import type { FundTotals } from "@/lib/fund";
import type { FundOverviewItem } from "./funds-overview";

export const metadata: Metadata = { title: "Gerenciar lista" };

export default async function EventoPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const now = new Date();

  const event = await prisma.event.findUnique({
    where: { id: params.id },
    include: {
      gifts: {
        orderBy: { createdAt: "asc" },
        include: {
          reservations: {
            // Só a página pública marca TEMPORARY vencida como EXPIRED; aqui ela
            // precisa ser ignorada na leitura, senão infla "reservados".
            where: {
              status: { in: [...ACTIVE_RESERVATION_STATUSES] },
              NOT: { status: "TEMPORARY", expiresAt: { lt: now } },
            },
            include: { guest: { select: { name: true, email: true } } },
          },
          // Vaquinha: só o que conta na barra (a cancelada não entra).
          contributions: {
            where: { status: { in: ["DECLARED", "CONFIRMED"] } },
            include: { guest: { select: { name: true, email: true } } },
            orderBy: { declaredAt: "desc" },
          },
        },
      },
    },
  });

  if (!event || event.ownerId !== session.user.id) {
    notFound();
  }

  // Métricas da aba Resumo (seção 16 do documento)
  const totalGifts = event.gifts.length;
  let selectedUnits = 0;
  let availableUnits = 0;
  let pixPendingCents = 0;
  let pixConfirmedCents = 0;
  const selections: GuestSelection[] = [];
  const fundTotals: Record<string, FundTotals> = {};
  const funds: FundOverviewItem[] = [];

  for (const gift of event.gifts) {
    if (gift.kind === "FUND") {
      // Vaquinha não tem unidades: não entra em "reservados/disponíveis", só no dinheiro.
      let confirmed = 0;
      let pending = 0;
      for (const contribution of gift.contributions) {
        if (contribution.status === "CONFIRMED") confirmed += contribution.amountInCents;
        else pending += contribution.amountInCents;
      }
      pixConfirmedCents += confirmed;
      pixPendingCents += pending;

      const totals: FundTotals = {
        goalInCents: gift.priceInCents,
        confirmedInCents: confirmed,
        pendingInCents: pending,
        contributionsCount: gift.contributions.length,
      };
      fundTotals[gift.id] = totals;
      funds.push({
        giftId: gift.id,
        name: gift.name,
        imageUrl: gift.imageUrl,
        minInCents: gift.minContributionInCents ?? 1,
        totals,
        contributions: gift.contributions.map((contribution) => ({
          id: contribution.id,
          guestName: contribution.guest.name ?? contribution.guest.email,
          amountInCents: contribution.amountInCents,
          status: contribution.status as "DECLARED" | "CONFIRMED",
          declaredAt: contribution.declaredAt.toISOString(),
        })),
      });
      continue;
    }

    const active = gift.reservations.length;
    selectedUnits += active;
    availableUnits += computeGiftAvailability(gift.quantity, active).availableUnits;

    for (const reservation of gift.reservations) {
      if (reservation.paymentMethod === "PIX") {
        if (reservation.pixStatus === "DECLARED") pixPendingCents += gift.priceInCents;
        if (reservation.pixStatus === "CONFIRMED") pixConfirmedCents += gift.priceInCents;
      }
      selections.push({
        reservationId: reservation.id,
        reservedAt: reservation.reservedAt.toISOString(),
        giftName: gift.name,
        guestName: reservation.guest.name ?? reservation.guest.email,
        priceLabel: formatCentsToBRL(gift.priceInCents),
        paymentMethod: reservation.paymentMethod,
        status: reservation.status,
        pixStatus: reservation.pixStatus,
      });
    }
  }

  // ISO 8601 ordena corretamente como texto.
  selections.sort((a, b) => b.reservedAt.localeCompare(a.reservedAt));

  const primaryMetrics = [
    { label: "Total arrecadado via Pix", value: formatCentsToBRL(pixConfirmedCents) },
    { label: "Presentes reservados", value: String(selectedUnits) },
    { label: "Presentes disponíveis", value: String(availableUnits) },
  ];
  const secondaryMetrics = [
    { label: "Total de presentes", value: String(totalGifts) },
    { label: "Pix pendentes", value: formatCentsToBRL(pixPendingCents) },
  ];

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = host?.startsWith("localhost") ? "http" : "https";
  const publicUrl = `${protocol}://${host}/lista/${event.slug}-${event.secureToken}`;

  const boundUpdateAction = updateEventAction.bind(null, event.id);

  return (
    <EventDashboardView
      event={event}
      primaryMetrics={primaryMetrics}
      secondaryMetrics={secondaryMetrics}
      selections={selections}
      publicUrl={publicUrl}
      updateAction={boundUpdateAction}
      funds={funds}
      fundTotals={fundTotals}
      pixConfigured={Boolean(event.pixKey && event.pixKeyType)}
    />
  );
}
```

### `src/app/dashboard/eventos/[id]/profile-image-uploader.tsx`

```tsx
"use client";

import { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { GiftImage } from "@/components/gift-image";
import { updateEventProfileImageAction } from "@/actions/event.actions";
import { Upload } from "lucide-react";

export function ProfileImageUploader({
  eventId,
  currentUrl,
}: {
  eventId: string;
  currentUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.set("profile", file);

    startTransition(async () => {
      const result = await updateEventProfileImageAction(eventId, formData);
      if (!result.success) {
        toast({ title: "Não foi possível enviar a foto", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Foto de perfil atualizada" });
      router.refresh();
    });

    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-border">
        <GiftImage src={currentUrl} alt="Foto de perfil" width={64} height={64} />
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          {isPending ? "Enviando..." : currentUrl ? "Trocar foto" : "Adicionar foto"}
        </Button>
      </div>
    </div>
  );
}
```

### `src/app/dashboard/eventos/[id]/publish-toggle.tsx`

```tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { setEventPublishedAction } from "@/actions/event.actions";

export function PublishToggle({ eventId, published }: { eventId: string; published: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await setEventPublishedAction(eventId, !published);
      if (!result.success) {
        toast({
          title: published ? "Não foi possível despublicar" : "Não foi possível publicar",
          description: result.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: published ? "Lista despublicada" : "Lista publicada",
        description: published
          ? "O link deixou de ficar acessível aos convidados."
          : "Seus convidados já podem acessar o link.",
      });
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-medium ${published ? "text-primary" : "text-muted-foreground"}`}>
        {published ? "Publicada" : "Rascunho"}
      </span>
      <Button size="sm" variant={published ? "outline" : "default"} onClick={handleToggle} disabled={isPending}>
        {isPending ? "Salvando..." : published ? "Despublicar" : "Publicar lista"}
      </Button>
    </div>
  );
}
```

### `src/app/dashboard/eventos/[id]/share-link-buttons.tsx`

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy, Share2, Check, ExternalLink } from "lucide-react";

export function ShareLinkButtons({ url, published }: { url: string; published: boolean }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Selecione o link e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(true);
    toast({ title: "Link copiado!", description: "Agora é só colar e enviar." });
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Minha lista de presentes", url });
      } catch {
        // usuário cancelou o compartilhamento — sem problema
      }
    } else {
      await handleCopy();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <code className="block max-w-full select-all overflow-x-auto whitespace-nowrap rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        {url}
      </code>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
          {copied ? "Copiado" : "Copiar link"}
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={handleShare}>
          <Share2 className="mr-1.5 h-3.5 w-3.5" />
          Compartilhar
        </Button>
        {/* Pré-visualizar só faz sentido publicada: rascunho responde 404 para todo mundo. */}
        {published && (
          <Button variant="ghost" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Abrir lista pública
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
```

### `src/app/dashboard/eventos/[id]/theme-selector.tsx`

```tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { updateEventThemeAction } from "@/actions/event.actions";
import type { ThemeName } from "@prisma/client";

export function ThemeSelector({ eventId, theme }: { eventId: string; theme: ThemeName }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    startTransition(async () => {
      const result = await updateEventThemeAction(eventId, value as "SALVIA" | "TERRACOTA");
      if (!result.success) {
        toast({ title: "Não foi possível salvar o tema", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Tema atualizado", description: "A página pública já reflete a mudança." });
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="theme-selector">Tema visual da lista</Label>
      <Select
        id="theme-selector"
        defaultValue={theme}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value)}
        className="max-w-xs"
      >
        <option value="SALVIA">Sálvia (padrão)</option>
        <option value="TERRACOTA">Terracota</option>
      </Select>
      <p className="text-xs text-muted-foreground">
        Muda as cores só na página pública vista pelos convidados.
      </p>
    </div>
  );
}
```

### `src/app/dashboard/layout.tsx`

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-muted/20">
      {/* O atalho só faz sentido onde há um cabeçalho repetido antes do conteúdo. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="rounded-sm font-serif text-lg font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Presenteie
          </Link>
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <span className="hidden truncate text-sm text-muted-foreground sm:inline">
              {session?.user?.name ?? session?.user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main id="conteudo" tabIndex={-1} className="container py-8 focus:outline-none sm:py-10">
        {children}
      </main>
    </div>
  );
}
```

### `src/app/dashboard/loading.tsx`

```tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando...</span>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-11 w-32" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-36" />
        ))}
      </div>
    </div>
  );
}
```

### `src/app/dashboard/nova-lista/page.tsx`

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EventForm } from "../eventos/[id]/event-form";
import { createEventAction } from "@/actions/event.actions";

export const metadata: Metadata = { title: "Nova lista" };

export default function NovaListaPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <Link
        href="/dashboard"
        className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Suas listas
      </Link>
      <Card>
        <CardHeader>
          <CardTitle as="h1">Criar sua lista</CardTitle>
          <CardDescription>
            Comece com as informações básicas — você pode adicionar os presentes e a chave Pix
            em seguida.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventForm action={createEventAction} submitLabel="Criar lista" />
        </CardContent>
      </Card>
    </div>
  );
}
```

### `src/app/dashboard/page.tsx`

```tsx
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();

  const events = session?.user?.id
    ? await prisma.event.findMany({
        where: { ownerId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { gifts: true } } },
      })
    : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl font-medium text-foreground">Suas listas</h1>
        <Button asChild>
          <Link href="/dashboard/nova-lista">Criar lista</Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="mx-auto max-w-lg text-center">
          <CardHeader>
            <CardTitle>Você ainda não tem nenhuma lista</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Crie sua primeira lista de presentes para começar a compartilhar com seus convidados.
            </p>
            <Button asChild>
              <Link href="/dashboard/nova-lista">Criar minha lista</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event: Event & { _count: { gifts: number } }) => (
            <Link
              key={event.id}
              href={`/dashboard/eventos/${event.id}`}
              className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    {event.type === "CHA_PANELA" ? "Chá de Panela" : "Chá de Casa Nova"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm">
                  {/* Status por ponto + texto: a cor sozinha não pode ser a única pista. */}
                  <span
                    className={`inline-flex items-center gap-1.5 font-medium ${
                      event.published ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${event.published ? "bg-primary" : "border border-muted-foreground"}`}
                      aria-hidden="true"
                    />
                    {event.published ? "Publicada" : "Rascunho"}
                  </span>
                  <span className="text-muted-foreground">
                    {event._count.gifts === 1 ? "1 presente" : `${event._count.gifts} presentes`}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

### `src/app/dashboard/sign-out-button.tsx`

```tsx
"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      // Se o signOut falhar, a página não navega: libera o botão e avisa.
      setIsLoading(false);
      toast({ title: "Não foi possível sair", description: "Tente novamente.", variant: "destructive" });
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={isLoading}>
      {isLoading ? "Saindo..." : "Sair"}
    </Button>
  );
}
```

### `src/app/error.tsx`

```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // O detalhe técnico fica no console/log; o usuário vê só a mensagem amigável.
    console.error("[app-error]", { message: error.message, digest: error.digest });
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-2xl font-medium text-foreground">
        Algo não saiu como esperado
      </h1>
      <p className="max-w-sm text-muted-foreground">
        Não foi possível concluir essa ação. Tente novamente em instantes.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </main>
  );
}
```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/*
  Sistema de design — Lista de Presentes
  Paleta pensada para celebração e acolhimento (chá de panela / casa nova),
  evitando o "look" genérico de creme + terracota.

  Base:      #FBF8F3  (branco quente, quase marfim)
  Primária:  #3F5443  (verde-sálvia profundo — estabilidade, "novo lar")
  Secundária:#C97B84  (rosa-empoeirado — celebração, afeto)
  Acento:    #B9975B  (dourado envelhecido — detalhe, destaque pontual)
  Texto:     #2B2A28  (quase-preto quente)
*/

@layer base {
  :root {
    --background: 36 38% 97%;
    --foreground: 40 6% 15%;

    --card: 36 42% 99%;
    --card-foreground: 40 6% 15%;

    --primary: 141 15% 24%;
    --primary-foreground: 40 30% 97%;

    --secondary: 353 39% 65%;
    --secondary-foreground: 40 6% 12%;
    /* Versão da secundária própria para TEXTO: a base tem só ~2,8:1 sobre o fundo (reprova WCAG AA). */
    --secondary-strong: 353 42% 42%;

    --muted: 36 24% 90%;
    --muted-foreground: 40 8% 36%;

    --accent: 37 34% 52%;
    --accent-foreground: 40 30% 97%;

    --destructive: 4 72% 46%;
    --destructive-foreground: 40 30% 97%;

    --border: 36 20% 85%;
    /* Borda de campos de formulário: precisa de ≥3:1 contra o fundo (WCAG 1.4.11); a --border é só divisória. */
    --input: 36 10% 55%;
    --radius: 0.5rem;
  }

  /*
    Tema "Terracota" — alternativa mais quente, opcional, escolhida pelo
    anfitrião na Personalização da lista. Ativado via [data-theme="terracota"]
    na página pública (nunca no dashboard, que mantém a identidade padrão
    do produto).
  */
  [data-theme="terracota"] {
    --background: 30 45% 96%;
    --foreground: 20 20% 16%;

    --card: 30 50% 98%;
    --card-foreground: 20 20% 16%;

    --primary: 14 55% 40%;
    --primary-foreground: 30 40% 97%;

    --secondary: 32 60% 55%;
    --secondary-foreground: 20 20% 12%;
    --secondary-strong: 26 75% 34%;

    --muted: 28 30% 90%;
    --muted-foreground: 20 12% 38%;

    --accent: 8 45% 48%;
    --accent-foreground: 30 40% 97%;

    --border: 28 25% 85%;
    --input: 28 12% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }

  /* Respeita quem pediu menos movimento no sistema (vestibular/enxaqueca): sem pulso de skeleton nem animações. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Presenteie | Listas de presentes para o seu chá",
    template: "%s | Presenteie",
  },
  description:
    "Crie sua lista de presentes para o chá de panela ou chá de casa nova e compartilhe com quem você ama.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Presenteie",
    title: "Presenteie | Listas de presentes para o seu chá",
    description:
      "Crie sua lista de presentes e compartilhe o link com seus convidados.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF8F3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

### `src/app/lista/[eventSlugToken]/contribute-dialog.tsx`

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, Copy, ImageOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FundProgress } from "@/components/fund-progress";
import { toast } from "@/hooks/use-toast";
import { cn, formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, suggestContributionAmounts, type FundTotals } from "@/lib/fund";
import { MAX_AMOUNT_IN_CENTS, parsePriceToCents } from "@/schemas/gift.schema";
import {
  cancelContributionAction,
  declareContributionAction,
  getContributionPixAction,
  type ContributionPixDetails,
} from "@/actions/contribution.actions";

export interface MyContribution {
  id: string;
  amountInCents: number;
  status: "DECLARED" | "CONFIRMED";
}

interface ContributeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  giftId: string;
  giftName: string;
  totals: FundTotals;
  minInCents: number;
  myContributions: MyContribution[];
  pixConfigured: boolean;
}

const pixKeyTypeLabel: Record<string, string> = {
  CPF: "CPF",
  CNPJ: "CNPJ",
  EMAIL: "E-mail",
  TELEFONE: "Telefone",
  ALEATORIA: "Chave aleatória",
};

function centsToInput(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function ContributeDialog({
  open,
  onOpenChange,
  giftId,
  giftName,
  totals,
  minInCents,
  myContributions,
  pixConfigured,
}: ContributeDialogProps) {
  const router = useRouter();
  // Uma flag por ação: o rótulo do botão nunca mostra "Gerando Pix..." enquanto outra coisa está em andamento.
  const [busy, setBusy] = useState<"pix" | "declare" | "cancel" | null>(null);
  const isBusy = busy !== null;
  const [step, setStep] = useState<"amount" | "pix">("amount");
  const [amountInput, setAmountInput] = useState("");
  const [pix, setPix] = useState<ContributionPixDetails | null>(null);
  const [qrFailed, setQrFailed] = useState(false);
  const [copied, setCopied] = useState<"key" | "code" | null>(null);
  const [cancelTarget, setCancelTarget] = useState<MyContribution | null>(null);

  const amountInCents = amountInput ? parsePriceToCents(amountInput) : NaN;
  const isValidAmount =
    Number.isFinite(amountInCents) && amountInCents >= minInCents && amountInCents <= MAX_AMOUNT_IN_CENTS;
  const showAmountError = Boolean(amountInput) && !isValidAmount;

  const progress = computeFundProgress(totals);
  const suggestions = suggestContributionAmounts(minInCents, progress.remainingInCents);

  // Prévia do efeito da contribuição: dá o "gostinho" de completar a barra.
  const projected = isValidAmount
    ? computeFundProgress({ ...totals, pendingInCents: totals.pendingInCents + amountInCents })
    : null;

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      // Reinicia o fluxo ao fechar, para reabrir sempre na escolha do valor.
      setStep("amount");
      setPix(null);
      setQrFailed(false);
    }
  }

  async function handleContinue() {
    if (!isValidAmount || isBusy) return;
    setBusy("pix");
    try {
      const result = await getContributionPixAction(giftId, amountInCents);
      if (!result.success) {
        toast({ title: "Não foi possível continuar", description: result.error, variant: "destructive" });
        return;
      }
      setPix(result.details);
      setQrFailed(false);
      setStep("pix");
    } finally {
      setBusy(null);
    }
  }

  async function handleDeclare() {
    if (isBusy) return;
    setBusy("declare");
    try {
      const result = await declareContributionAction(giftId, amountInCents);
      if (!result.success) {
        toast({ title: "Não foi possível registrar", description: result.error, variant: "destructive" });
        return;
      }
      toast({
        title: "Contribuição registrada. Obrigado!",
        description: "Assim que o anfitrião confirmar o Pix, ela passa a contar como confirmada.",
      });
      handleOpenChange(false);
      setAmountInput("");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function confirmCancel() {
    if (!cancelTarget || isBusy) return;
    setBusy("cancel");
    try {
      const result = await cancelContributionAction(cancelTarget.id);
      setCancelTarget(null);
      if (!result.success) {
        toast({ title: "Não foi possível cancelar", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Contribuição cancelada" });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function copy(text: string, which: "key" | "code") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Selecione o texto e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(which);
    toast({ title: which === "key" ? "Chave Pix copiada" : "Código Pix copiado" });
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Contribuir com a vaquinha</DialogTitle>
            <p className="text-sm text-muted-foreground">{giftName}</p>
          </DialogHeader>

          <div className="flex flex-col gap-5">
            {step === "amount" || !pixConfigured ? (
              <FundProgress size="lg" {...totals} />
            ) : (
              // No passo do Pix o foco é pagar: um resumo de uma linha libera espaço para o botão principal.
              <p className="text-sm text-muted-foreground">
                {formatCentsToBRL(progress.raisedInCents)} de {formatCentsToBRL(totals.goalInCents)} ·{" "}
                <span className="font-medium text-foreground">{progress.percent}%</span> da meta
              </p>
            )}

            {myContributions.length > 0 && step === "amount" && (
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="mb-2 text-xs font-medium text-foreground">Suas contribuições</p>
                <ul className="flex flex-col gap-2">
                  {myContributions.map((contribution) => (
                    <li key={contribution.id} className="flex items-center justify-between gap-2 text-sm">
                      <span>
                        <span className="font-medium">{formatCentsToBRL(contribution.amountInCents)}</span>{" "}
                        <span
                          className={cn(
                            "text-xs",
                            contribution.status === "CONFIRMED" ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          · {contribution.status === "CONFIRMED" ? "confirmada" : "aguardando confirmação"}
                        </span>
                      </span>
                      {contribution.status === "DECLARED" && (
                        <button
                          type="button"
                          onClick={() => setCancelTarget(contribution)}
                          disabled={isBusy}
                          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                        >
                          Cancelar
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!pixConfigured ? (
              <p role="alert" className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                O anfitrião ainda não cadastrou uma chave Pix, então não dá para contribuir por aqui por
                enquanto.
              </p>
            ) : step === "amount" ? (
              <form
                className="flex flex-col gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleContinue();
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contribution-amount">Quanto você quer contribuir?</Label>
                  <div className="relative">
                    <span
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                      aria-hidden="true"
                    >
                      R$
                    </span>
                    <Input
                      id="contribution-amount"
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="0,00"
                      value={amountInput}
                      onChange={(event) => setAmountInput(event.target.value.replace(/[^\d.,]/g, ""))}
                      aria-invalid={showAmountError}
                      aria-describedby="contribution-hint"
                      className="pl-10 text-base"
                    />
                  </div>
                  <p
                    id="contribution-hint"
                    className={cn("text-xs", showAmountError ? "text-destructive" : "text-muted-foreground")}
                  >
                    {showAmountError
                      ? `Informe um valor a partir de ${formatCentsToBRL(minInCents)}.`
                      : `Mínimo de ${formatCentsToBRL(minInCents)}. Não há limite: a meta pode ser superada.`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2" role="group" aria-label="Valores sugeridos">
                  {suggestions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmountInput(centsToInput(value))}
                      aria-pressed={amountInCents === value}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        amountInCents === value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input bg-card hover:bg-muted"
                      )}
                    >
                      {value === progress.remainingInCents ? `Completar (${formatCentsToBRL(value)})` : formatCentsToBRL(value)}
                    </button>
                  ))}
                </div>

                {projected && (
                  <p role="status" className="text-sm text-muted-foreground">
                    Com a sua contribuição a vaquinha vai para{" "}
                    <span className="font-semibold text-foreground">{projected.percent}%</span>
                    {projected.reached && " — meta atingida! 🎉"}
                  </p>
                )}

                <Button type="submit" disabled={!isValidAmount || isBusy} className="mt-1 w-full">
                  {busy === "pix" ? "Gerando Pix..." : "Continuar para o Pix"}
                </Button>
              </form>
            ) : (
              pix && (
                <div className="flex flex-col gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Valor a enviar</p>
                    <p className="font-serif text-3xl font-medium text-foreground">{pix.amountLabel}</p>
                  </div>

                  {!qrFailed && pix.qrCodeDataUrl ? (
                    <div className="mx-auto rounded-md border border-border bg-white p-2">
                      <Image
                        src={pix.qrCodeDataUrl}
                        alt="QR Code Pix"
                        width={176}
                        height={176}
                        unoptimized
                        onError={() => setQrFailed(true)}
                      />
                    </div>
                  ) : (
                    <div
                      role="img"
                      aria-label="QR Code indisponível"
                      className="mx-auto flex h-[192px] w-[192px] flex-col items-center justify-center gap-1 rounded-md bg-neutral-200 p-3 text-center text-neutral-500"
                    >
                      <ImageOff className="h-5 w-5" aria-hidden="true" />
                      <span className="text-[11px]">QR Code indisponível — use a chave ou o copia e cola.</span>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-muted-foreground">
                      {pixKeyTypeLabel[pix.pixKeyType] ?? pix.pixKeyType} de {pix.hostName}
                    </p>
                    <p className="break-all text-sm font-medium text-foreground">{pix.pixKey}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => copy(pix.pixKey, "key")}>
                      {copied === "key" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                      {copied === "key" ? "Copiada" : "Copiar chave"}
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => copy(pix.copyPasteCode, "code")}>
                      {copied === "code" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                      {copied === "code" ? "Copiado" : "Copia e cola"}
                    </Button>
                  </div>

                  <p className="rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
                    Faça o Pix no app do seu banco e depois toque em <strong>Já fiz o Pix</strong> para avisar o
                    anfitrião. A contribuição entra na barra como &quot;aguardando&quot; até ele confirmar.
                  </p>

                  <div className="flex flex-col gap-2">
                    <Button onClick={handleDeclare} disabled={isBusy} className="w-full">
                      {busy === "declare" ? "Registrando..." : "Já fiz o Pix"}
                    </Button>
                    <Button variant="ghost" onClick={() => setStep("amount")} disabled={isBusy} className="w-full">
                      Voltar e mudar o valor
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={cancelTarget !== null}
        onOpenChange={(next) => !next && setCancelTarget(null)}
        title="Cancelar esta contribuição?"
        description={
          cancelTarget
            ? `A contribuição de ${formatCentsToBRL(cancelTarget.amountInCents)} deixa de contar na vaquinha. Se você já fez o Pix, fale com o anfitrião.`
            : ""
        }
        confirmLabel="Sim, cancelar"
        cancelLabel="Manter"
        isPending={busy === "cancel"}
        onConfirm={confirmCancel}
      />
    </>
  );
}
```

### `src/app/lista/[eventSlugToken]/fund-card.tsx`

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PiggyBank } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FundProgress } from "@/components/fund-progress";
import { GiftImage } from "@/components/gift-image";
import type { FundTotals } from "@/lib/fund";
import { formatCentsToBRL } from "@/lib/utils";
import { ContributeDialog, type MyContribution } from "./contribute-dialog";
import { IdentifyGuestDialog } from "./identify-guest-dialog";

interface FundCardProps {
  gift: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    minInCents: number;
  };
  totals: FundTotals;
  myContributions: MyContribution[];
  isIdentified: boolean;
  pixConfigured: boolean;
}

/** Card da vaquinha: mesma estrutura do GiftCard (imagem quadrada inteira), com a barra de progresso no lugar do preço. */
export function FundCard({ gift, totals, myContributions, isIdentified, pixConfigured }: FundCardProps) {
  const router = useRouter();
  const [contributeOpen, setContributeOpen] = useState(false);
  const [identifyOpen, setIdentifyOpen] = useState(false);

  const myTotalInCents = myContributions.reduce((sum, item) => sum + item.amountInCents, 0);

  function handleContribute() {
    if (!isIdentified) {
      setIdentifyOpen(true);
      return;
    }
    setContributeOpen(true);
  }

  function handleIdentified() {
    setIdentifyOpen(false);
    setContributeOpen(true);
    // Atualiza a faixa "Identificado(a) como…" da página sem perder o diálogo aberto.
    router.refresh();
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-square w-full border-b border-border bg-white">
        <GiftImage
          src={gift.imageUrl}
          alt={gift.name}
          fill
          fit="contain"
          sizes="(min-width: 1024px) 285px, (min-width: 768px) 33vw, 50vw"
        />
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground shadow-sm">
          <PiggyBank className="h-3 w-3" aria-hidden="true" />
          Vaquinha
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="min-w-0">
          <h3 className="line-clamp-2 break-words font-serif text-base leading-snug text-foreground sm:text-lg">
            {gift.name}
          </h3>
          {gift.description && (
            <p className="mt-1 line-clamp-2 break-words text-xs text-muted-foreground sm:text-sm">
              {gift.description}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-1">
          <FundProgress {...totals} />

          <p className="text-[11px] text-muted-foreground">
            {totals.contributionsCount === 0
              ? "Seja o primeiro a contribuir"
              : totals.contributionsCount === 1
                ? "1 contribuição"
                : `${totals.contributionsCount} contribuições`}
            {" · "}mín. {formatCentsToBRL(gift.minInCents)}
          </p>

          {myTotalInCents > 0 && (
            <p className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Você contribuiu com {formatCentsToBRL(myTotalInCents)}
            </p>
          )}

          <Button size="sm" onClick={handleContribute} className="w-full">
            {myTotalInCents > 0 ? "Contribuir de novo" : "Contribuir"}
          </Button>
        </div>
      </CardContent>

      <IdentifyGuestDialog open={identifyOpen} onOpenChange={setIdentifyOpen} onIdentified={handleIdentified} />

      <ContributeDialog
        open={contributeOpen}
        onOpenChange={setContributeOpen}
        giftId={gift.id}
        giftName={gift.name}
        totals={totals}
        minInCents={gift.minInCents}
        myContributions={myContributions}
        pixConfigured={pixConfigured}
      />
    </Card>
  );
}
```

### `src/app/lista/[eventSlugToken]/gift-card-skeleton.tsx`

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Mesma estrutura do GiftCard: imagem quadrada, textos, preço e botão de largura total.
export function GiftCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-none" />
      <CardContent className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function GiftCardSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Carregando presentes...</span>
      {Array.from({ length: count }).map((_, i) => (
        <GiftCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

### `src/app/lista/[eventSlugToken]/gift-card.tsx`

```tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GiftAvailability } from "@/lib/gift-availability";
import {
  createReservationAction,
  confirmReservationMethodAction,
  cancelReservationAction,
} from "@/actions/reservation.actions";
import { PaymentPanel } from "./payment-panel";
import { IdentifyGuestDialog } from "./identify-guest-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { GiftImage } from "@/components/gift-image";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PaymentMethod = "EXTERNAL_PURCHASE" | "PIX";

interface MyReservation {
  id: string;
  status: "TEMPORARY" | "CONFIRMED" | "COMPLETED";
  paymentMethod: PaymentMethod | null;
  pixStatus: string;
  expiresAt: string;
}

interface GiftCardProps {
  gift: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    priceLabel: string;
  };
  availability: GiftAvailability;
  isIdentified: boolean;
  myReservation: MyReservation | null;
}

function useCountdown(expiresAt: string | undefined) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!expiresAt) {
      setLabel(null);
      return;
    }
    const target = new Date(expiresAt).getTime();

    function tick() {
      const diffMs = target - Date.now();
      if (diffMs <= 0) {
        setLabel("Expirando...");
        return;
      }
      const minutes = Math.floor(diffMs / 60_000);
      const seconds = Math.floor((diffMs % 60_000) / 1000);
      setLabel(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return label;
}

export function GiftCard({ gift, availability, isIdentified, myReservation }: GiftCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [identifyOpen, setIdentifyOpen] = useState(false);
  const countdown = useCountdown(myReservation?.status === "TEMPORARY" ? myReservation.expiresAt : undefined);

  const isSelectable = availability.status !== "UNAVAILABLE";
  const showSoldOut = !myReservation && !isSelectable;

  function doReserve() {
    startTransition(async () => {
      const result = await createReservationAction(gift.id);
      if (!result.success) {
        toast({ title: "Não foi possível reservar", description: result.error, variant: "destructive" });
        // Pode ter sido um conflito (outra pessoa pegou a última unidade): atualiza o card.
        router.refresh();
        return;
      }
      toast({
        title: "Presente reservado para você",
        description: "Agora escolha como vai presentear.",
      });
      router.refresh();
    });
  }

  function handleReserve() {
    if (!isIdentified) {
      setIdentifyOpen(true);
      return;
    }
    doReserve();
  }

  function handleIdentified() {
    setIdentifyOpen(false);
    doReserve();
  }

  function handleChooseMethod(method: PaymentMethod) {
    if (!myReservation) return;
    startTransition(async () => {
      const result = await confirmReservationMethodAction(myReservation.id, method);
      if (!result.success) {
        toast({ title: "Não foi possível continuar", description: result.error, variant: "destructive" });
        router.refresh();
        return;
      }
      router.refresh();
    });
  }

  function handleCancel() {
    setConfirmOpen(true);
  }

  function confirmCancel() {
    if (!myReservation) return;
    startTransition(async () => {
      const result = await cancelReservationAction(myReservation.id);
      setConfirmOpen(false);
      if (!result.success) {
        toast({ title: "Não foi possível desistir", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Reserva cancelada", description: "O presente voltou a ficar disponível." });
      router.refresh();
    });
  }

  const pixAlreadyDeclared =
    myReservation?.paymentMethod === "PIX" && myReservation.pixStatus === "DECLARED";

  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Quadrado em todas as telas (igual ao GiftCardSkeleton). "contain": a foto aparece inteira,
          sem recorte — o que sobra nas laterais fica em branco, como numa vitrine de produto. */}
      <div className="relative aspect-square w-full border-b border-border bg-white">
        <GiftImage
          src={gift.imageUrl}
          alt={gift.name}
          fill
          fit="contain"
          sizes="(min-width: 1024px) 285px, (min-width: 768px) 33vw, 50vw"
          className={cn(showSoldOut && "opacity-50 grayscale")}
        />
        {showSoldOut && (
          <span className="absolute left-2 top-2 rounded-full bg-foreground/80 px-2.5 py-1 text-[11px] font-medium text-background shadow-sm">
            Já escolhido
          </span>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="min-w-0">
          <h3 className="line-clamp-2 break-words font-serif text-base leading-snug text-foreground sm:text-lg">
            {gift.name}
          </h3>
          {gift.description && (
            <p className="mt-1 line-clamp-2 break-words text-xs text-muted-foreground sm:text-sm">
              {gift.description}
            </p>
          )}
        </div>

        {/* Preço + botão sempre empilhados e alinhados na base: todos os cards ficam iguais. */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <span className="text-base font-semibold text-foreground">{gift.priceLabel}</span>

          {myReservation ? null : !isSelectable ? (
            <Button size="sm" variant="outline" disabled className="w-full">
              Indisponível
            </Button>
          ) : (
            <Button size="sm" onClick={handleReserve} disabled={isPending} className="w-full">
              {isPending ? "Reservando..." : "Quero presentear"}
            </Button>
          )}

          {myReservation?.status === "TEMPORARY" && (
            <div className="rounded-md border border-secondary/40 bg-secondary/10 p-3">
              <p className="text-xs font-medium text-foreground">
                Reservado para você — expira em {countdown}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Como você vai presentear?</p>
              <div className="mt-2 flex flex-col gap-2">
                <Button size="sm" variant="outline" disabled={isPending} onClick={() => handleChooseMethod("EXTERNAL_PURCHASE")} className="w-full">
                  Comprar em loja
                </Button>
                <Button size="sm" disabled={isPending} onClick={() => handleChooseMethod("PIX")} className="w-full">
                  Pagar via Pix
                </Button>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="mt-2 text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Desistir deste presente
              </button>
            </div>
          )}

          {myReservation &&
            myReservation.paymentMethod &&
            (myReservation.status === "CONFIRMED" || myReservation.status === "COMPLETED") && (
              <PaymentPanel
                reservationId={myReservation.id}
                paymentMethod={myReservation.paymentMethod}
                status={myReservation.status}
                pixStatus={myReservation.pixStatus}
                onCancel={handleCancel}
                isCancelPending={isPending}
              />
            )}

        </div>
      </CardContent>

      <IdentifyGuestDialog
        open={identifyOpen}
        onOpenChange={setIdentifyOpen}
        onIdentified={handleIdentified}
      />

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Desistir deste presente?"
        description={
          pixAlreadyDeclared ? (
            <>
              A unidade voltará a ficar disponível para outros convidados.{" "}
              <strong className="text-foreground">
                Atenção: isso não gera estorno automático do Pix já enviado
              </strong>{" "}
              — se você já pagou, fale diretamente com o anfitrião.
            </>
          ) : (
            "A unidade voltará a ficar disponível para outros convidados."
          )
        }
        confirmLabel="Sim, desistir"
        cancelLabel="Manter presente"
        isPending={isPending}
        onConfirm={confirmCancel}
      />
    </Card>
  );
}
```

### `src/app/lista/[eventSlugToken]/gift-filters.tsx`

```tsx
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search } from "lucide-react";
import { parseGiftQuery, parseGiftSort, SORT_OPTIONS } from "./gift-sort";

export function GiftFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // A URL é a fonte da verdade; o input só guarda o texto enquanto a pessoa digita.
  const urlQuery = parseGiftQuery(searchParams.get("q") ?? undefined);
  const urlSort = parseGiftSort(searchParams.get("sort") ?? undefined);

  const [query, setQuery] = useState(urlQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);

  // O timeout do debounce roda depois do render que o criou: sem este ref ele
  // mesclaria a busca com um `sort` antigo e desfaria uma troca de ordenação.
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  // Voltar/avançar no navegador muda a URL sem passar pelo input. Com o input em
  // foco a pessoa está digitando e a URL que chega pode ser de um instante atrás
  // (ex.: "ab" chegando quando já digitou "abc"), então não sobrescrevemos.
  useEffect(() => {
    if (document.activeElement === inputRef.current) return;
    setQuery(urlQuery);
  }, [urlQuery]);

  function updateParams(next: { q?: string; sort?: string }) {
    const params = new URLSearchParams(searchParamsRef.current.toString());

    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ q: value.trim() }), 300);
  }

  function handleSortChange(value: string) {
    // Uma busca ainda no debounce entra junto, em vez de ser descartada.
    if (debounceRef.current) clearTimeout(debounceRef.current);
    updateParams({ q: query.trim(), sort: value });
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    // Fixa no topo em telas médias+ (uma linha só): a busca continua à mão ao rolar listas longas.
    // No celular fica solta, porque empilhada ocuparia ~110px da tela inteira.
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center md:sticky md:top-0 md:z-20 md:-mx-6 md:bg-background md:px-6 md:py-3 lg:-mx-8 lg:px-8">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Buscar presente..."
          className="pl-9"
          aria-label="Buscar presente"
          maxLength={80}
        />
      </div>

      <Select
        value={urlSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="sm:w-56"
        aria-label="Ordenar por"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <span className="sr-only" role="status" aria-live="polite">
        {isPending ? "Atualizando lista..." : ""}
      </span>
    </div>
  );
}
```

### `src/app/lista/[eventSlugToken]/gift-sort.ts`

```typescript
export const SORT_OPTIONS = [
  { value: "", label: "Recomendados" },
  { value: "available_first", label: "Disponíveis primeiro" },
  { value: "price_asc", label: "Menor preço" },
  { value: "price_desc", label: "Maior preço" },
] as const;

export type GiftSort = (typeof SORT_OPTIONS)[number]["value"];

const MAX_QUERY_LENGTH = 80;

type RawParam = string | string[] | undefined;

function firstValue(value: RawParam): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

/** searchParams vem da URL: pode ser array (?q=a&q=b) ou lixo — nunca confie no tipo. */
export function parseGiftQuery(value: RawParam): string {
  return firstValue(value).trim().slice(0, MAX_QUERY_LENGTH);
}

export function parseGiftSort(value: RawParam): GiftSort {
  const sort = firstValue(value);
  return SORT_OPTIONS.some((option) => option.value === sort) ? (sort as GiftSort) : "";
}
```

### `src/app/lista/[eventSlugToken]/gifts-section.tsx`

```tsx
import { prisma } from "@/lib/prisma";
import { computeGiftAvailability, ACTIVE_RESERVATION_STATUSES } from "@/lib/gift-availability";
import { formatCentsToBRL } from "@/lib/utils";
import type { FundTotals } from "@/lib/fund";
import { GiftCard } from "./gift-card";
import { FundCard } from "./fund-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift as GiftIcon, SearchX } from "lucide-react";
import type { Gift } from "@prisma/client";
import type { Guest } from "@prisma/client";

interface GiftsSectionProps {
  gifts: Gift[];
  guest: Guest | null;
  isIdentified: boolean;
  query: string;
  sort: string;
  /** URL da própria lista, sem parâmetros — destino do "Limpar busca". */
  clearHref: string;
  /** O anfitrião cadastrou a chave Pix? Sem ela ninguém consegue contribuir com uma vaquinha. */
  pixConfigured: boolean;
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export async function GiftsSection({
  gifts,
  guest,
  isIdentified,
  query,
  sort,
  clearHref,
  pixConfigured,
}: GiftsSectionProps) {
  const giftIds = gifts.map((gift) => gift.id);

  // Antes de calcular disponibilidade, trata reservas temporárias vencidas (seção 33).
  if (giftIds.length) {
    await prisma.giftReservation.updateMany({
      where: { giftId: { in: giftIds }, status: "TEMPORARY", expiresAt: { lt: new Date() } },
      data: { status: "EXPIRED" },
    });
  }

  const activeCounts = giftIds.length
    ? await prisma.giftReservation.groupBy({
        by: ["giftId"],
        where: { giftId: { in: giftIds }, status: { in: [...ACTIVE_RESERVATION_STATUSES] } },
        _count: { _all: true },
      })
    : [];
  const activeCountByGiftId = new Map(activeCounts.map((row) => [row.giftId, row._count._all]));

  const myReservations =
    guest && giftIds.length
      ? await prisma.giftReservation.findMany({
          where: {
            guestId: guest.id,
            giftId: { in: giftIds },
            status: { in: ["TEMPORARY", "CONFIRMED", "COMPLETED"] },
          },
        })
      : [];
  const myReservationByGiftId = new Map(myReservations.map((r) => [r.giftId, r]));

  // Vaquinhas: total confirmado x aguardando por vaquinha, e o que ESTE convidado já contribuiu.
  const fundIds = gifts.filter((gift) => gift.kind === "FUND").map((gift) => gift.id);
  const activeContributionStatuses = ["DECLARED", "CONFIRMED"] as const;

  const contributionSums = fundIds.length
    ? await prisma.contribution.groupBy({
        by: ["giftId", "status"],
        where: { giftId: { in: fundIds }, status: { in: [...activeContributionStatuses] } },
        _sum: { amountInCents: true },
        _count: { _all: true },
      })
    : [];

  const fundTotalsByGiftId = new Map<string, FundTotals>();
  for (const gift of gifts) {
    if (gift.kind !== "FUND") continue;
    const rows = contributionSums.filter((row) => row.giftId === gift.id);
    const confirmed = rows.find((row) => row.status === "CONFIRMED");
    const declared = rows.find((row) => row.status === "DECLARED");
    fundTotalsByGiftId.set(gift.id, {
      goalInCents: gift.priceInCents,
      confirmedInCents: confirmed?._sum.amountInCents ?? 0,
      pendingInCents: declared?._sum.amountInCents ?? 0,
      contributionsCount: (confirmed?._count._all ?? 0) + (declared?._count._all ?? 0),
    });
  }

  const myContributionRows =
    guest && fundIds.length
      ? await prisma.contribution.findMany({
          where: {
            guestId: guest.id,
            giftId: { in: fundIds },
            status: { in: [...activeContributionStatuses] },
          },
          orderBy: { declaredAt: "desc" },
        })
      : [];

  const withAvailability = gifts.map((gift) => ({
    gift,
    availability: computeGiftAvailability(gift.quantity, activeCountByGiftId.get(gift.id) ?? 0),
  }));

  const normalizedQuery = normalize(query.trim());
  const filtered = normalizedQuery
    ? withAvailability.filter(
        ({ gift }) =>
          normalize(gift.name).includes(normalizedQuery) ||
          (gift.description && normalize(gift.description).includes(normalizedQuery))
      )
    : withAvailability;

  // Em vaquinha o valor que o convidado de fato paga é o mínimo, não a meta.
  const effectivePrice = (gift: Gift) =>
    gift.kind === "FUND" ? (gift.minContributionInCents ?? gift.priceInCents) : gift.priceInCents;

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return effectivePrice(a.gift) - effectivePrice(b.gift);
      case "price_desc":
        return effectivePrice(b.gift) - effectivePrice(a.gift);
      case "available_first": {
        const aAvailable = a.availability.status !== "UNAVAILABLE" ? 0 : 1;
        const bAvailable = b.availability.status !== "UNAVAILABLE" ? 0 : 1;
        return aAvailable - bAvailable;
      }
      default:
        return 0; // mantém a ordem original (recomendados = ordem de cadastro)
    }
  });

  if (gifts.length === 0) {
    return (
      <EmptyState
        icon={GiftIcon}
        title="Esta lista ainda não tem presentes"
        description="O anfitrião ainda não cadastrou nenhum presente. Volte em breve!"
      />
    );
  }

  if (sorted.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Nenhum presente encontrado"
        description={
          query
            ? `Não achamos nada para “${query}”. Tente buscar por outro nome.`
            : "Tente buscar por outro nome."
        }
        action={
          <Button variant="outline" size="sm" asChild>
            <Link href={clearHref} replace scroll={false}>
              Limpar busca
            </Link>
          </Button>
        }
      />
    );
  }

  return (
    <>
      {query && (
        <p role="status" className="mb-4 text-sm text-muted-foreground">
          {sorted.length === 1 ? "1 presente encontrado" : `${sorted.length} presentes encontrados`}{" "}
          para “{query}”
        </p>
      )}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map(({ gift, availability }) => {
          if (gift.kind === "FUND") {
            return (
              <FundCard
                key={gift.id}
                gift={{
                  id: gift.id,
                  name: gift.name,
                  description: gift.description,
                  imageUrl: gift.imageUrl,
                  minInCents: gift.minContributionInCents ?? 1,
                }}
                totals={fundTotalsByGiftId.get(gift.id)!}
                myContributions={myContributionRows
                  .filter((row) => row.giftId === gift.id)
                  .map((row) => ({
                    id: row.id,
                    amountInCents: row.amountInCents,
                    status: row.status as "DECLARED" | "CONFIRMED",
                  }))}
                isIdentified={isIdentified}
                pixConfigured={pixConfigured}
              />
            );
          }

          const mine = myReservationByGiftId.get(gift.id);
          return (
            <GiftCard
              key={gift.id}
              gift={{
                id: gift.id,
                name: gift.name,
                description: gift.description,
                imageUrl: gift.imageUrl,
                priceLabel: formatCentsToBRL(gift.priceInCents),
              }}
              availability={availability}
              isIdentified={isIdentified}
              myReservation={
                mine
                  ? {
                      id: mine.id,
                      status: mine.status as "TEMPORARY" | "CONFIRMED" | "COMPLETED",
                      paymentMethod: mine.paymentMethod,
                      pixStatus: mine.pixStatus,
                      expiresAt: mine.expiresAt.toISOString(),
                    }
                  : null
              }
            />
          );
        })}
      </div>
    </>
  );
}
```

### `src/app/lista/[eventSlugToken]/header-publico.tsx`

```tsx
import { CalendarDays, MapPin, PackageOpen } from "lucide-react";
import { GiftImage } from "@/components/gift-image";
import { FormattedText } from "@/components/formatted-text";
import { ExpandableText } from "@/components/ui/expandable-text";
import { SharePublicListButton } from "./share-public-list-button";

const eventTypeLabel: Record<string, string> = {
  CHA_PANELA: "Chá de Panela",
  CHA_CASA_NOVA: "Chá de Casa Nova",
};

// Acima disso o recado vira "Ler tudo": evita empurrar os presentes para baixo da primeira tela.
const LONG_DESCRIPTION_CHARS = 280;

interface HeaderPublicoProps {
  title: string;
  type: string;
  coverImageUrl: string | null;
  profileImageUrl: string | null;
  eventDateLabel: string | null;
  locationName: string | null;
  locationAddress: string | null;
  locationMapsUrl: string | null;
  description: string | null;
  deliveryAddress: string | null;
  publicUrl: string;
}

export function HeaderPublico({
  title,
  type,
  coverImageUrl,
  profileImageUrl,
  eventDateLabel,
  locationName,
  locationAddress,
  locationMapsUrl,
  description,
  deliveryAddress,
  publicUrl,
}: HeaderPublicoProps) {
  return (
    <header>
      {/* Capa: largura total no celular; em telas grandes fica contida (1200px) com cantos arredondados. */}
      <div className="mx-auto w-full max-w-[1200px] sm:px-6 sm:pt-6 lg:px-8">
        {/* Este wrapper NÃO corta conteúdo: o avatar precisa vazar para fora da capa. */}
        <div className="relative">
          <div className="relative aspect-[2/1] max-h-[420px] w-full overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/25 sm:aspect-[3/1] sm:rounded-3xl">
            {coverImageUrl && (
              <GiftImage src={coverImageUrl} alt="" fill priority sizes="(min-width: 1200px) 1152px, 100vw" />
            )}
          </div>

          {/* Compartilhar no canto superior direito: fica à vista logo ao abrir e é onde o hábito manda procurar. */}
          <SharePublicListButton
            url={publicUrl}
            title={title}
            className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4"
          />

          {/* Avatar: centralizado na borda inferior da capa — metade sobre a capa, metade no corpo.
              z-10 é obrigatório: a capa é `relative` e, sem isso, seria pintada por cima do avatar. */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 justify-center">
            <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-card shadow-md ring-4 ring-background sm:h-36 sm:w-36">
              <GiftImage src={profileImageUrl} alt={title} width={144} height={144} />
            </div>
          </div>
        </div>
      </div>

      {/* Espaço = metade do avatar (56px / 72px) + respiro. */}
      <div className="container flex flex-col items-center gap-5 pb-10 pt-[4.5rem] text-center sm:pt-24">
        <div className="flex flex-col items-center gap-3">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {eventTypeLabel[type] ?? type}
          </span>
          <h1 className="max-w-2xl text-balance font-serif text-3xl font-medium leading-tight text-foreground sm:text-4xl">
            {title}
          </h1>
        </div>

        {(eventDateLabel || locationName) && (
          <ul className="flex flex-col items-center gap-2 text-sm text-foreground">
            {eventDateLabel && (
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                <span>{eventDateLabel}</span>
              </li>
            )}
            {locationName && (
              <li className="flex flex-col items-center gap-0.5">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                  {locationMapsUrl ? (
                    <a
                      href={locationMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                      {locationName}
                      <span className="sr-only"> (abre o mapa em nova aba)</span>
                    </a>
                  ) : (
                    <span className="font-medium">{locationName}</span>
                  )}
                </span>
                {locationAddress && (
                  <span className="max-w-md text-xs text-muted-foreground">{locationAddress}</span>
                )}
              </li>
            )}
          </ul>
        )}

        {description && (
          <section
            aria-labelledby="recado-titulo"
            className="w-full max-w-2xl rounded-2xl border border-border bg-card p-5 text-left sm:p-6"
          >
            <h2 id="recado-titulo" className="mb-3 font-serif text-lg font-medium text-foreground">
              Sobre esta lista
            </h2>
            <ExpandableText
              isLong={description.length > LONG_DESCRIPTION_CHARS}
              className="text-sm leading-relaxed text-foreground/90 sm:text-base"
            >
              <FormattedText text={description} />
            </ExpandableText>
          </section>
        )}

        {deliveryAddress && (
          <aside className="flex w-full max-w-2xl items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4 text-left">
            <PackageOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-foreground">Prefere enviar o presente?</p>
              <p className="mt-0.5 whitespace-pre-line text-sm text-muted-foreground">
                <FormattedText text={deliveryAddress} />
              </p>
            </div>
          </aside>
        )}
      </div>
    </header>
  );
}
```

### `src/app/lista/[eventSlugToken]/identify-guest-dialog.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { identifyGuestAction } from "@/actions/guest.actions";

interface IdentifyGuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIdentified: () => void;
}

export function IdentifyGuestDialog({ open, onOpenChange, onIdentified }: IdentifyGuestDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await identifyGuestAction(formData);
      if (!result.success) {
        setError(result.error);
        return;
      }
      onIdentified();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como podemos te chamar?</DialogTitle>
        </DialogHeader>
        <p className="mb-4 text-sm text-muted-foreground">
          Só pedimos seu nome, e-mail e telefone para você conseguir acompanhar ou alterar sua
          escolha depois. Nada de senha.
        </p>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guest-name">Nome</Label>
            <Input id="guest-name" name="name" autoComplete="name" placeholder="Seu nome" required minLength={2} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guest-email">E-mail</Label>
            <Input id="guest-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="voce@email.com" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="guest-phone">Telefone (com DDD)</Label>
            <Input id="guest-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(85) 91234-5678" required />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" disabled={isPending} className="mt-1">
            {isPending ? "Confirmando..." : "Continuar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### `src/app/lista/[eventSlugToken]/loading.tsx`

```tsx
import { Skeleton } from "@/components/ui/skeleton";
import { GiftCardSkeletonList } from "./gift-card-skeleton";

// Espelha o HeaderPublico: capa, avatar sobreposto (metade/metade), título e a grade.
export default function Loading() {
  return (
    <main className="min-h-screen" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando a lista de presentes...</span>

      <div className="mx-auto w-full max-w-[1200px] sm:px-6 sm:pt-6 lg:px-8">
        <div className="relative">
          <Skeleton className="aspect-[2/1] max-h-[420px] w-full rounded-none sm:aspect-[3/1] sm:rounded-3xl" />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-1/2 justify-center">
            <Skeleton className="h-28 w-28 rounded-full ring-4 ring-background sm:h-36 sm:w-36" />
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center gap-4 pb-10 pt-[4.5rem] sm:pt-24">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-4 w-56 max-w-full" />
        <Skeleton className="h-9 w-32" />
      </div>

      <section className="border-t border-border">
        <div className="container pb-16 pt-8 sm:pt-12">
          <Skeleton className="mb-5 h-8 w-52" />
          <Skeleton className="mb-5 h-11 w-full" />
          <GiftCardSkeletonList />
        </div>
      </section>
    </main>
  );
}
```

### `src/app/lista/[eventSlugToken]/not-found.tsx`

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-serif text-3xl font-medium text-foreground">Lista não encontrada</h1>
      <p className="max-w-sm text-muted-foreground">
        Esse link pode estar incorreto ou a lista ainda não foi publicada pelo anfitrião.
        Confira o link recebido e tente novamente.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </main>
  );
}
```

### `src/app/lista/[eventSlugToken]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";

import { getCurrentGuest } from "@/lib/guest-session";
import { prisma } from "@/lib/prisma";
import { parseEventSlugToken } from "@/lib/slug";
import { SwitchGuestButton } from "./switch-guest-button";
import { HeaderPublico } from "./header-publico";
import { GiftFilters } from "./gift-filters";
import { GiftsSection } from "./gifts-section";
import { GiftCardSkeletonList } from "./gift-card-skeleton";
import { parseGiftQuery, parseGiftSort } from "./gift-sort";

interface PageProps {
  params: { eventSlugToken: string };
  searchParams: { q?: string | string[]; sort?: string | string[] };
}

async function getPublicEvent(eventSlugToken: string) {
  const parsed = parseEventSlugToken(eventSlugToken);
  if (!parsed) return null;

  const event = await prisma.event.findUnique({
    where: { slug: parsed.slug },
    include: { gifts: { orderBy: { createdAt: "asc" } } },
  });

  // Slug e secureToken precisam bater os dois — isso dificulta enumeração por slug.
  if (!event || event.secureToken !== parsed.secureToken) return null;
  if (!event.published) return null;

  return event;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await getPublicEvent(params.eventSlugToken);
  if (!event) return {};

  return {
    title: `Lista de presentes — ${event.title}`,
    description: event.description ?? "Confira a lista de presentes e escolha o seu.",
    // A lista é privada por link: gera prévia bonita no WhatsApp, mas não é indexada.
    robots: { index: false, follow: false },
    openGraph: {
      title: `Lista de presentes — ${event.title}`,
      description: event.description ?? undefined,
      images: event.coverImageUrl ? [event.coverImageUrl] : undefined,
    },
  };
}

export default async function PublicEventPage({ params, searchParams }: PageProps) {
  const event = await getPublicEvent(params.eventSlugToken);
  if (!event) notFound();

  const guest = await getCurrentGuest();
  const isIdentified = Boolean(guest);

  const eventDateLabel = event.eventDate
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(
        new Date(event.eventDate)
      )
    : null;

  const hasExternalPurchaseGift = event.gifts.some((gift) => Boolean(gift.purchaseUrl));
  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/lista/${params.eventSlugToken}`;
  const themeAttribute = event.theme === "TERRACOTA" ? "terracota" : "salvia";

  const query = parseGiftQuery(searchParams.q);
  const sort = parseGiftSort(searchParams.sort);
  // Uma combinação de filtros por requisição basta para dar ao React um key
  // novo e reiniciar o Suspense (mostrando o skeleton) a cada busca/ordenação.
  const suspenseKey = `${query}:${sort}`;

  return (
    <main className="min-h-screen" data-theme={themeAttribute}>
      <HeaderPublico
        title={event.title}
        type={event.type}
        coverImageUrl={event.coverImageUrl}
        profileImageUrl={event.profileImageUrl}
        eventDateLabel={eventDateLabel}
        locationName={event.locationName}
        locationAddress={event.locationAddress}
        locationMapsUrl={event.locationMapsUrl}
        description={event.description}
        deliveryAddress={event.deliveryAddress}
        publicUrl={publicUrl}
      />

      {guest && (
        <div className="border-b border-border bg-card">
          <div className="container flex items-center justify-between py-2 text-xs text-muted-foreground">
            <span>
              Identificado(a) como <strong className="text-foreground">{guest.name}</strong>
            </span>
            <SwitchGuestButton />
          </div>
        </div>
      )}

      {/* Lista de presentes */}
      <section className="border-t border-border">
        <div className="container pb-16 pt-8 sm:pt-12">
          <div className="mb-5 flex flex-col gap-1">
            <h2 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
              Lista de presentes
            </h2>
            {hasExternalPurchaseGift && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                Ao escolher comprar em loja, você será redirecionado para o site do vendedor — a
                compra não é feita por aqui.
              </p>
            )}
          </div>

          {event.gifts.length > 0 && (
            // useSearchParams exige um Suspense próprio, separado do da listagem.
            <Suspense fallback={<div className="mb-6 h-11" aria-hidden="true" />}>
              <GiftFilters />
            </Suspense>
          )}

          <Suspense key={suspenseKey} fallback={<GiftCardSkeletonList />}>
            <GiftsSection
              gifts={event.gifts}
              guest={guest}
              isIdentified={isIdentified}
              query={query}
              sort={sort}
              clearHref={`/lista/${params.eventSlugToken}`}
              pixConfigured={Boolean(event.pixKey && event.pixKeyType)}
            />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
```

### `src/app/lista/[eventSlugToken]/payment-panel.tsx`

```tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getPaymentDetailsAction,
  confirmExternalPurchaseAction,
  declarePixPaymentAction,
  type PaymentDetails,
} from "@/actions/payment.actions";
import { toast } from "@/hooks/use-toast";
import { Copy, Check, ExternalLink, ImageOff } from "lucide-react";

const pixKeyTypeLabel: Record<string, string> = {
  CPF: "CPF",
  CNPJ: "CNPJ",
  EMAIL: "E-mail",
  TELEFONE: "Telefone",
  ALEATORIA: "Chave aleatória",
};

interface PaymentPanelProps {
  reservationId: string;
  paymentMethod: "EXTERNAL_PURCHASE" | "PIX";
  status: "CONFIRMED" | "COMPLETED";
  pixStatus: string;
  onCancel: () => void;
  isCancelPending: boolean;
}

export function PaymentPanel({
  reservationId,
  paymentMethod,
  status,
  pixStatus,
  onCancel,
  isCancelPending,
}: PaymentPanelProps) {
  const router = useRouter();
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState<"key" | "code" | null>(null);
  const [qrFailed, setQrFailed] = useState(false);

  useEffect(() => {
    let active = true;
    getPaymentDetailsAction(reservationId).then((result) => {
      if (!active) return;
      if (result.success) setDetails(result.details);
      else setError(result.error);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [reservationId]);

  async function copy(text: string, which: "key" | "code") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Sem permissão ou contexto não seguro (http): o usuário ainda pode selecionar o texto na tela.
      toast({
        title: "Não foi possível copiar",
        description: "Selecione o texto e copie manualmente.",
        variant: "destructive",
      });
      return;
    }
    setCopied(which);
    toast({ title: which === "key" ? "Chave Pix copiada" : "Código Pix copiado" });
    setTimeout(() => setCopied(null), 2000);
  }

  function handleConfirmPurchase() {
    startTransition(async () => {
      const result = await confirmExternalPurchaseAction(reservationId);
      if (!result.success) {
        toast({ title: "Não foi possível confirmar a compra", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Compra confirmada", description: "Obrigado pelo presente!" });
      router.refresh();
    });
  }

  function handleDeclarePix() {
    startTransition(async () => {
      const result = await declarePixPaymentAction(reservationId);
      if (!result.success) {
        toast({ title: "Não foi possível informar o Pix", description: result.error, variant: "destructive" });
        return;
      }
      toast({ title: "Pix informado", description: "Aguardando a confirmação do anfitrião." });
      router.refresh();
    });
  }

  if (loading) {
    return (
      <div className="rounded-md border border-border bg-muted/30 p-3">
        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  // Estados finais
  if (status === "COMPLETED" && paymentMethod === "EXTERNAL_PURCHASE") {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
        <p className="text-xs font-medium text-primary">Compra confirmada. Obrigado!</p>
      </div>
    );
  }

  if (pixStatus === "CONFIRMED") {
    return (
      <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
        <p className="text-xs font-medium text-primary">
          Pix confirmado pelo anfitrião. Obrigado!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
      {/* Só erro de carregamento dos dados do pagamento; falhas de ação viram toast. */}
      {error && <p role="alert" className="mb-2 text-xs text-destructive">{error}</p>}

      {details?.kind === "EXTERNAL_PURCHASE" && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-foreground">Você escolheu comprar em uma loja</p>
          {details.purchaseUrl ? (
            <Button size="sm" variant="outline" asChild>
              <a href={details.purchaseUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Comprar presente
              </a>
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              O anfitrião não cadastrou um link de loja para este presente.
            </p>
          )}
          <Button size="sm" onClick={handleConfirmPurchase} disabled={isPending}>
            {isPending ? "Confirmando..." : "Já comprei este presente"}
          </Button>
        </div>
      )}

      {details?.kind === "PIX" && (
        <div className="flex flex-col gap-2.5">
          {pixStatus === "DECLARED" ? (
            <p className="text-xs font-medium text-secondary-strong">
              Pix informado — aguardando a confirmação do anfitrião.
            </p>
          ) : (
            <>
              <div>
                <p className="text-xs text-muted-foreground">Valor a pagar</p>
                <p className="font-medium text-foreground">{details.amountLabel}</p>
              </div>

              {details.qrCodeDataUrl && !qrFailed && (
                <div className="mx-auto rounded-md bg-white p-2">
                  <Image
                    src={details.qrCodeDataUrl}
                    alt="QR Code Pix"
                    width={160}
                    height={160}
                    unoptimized
                    onError={() => setQrFailed(true)}
                  />
                </div>
              )}
              {qrFailed && (
                <div
                  role="img"
                  aria-label="QR Code indisponível"
                  className="mx-auto flex h-[176px] w-[176px] flex-col items-center justify-center gap-1 rounded-md bg-neutral-200 p-3 text-center text-neutral-500"
                >
                  <ImageOff className="h-5 w-5" aria-hidden="true" />
                  <span className="text-[11px]">QR Code indisponível — use a chave ou o copia e cola.</span>
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground">
                  {pixKeyTypeLabel[details.pixKeyType] ?? details.pixKeyType} de {details.hostName}
                </p>
                <p className="break-all text-xs font-medium text-foreground">{details.pixKey}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => copy(details.pixKey, "key")}>
                  {copied === "key" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                  {copied === "key" ? "Copiada" : "Copiar chave"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => copy(details.copyPasteCode, "code")}>
                  {copied === "code" ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
                  {copied === "code" ? "Copiado" : "Copia e cola"}
                </Button>
              </div>

              <Button size="sm" onClick={handleDeclarePix} disabled={isPending}>
                {isPending ? "Enviando..." : "Já fiz o Pix"}
              </Button>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onCancel}
        disabled={isCancelPending}
        className="mt-2 text-xs text-muted-foreground underline-offset-4 hover:underline"
      >
        Desistir deste presente
      </button>
    </div>
  );
}
```

### `src/app/lista/[eventSlugToken]/share-public-list-button.tsx`

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SharePublicListButton({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Usuário cancelou o compartilhamento nativo — sem problema, sem toast de erro.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copiado!", description: "Agora é só colar e enviar." });
    } catch {
      toast({
        title: "Não foi possível copiar",
        description: "Copie o link manualmente da barra de endereço.",
        variant: "destructive",
      });
    }
  }

  return (
    // Botão redondo sobre a capa: só o ícone no celular (alvo de 44px), com texto a partir de sm.
    <Button
      variant="outline"
      onClick={handleShare}
      aria-label="Compartilhar lista"
      className={cn(
        "h-11 w-11 gap-1.5 rounded-full border-transparent bg-card/95 p-0 shadow-md hover:bg-card sm:h-10 sm:w-auto sm:px-4",
        className
      )}
    >
      <Share2 className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Compartilhar</span>
    </Button>
  );
}
```

### `src/app/lista/[eventSlugToken]/switch-guest-button.tsx`

```tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { forgetGuestAction } from "@/actions/guest.actions";

export function SwitchGuestButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await forgetGuestAction();
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="underline-offset-4 hover:underline"
    >
      Não é você? Trocar
    </button>
  );
}
```

### `src/app/login/login-form.tsx`

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("E-mail ou senha incorretos.");
        return;
      }

      router.push(callbackUrl);
    });
  }

  const justSignedUp = searchParams.get("cadastro") === "sucesso";

  return (
    <div className="flex flex-col gap-5">
      {justSignedUp && (
        <p
          role="status"
          className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm text-foreground"
        >
          Conta criada! Entre com seu e-mail e senha para continuar.
        </p>
      )}
      <form action={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="voce@email.com"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Senha</Label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
            required
          />
        </div>

        {error && (
          <p id="login-error" role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <Button type="submit" disabled={isPending} className="mt-1">
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        ou
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl })}
      >
        Entrar com Google
      </Button>
    </div>
  );
}
```

### `src/app/login/page.tsx`

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle as="h1">Entrar</CardTitle>
          <CardDescription>Acesse sua conta para gerenciar sua lista.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <LoginForm />
          </Suspense>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link href="/cadastro" className="font-medium text-primary underline-offset-4 hover:underline">
              Criar conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
```

### `src/app/page.tsx`

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const passos = [
  {
    numero: "01",
    titulo: "Monte sua lista",
    texto: "Escolha o tipo de chá, conte um pouco sobre a ocasião e adicione os presentes que combinam com a sua nova casa.",
  },
  {
    numero: "02",
    titulo: "Compartilhe o link",
    texto: "Envie o link pelo WhatsApp. Cada convidado abre a lista, vê o que já foi escolhido e o que ainda está disponível.",
  },
  {
    numero: "03",
    titulo: "Acompanhe em tempo real",
    texto: "Veja quem já garantiu um presente, quem pagou via Pix e confirme o recebimento direto pelo seu painel.",
  },
];

export default function LandingPage() {
  return (
    <>
      <header className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <span className="font-serif text-lg font-medium text-foreground">Presenteie</span>
          <nav aria-label="Acesso" className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/cadastro">Criar lista</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main>
        {/* Hero */}
        <section className="border-b border-border">
          <div className="container flex min-h-[80vh] flex-col justify-center gap-8 py-16 sm:py-20">
            <span className="text-sm font-medium text-secondary-strong">
              Chá de panela · Chá de casa nova
            </span>
            <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Uma lista de presentes que parece feita à mão.
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Crie sua lista, compartilhe com quem você ama e acompanhe cada
              presente escolhido — sem planilhas, sem confusão, sem repetir o
              jogo de panelas três vezes.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <Button size="lg" asChild>
                <Link href="/cadastro">Criar minha lista</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Já tenho uma conta</Link>
              </Button>
            </div>
          </div>
        </section>
  
        {/* Como funciona */}
        <section className="container py-24">
          <h2 className="mb-12 max-w-lg font-serif text-3xl font-medium text-foreground">
            Como funciona
          </h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {passos.map((passo) => (
              <div key={passo.numero} className="border-l-2 border-secondary/60 pl-5">
                <span className="font-serif text-3xl text-secondary-strong">{passo.numero}</span>
                <h3 className="mt-3 text-lg font-medium text-foreground">{passo.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{passo.texto}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Exemplo de lista */}
        <section className="border-y border-border bg-muted/40">
          <div className="container py-24">
            <h2 className="mb-10 max-w-lg font-serif text-3xl font-medium text-foreground">
              O que seus convidados veem
            </h2>
            {/* Ilustração: não é interativa, então some para leitores de tela e do foco do teclado. */}
            <Card className="max-w-sm" aria-hidden="true">
              <div className="h-40 rounded-t-lg bg-gradient-to-br from-primary/20 to-secondary/30" />
              <CardContent className="pt-5">
                <p className="font-serif text-lg text-foreground">Jogo de Panelas</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Conjunto para a nossa nova cozinha.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-medium text-foreground">R$ 450,00</span>
                  <Button size="sm" tabIndex={-1}>
                    Quero presentear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
  
        {/* CTA final */}
        <section className="container py-24 text-center">
          <h2 className="mx-auto max-w-xl font-serif text-3xl font-medium text-foreground">
            Sua lista fica pronta em poucos minutos.
          </h2>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/cadastro">Criar minha lista</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
```

### `src/app/robots.ts`

```typescript
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // As listas são privadas por link — não devem ser indexadas nem enumeradas.
      disallow: ["/dashboard", "/lista"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

### `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  // Só páginas institucionais: listas de presentes são privadas por link.
  return [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/cadastro`, lastModified: new Date(), priority: 0.5 },
    { url: `${siteUrl}/login`, lastModified: new Date(), priority: 0.3 },
  ];
}
```

### `src/components/formatted-text.tsx`

```tsx
import * as React from "react";

/**
 * Texto escrito pelo anfitrião: preserva quebras de linha e transforma **negrito**
 * em <strong>. Sem dangerouslySetInnerHTML — só monta elementos React, então
 * qualquer HTML digitado continua aparecendo como texto puro.
 */
export function FormattedText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/gs);

  return (
    <>
      {parts.map((part, index) =>
        // O split com grupo de captura devolve os trechos em negrito nos índices ímpares.
        index % 2 === 1 ? <strong key={index}>{part}</strong> : <React.Fragment key={index}>{part}</React.Fragment>
      )}
    </>
  );
}
```

### `src/components/fund-progress.tsx`

```tsx
import { cn, formatCentsToBRL } from "@/lib/utils";
import { computeFundProgress, type FundTotals } from "@/lib/fund";

interface FundProgressProps extends FundTotals {
  /** "sm": card da lista. "lg": diálogo do convidado e painel do anfitrião (com marcos e legenda). */
  size?: "sm" | "lg";
  /** Só o anfitrião vê a legenda dos dois tons; o convidado a vê quando há algo aguardando. */
  className?: string;
}

// Trecho "aguardando confirmação": listrado, para nunca ser confundido com dinheiro já confirmado.
const PENDING_STRIPES =
  "repeating-linear-gradient(45deg, hsl(var(--primary) / 0.55) 0 6px, hsl(var(--primary) / 0.28) 6px 12px)";

export function FundProgress({ size = "sm", className, ...totals }: FundProgressProps) {
  const progress = computeFundProgress(totals);
  const isLarge = size === "lg";
  const {
    raisedInCents,
    goalInCents,
    percent,
    reached,
    overflowInCents,
    remainingInCents,
    confirmedBarPercent,
    pendingBarPercent,
    contributionsCount,
    pendingInCents,
    confirmedInCents,
  } = progress;

  const raisedLabel = formatCentsToBRL(raisedInCents);
  const goalLabel = formatCentsToBRL(goalInCents);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {isLarge ? (
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-serif text-3xl font-medium tabular-nums leading-none text-foreground">
              {raisedLabel}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              arrecadados de <span className="font-medium text-foreground/80">{goalLabel}</span>
            </p>
          </div>
          <PercentBadge percent={percent} reached={reached} className="text-sm" />
        </div>
      ) : (
        // Compacto (card em 2 colunas no celular): o valor ocupa a linha toda, sem truncar;
        // "de R$ meta" e o percentual dividem a linha de baixo.
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold tabular-nums leading-none text-foreground">{raisedLabel}</p>
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-[11px] text-muted-foreground sm:text-xs">
              de <span className="font-medium text-foreground/80">{goalLabel}</span>
            </p>
            <PercentBadge percent={percent} reached={reached} className="text-xs" />
          </div>
        </div>
      )}

      <div
        role="progressbar"
        aria-label="Progresso da vaquinha"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(percent, 100)}
        aria-valuetext={`${raisedLabel} de ${goalLabel}, ${percent}% da meta`}
        className={cn("relative overflow-hidden rounded-full bg-muted", isLarge ? "h-4" : "h-2.5")}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${confirmedBarPercent}%` }}
        />
        {pendingBarPercent > 0 && (
          <div
            className="absolute inset-y-0 transition-[width,left] duration-700 ease-out"
            style={{
              left: `${confirmedBarPercent}%`,
              width: `${pendingBarPercent}%`,
              backgroundImage: PENDING_STRIPES,
            }}
          />
        )}
        {/* Marcos de 25/50/75%: dão noção de "quanto falta" sem precisar ler números. */}
        {isLarge &&
          [25, 50, 75].map((mark) => (
            <span
              key={mark}
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-background/70"
              style={{ left: `${mark}%` }}
            />
          ))}
      </div>

      {reached ? (
        <p className={cn("font-medium text-primary", isLarge ? "text-sm" : "text-xs")}>
          🎉 Meta atingida
          {overflowInCents > 0 && (
            <span className="font-normal text-muted-foreground">
              {" "}
              · {formatCentsToBRL(overflowInCents)} além do objetivo
            </span>
          )}
        </p>
      ) : (
        <p className={cn("text-muted-foreground", isLarge ? "text-sm" : "text-[11px] sm:text-xs")}>
          Faltam <span className="font-medium text-foreground/80">{formatCentsToBRL(remainingInCents)}</span>
        </p>
      )}

      {isLarge && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            {contributionsCount === 1 ? "1 contribuição" : `${contributionsCount} contribuições`}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
            Confirmado {formatCentsToBRL(confirmedInCents)}
          </span>
          {pendingInCents > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundImage: PENDING_STRIPES }}
                aria-hidden="true"
              />
              Aguardando confirmação {formatCentsToBRL(pendingInCents)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function PercentBadge({ percent, reached, className }: { percent: number; reached: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "flex-shrink-0 rounded-full px-2 py-0.5 font-semibold tabular-nums",
        reached ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
        className
      )}
    >
      {percent}%
    </span>
  );
}
```

### `src/components/gift-image.tsx`

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

type Sizing =
  | { fill?: false; width: number; height: number }
  | { fill: true; width?: never; height?: never };

type GiftImageProps = Sizing & {
  src: string | null;
  alt: string;
  className?: string;
  /** Só com `fill`: dica de tamanho para o `next/image` escolher a resolução. */
  sizes?: string;
  priority?: boolean;
  /** "contain" mostra a imagem inteira, sem recortar (com sobra nas laterais); "cover" preenche e corta. */
  fit?: "cover" | "contain";
  /** Mostra um aviso explícito quando havia URL mas a imagem não carregou. */
  showBrokenHint?: boolean;
};

export function GiftImage({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  fit = "cover",
  className,
  showBrokenHint = false,
}: GiftImageProps) {
  // Guarda a URL que falhou (e não um boolean): quando a URL muda — ex.: o
  // anfitrião troca a capa — a imagem nova é tentada em vez de ficar presa no placeholder.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = src !== null && failedSrc === src;

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-1",
          fill ? "absolute inset-0" : "h-full w-full",
          failed
            ? "bg-neutral-200 text-neutral-400"
            : "bg-gradient-to-br from-primary/10 to-secondary/20 text-muted-foreground",
          className
        )}
        role="img"
        aria-label={failed ? `Imagem de ${alt || "capa"} não pôde ser carregada` : `${alt} sem imagem`}
      >
        {failed ? (
          <>
            <ImageOff className="h-5 w-5" aria-hidden="true" />
            {showBrokenHint && <span className="text-[10px]">imagem indisponível</span>}
          </>
        ) : (
          <Gift className="h-6 w-6" aria-hidden="true" />
        )}
      </div>
    );
  }

  const imageClassName = cn(fit === "contain" ? "object-contain" : "object-cover", !fill && "h-full w-full", className);

  return fill ? (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={imageClassName}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={imageClassName}
    />
  );
}
```

### `src/components/ui/button.tsx`

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-border bg-transparent hover:bg-muted",
        ghost: "hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Alvos de toque confortáveis no mobile, um pouco mais compactos no desktop.
        default: "h-12 px-5 py-2 sm:h-11",
        sm: "h-10 px-3.5 text-sm sm:h-9 sm:px-3",
        lg: "h-14 px-8 text-base sm:h-12",
        icon: "h-11 w-11 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### `src/components/ui/card.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground transition-shadow duration-200",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Nível do título no documento: h1 em páginas cujo card É o conteúdo principal; h2 por padrão. */
  as?: "h1" | "h2" | "h3";
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Tag = "h2", ...props }, ref) => (
    <Tag ref={ref} className={cn("font-serif text-xl font-medium leading-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```

### `src/components/ui/confirm-dialog.tsx`

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  isPending?: boolean;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  destructive = true,
  isPending = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          role="alertdialog"
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 shadow-lg",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          )}
        >
          <DialogPrimitive.Title className="font-serif text-lg font-medium text-foreground">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description asChild>
            <div className="mt-2 text-sm text-muted-foreground">{description}</div>
          </DialogPrimitive.Description>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              {cancelLabel}
            </Button>
            <Button
              variant={destructive ? "destructive" : "default"}
              onClick={onConfirm}
              disabled={isPending}
            >
              {isPending ? "Aguarde..." : confirmLabel}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
```

### `src/components/ui/dialog.tsx`

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 flex flex-col gap-1", className)} {...props} />
);

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-serif text-xl font-medium", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };
```

### `src/components/ui/empty-state.tsx`

```tsx
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  /** Botão ou link opcional (ex.: "Limpar busca"). */
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border border-dashed border-border px-6 py-12 text-center",
        className
      )}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
```

### `src/components/ui/expandable-text.tsx`

```tsx
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  children: React.ReactNode;
  /** Só oferece "Ler tudo" quando o texto é longo o bastante para valer o corte. */
  isLong: boolean;
  className?: string;
}

/**
 * Recolhe textos longos (instruções do anfitrião) para não empurrar a lista de
 * presentes para fora da primeira tela, com opção de expandir.
 */
export function ExpandableText({ children, isLong, className }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const collapsed = isLong && !expanded;

  return (
    <div className={className}>
      <div
        id={contentId}
        className={cn("relative whitespace-pre-line", collapsed && "max-h-40 overflow-hidden sm:max-h-44")}
      >
        {children}
        {collapsed && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent"
            aria-hidden="true"
          />
        )}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          aria-controls={contentId}
          className="mt-2 rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {expanded ? "Mostrar menos" : "Ler tudo"}
        </button>
      )}
    </div>
  );
}
```

### `src/components/ui/input.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-card px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
```

### `src/components/ui/label.tsx`

```tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-medium text-foreground", className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
```

### `src/components/ui/password-input.tsx`

```tsx
"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/input";

/** Campo de senha com botão de mostrar/ocultar — reduz erro de digitação, sobretudo no celular. */
export const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, "type">>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={`pr-11 ${className ?? ""}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {visible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
```

### `src/components/ui/select.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-card px-3.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export { Select };
```

### `src/components/ui/skeleton.tsx`

```tsx
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} aria-hidden="true" {...props} />;
}
```

### `src/components/ui/tabs.tsx`

```tsx
"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 max-w-full items-center gap-1 overflow-x-auto rounded-md bg-muted/60 p-1 text-muted-foreground sm:h-11",
      // No celular as 4 abas não cabem: o degradê à direita avisa que há mais para rolar,
      // e o padding final garante que a última aba saia de baixo dele.
      "max-sm:pr-8 max-sm:[mask-image:linear-gradient(to_right,#000_86%,transparent)]",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex h-10 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm px-3.5 text-sm font-medium transition-colors sm:h-9",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      "data-[state=inactive]:hover:text-foreground",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    // `className` precisa entrar no cn(): antes era descartado e nenhum gap/flex passado às abas funcionava.
    className={cn("mt-6 focus-visible:outline-none", "data-[state=inactive]:hidden", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
```

### `src/components/ui/textarea.tsx`

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
```

### `src/components/ui/toast.tsx`

```tsx
"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[380px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border p-4 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        success: "border-primary/30 bg-card text-card-foreground",
        destructive: "border-destructive/40 bg-destructive/5 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
));
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-medium", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastPrimitives.Action>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
```

### `src/components/ui/toaster.tsx`

```tsx
"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
```

### `src/hooks/use-toast.ts`

```typescript
"use client";

// Padrão shadcn/ui: um reducer simples fora do React para permitir chamar
// toast() de qualquer lugar (inclusive fora de componentes).
import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      setTimeout(() => dispatch({ type: "REMOVE_TOAST", toastId }), 200);
      return {
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { toasts: [] };
      return { toasts: state.toasts.filter((t) => t.id !== action.toastId) };
  }
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) => dispatch({ type: "ADD_TOAST", toast: { ...props, id } });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  setTimeout(dismiss, TOAST_REMOVE_DELAY);

  return { id, dismiss, update };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return { ...state, toast, dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }) };
}

export { useToast, toast };
```

### `src/lib/auth.ts`

```typescript
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { credentialsSchema } from "@/schemas/auth.schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // Credentials exige sessão via JWT (o adapter continua cuidando das contas OAuth do Google).
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
```

### `src/lib/fund.ts`

```typescript
/**
 * Cálculo do progresso de uma vaquinha. A meta NÃO é um teto: dá para arrecadar
 * mais do que ela — a barra enche até 100% e o excedente vira um selo à parte.
 */

export interface FundTotals {
  goalInCents: number;
  /** Já confirmado pelo anfitrião (Pix recebido). */
  confirmedInCents: number;
  /** Declarado pelo convidado, ainda sem confirmação do anfitrião. */
  pendingInCents: number;
  /** Quantas contribuições ativas (declaradas + confirmadas). */
  contributionsCount: number;
}

export interface FundProgress extends FundTotals {
  raisedInCents: number;
  /** % arrecadado (declarado + confirmado) sobre a meta, sem teto — pode passar de 100. */
  percent: number;
  /** Larguras da barra, em % de 0 a 100: confirmado e, em seguida, aguardando. */
  confirmedBarPercent: number;
  pendingBarPercent: number;
  reached: boolean;
  /** Quanto passou da meta (0 se ainda não passou). */
  overflowInCents: number;
  /** Quanto falta para a meta (0 se já atingiu). */
  remainingInCents: number;
}

export function computeFundProgress(totals: FundTotals): FundProgress {
  const { goalInCents, confirmedInCents, pendingInCents } = totals;
  const raisedInCents = confirmedInCents + pendingInCents;
  const safeGoal = Math.max(goalInCents, 1);

  const percent = Math.round((raisedInCents / safeGoal) * 100);
  const confirmedBarPercent = Math.min((confirmedInCents / safeGoal) * 100, 100);
  // O trecho "aguardando" só ocupa o que sobra até 100%.
  const pendingBarPercent = Math.min((pendingInCents / safeGoal) * 100, 100 - confirmedBarPercent);

  return {
    ...totals,
    raisedInCents,
    percent,
    confirmedBarPercent,
    pendingBarPercent,
    reached: raisedInCents >= goalInCents,
    overflowInCents: Math.max(raisedInCents - goalInCents, 0),
    remainingInCents: Math.max(goalInCents - raisedInCents, 0),
  };
}

/** Sugestões de valor para o convidado tocar em vez de digitar: mínimo, múltiplos e "completar a meta". */
export function suggestContributionAmounts(minInCents: number, remainingInCents: number): number[] {
  const suggestions = new Set<number>([minInCents, minInCents * 2, minInCents * 5, minInCents * 10]);
  // Só oferece "completar a meta" quando é um valor que faz sentido (acima do mínimo).
  if (remainingInCents > minInCents) suggestions.add(remainingInCents);

  return Array.from(suggestions)
    .filter((value) => value >= minInCents && value <= 10_000_000)
    .sort((a, b) => a - b)
    .slice(0, 5);
}
```

### `src/lib/gift-availability.ts`

```typescript
export type GiftAvailability = {
  availableUnits: number;
  status: "AVAILABLE" | "LAST_UNIT" | "UNAVAILABLE";
};

const ACTIVE_RESERVATION_STATUSES = ["TEMPORARY", "CONFIRMED", "COMPLETED"] as const;

export { ACTIVE_RESERVATION_STATUSES };

export function computeGiftAvailability(quantity: number, activeReservations: number): GiftAvailability {
  const availableUnits = Math.max(quantity - activeReservations, 0);

  if (availableUnits <= 0) return { availableUnits: 0, status: "UNAVAILABLE" };
  if (availableUnits === 1) return { availableUnits, status: "LAST_UNIT" };
  return { availableUnits, status: "AVAILABLE" };
}
```

### `src/lib/guest-session.ts`

```typescript
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const GUEST_COOKIE_NAME = "guest_id";
export const GUEST_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 dias

/**
 * Lê o convidado identificado a partir do cookie httpOnly.
 * Uso em Server Components e Server Actions (leitura). Nunca lança —
 * cookie ausente ou apontando pra um Guest que não existe mais só
 * significa "ninguém identificado".
 */
export async function getCurrentGuest() {
  const guestId = cookies().get(GUEST_COOKIE_NAME)?.value;
  if (!guestId) return null;

  return prisma.guest.findUnique({ where: { id: guestId } });
}
```

### `src/lib/logger.ts`

```typescript
/**
 * Observabilidade mínima (seções 37 e 38 do documento):
 * detalhes técnicos vão para o log do servidor, o usuário recebe uma
 * mensagem amigável. Estrutura pronta para plugar um serviço externo
 * (Sentry, Axiom etc.) depois, sem mexer nas Server Actions.
 */

export const GENERIC_ERROR_MESSAGE =
  "Não foi possível concluir essa ação. Tente novamente.";

type LogContext = Record<string, unknown>;

export const logger = {
  error(scope: string, error: unknown, context?: LogContext) {
    const payload = {
      level: "error",
      scope,
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      ...context,
    };
    console.error(JSON.stringify(payload));
  },

  info(scope: string, message: string, context?: LogContext) {
    console.log(
      JSON.stringify({
        level: "info",
        scope,
        timestamp: new Date().toISOString(),
        message,
        ...context,
      })
    );
  },
};

/**
 * Envolve uma Server Action: erros inesperados são logados no servidor e o
 * usuário recebe apenas a mensagem genérica — nunca um PrismaClientKnownRequestError.
 */
export async function withErrorHandling<T>(
  scope: string,
  fn: () => Promise<T>,
  context?: LogContext
): Promise<T | { success: false; error: string }> {
  try {
    return await fn();
  } catch (error) {
    logger.error(scope, error, context);
    return { success: false, error: GENERIC_ERROR_MESSAGE };
  }
}
```

### `src/lib/pix-payload.ts`

```typescript
/**
 * Gera o payload "Pix Copia e Cola" (BR Code, padrão EMV do Banco Central).
 * Implementação local, sem integração bancária e sem dependências externas —
 * o QR Code é apenas uma representação visual desse mesmo texto.
 */

function emvField(id: string, value: string): string {
  const length = value.length.toString().padStart(2, "0");
  return `${id}${length}${value}`;
}

/** CRC16/CCITT-FALSE, exigido pelo padrão BR Code. */
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/** Remove acentos e caracteres não suportados pelo padrão. */
function sanitize(text: string, maxLength: number): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .slice(0, maxLength);
}

interface PixPayloadParams {
  pixKey: string;
  merchantName: string;
  amountInCents: number;
  city?: string;
  txid?: string;
}

export function buildPixPayload({
  pixKey,
  merchantName,
  amountInCents,
  city = "BRASIL",
  txid = "***",
}: PixPayloadParams): string {
  const merchantAccountInfo =
    emvField("00", "br.gov.bcb.pix") + emvField("01", pixKey.trim());

  const amount = (amountInCents / 100).toFixed(2);

  const payloadWithoutCrc =
    emvField("00", "01") + // payload format indicator
    emvField("26", merchantAccountInfo) +
    emvField("52", "0000") + // merchant category code
    emvField("53", "986") + // moeda: BRL
    emvField("54", amount) +
    emvField("58", "BR") +
    emvField("59", sanitize(merchantName, 25) || "RECEBEDOR") +
    emvField("60", sanitize(city, 15) || "BRASIL") +
    emvField("62", emvField("05", sanitize(txid, 25) || "***")) +
    "6304";

  return payloadWithoutCrc + crc16(payloadWithoutCrc);
}
```

### `src/lib/prisma.ts`

```typescript
import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias do Prisma Client em hot-reload durante o dev.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### `src/lib/slug.ts`

```typescript
/** Transforma um título em um slug simples (minúsculo, sem acento, com hífens). */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Sufixo curto e aleatório para reduzir chance de colisão de slug (ex: "a7k29"). */
function randomSuffix(length = 5): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

/** Token adicional (não previsível) usado junto ao slug para dificultar enumeração. */
export function generateSecureToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 24);
}

export function buildEventSlug(title: string): string {
  const base = slugify(title) || "lista";
  return `${base}-${randomSuffix()}`;
}

const SECURE_TOKEN_LENGTH = 24;

/**
 * Recebe o segmento de URL combinado "<slug>-<secureToken>" e separa as duas
 * partes. O secureToken tem tamanho fixo, então basta pegar os últimos N
 * caracteres — o restante (menos o hífen separador) é o slug.
 */
export function parseEventSlugToken(
  combined: string
): { slug: string; secureToken: string } | null {
  if (combined.length <= SECURE_TOKEN_LENGTH + 1) return null;

  const secureToken = combined.slice(-SECURE_TOKEN_LENGTH);
  const slug = combined.slice(0, combined.length - SECURE_TOKEN_LENGTH - 1);

  if (!slug || !secureToken) return null;
  return { slug, secureToken };
}
```

### `src/lib/supabase-storage.ts`

```typescript
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

export const GIFT_IMAGES_BUCKET = "gift-images";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type UploadResult = { success: true; url: string } | { success: false; error: string };

/**
 * Cliente admin — usa a service role key, então SÓ pode ser usado em código
 * server-side (Server Actions / Route Handlers), nunca em componentes client.
 * Retorna null em vez de lançar, para que a action chamadora transforme isso
 * numa mensagem clara em vez de estourar um erro genérico.
 */
function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    logger.error("supabaseStorage", new Error("Storage nao configurado"), {
      hasUrl: Boolean(url),
      hasServiceRoleKey: Boolean(serviceRoleKey),
    });
    return null;
  }

  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

/**
 * Valida e envia uma imagem para o bucket público `gift-images`.
 * Nunca lança: todo caminho de falha vira um UploadResult com mensagem
 * legível para o usuário e um log estruturado no servidor.
 */
export async function uploadImage(file: File, folder: string): Promise<UploadResult> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { success: false, error: "Formato inválido. Use JPG, PNG ou WebP." };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { success: false, error: "A imagem deve ter no máximo 5MB." };
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      success: false,
      error:
        "O envio de imagens ainda não está configurado. Confira SUPABASE_SERVICE_ROLE_KEY no .env.",
    };
  }

  const extension = file.type === "image/jpg" ? "jpg" : file.type.split("/")[1];
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;

  try {
    const { error } = await supabase.storage.from(GIFT_IMAGES_BUCKET).upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      logger.error("supabaseStorage.upload", error, { fileName, bucket: GIFT_IMAGES_BUCKET });

      const message = error.message?.toLowerCase() ?? "";
      if (message.includes("bucket") && message.includes("not found")) {
        return {
          success: false,
          error: `O bucket "${GIFT_IMAGES_BUCKET}" não existe no Supabase Storage. Crie-o como público e tente de novo.`,
        };
      }

      return { success: false, error: "Não foi possível enviar a imagem. Tente novamente." };
    }

    const { data } = supabase.storage.from(GIFT_IMAGES_BUCKET).getPublicUrl(fileName);

    if (!data?.publicUrl) {
      logger.error("supabaseStorage.publicUrl", new Error("URL publica vazia"), { fileName });
      return { success: false, error: "Não foi possível gerar o endereço da imagem." };
    }

    return { success: true, url: data.publicUrl };
  } catch (error) {
    logger.error("supabaseStorage.unexpected", error, { fileName });
    return { success: false, error: "Não foi possível enviar a imagem. Tente novamente." };
  }
}
```

### `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata um valor em centavos para o formato monetário brasileiro (R$). */
export function formatCentsToBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Constante de sistema: tempo de expiração da reserva temporária. */
export const RESERVATION_TIMEOUT_MINUTES = Number(
  process.env.RESERVATION_TIMEOUT_MINUTES ?? 15
);
```

### `src/middleware.ts`

```typescript
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard && !req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
```

### `src/schemas/auth.schema.ts`

```typescript
import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Informe a senha"),
});

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(80),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "A senha deve ter ao menos 8 caracteres")
    .max(72, "Senha muito longa"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
```

### `src/schemas/event.schema.ts`

```typescript
import { z } from "zod";

export const eventTypeValues = ["CHA_PANELA", "CHA_CASA_NOVA"] as const;
export const pixKeyTypeValues = ["CPF", "CNPJ", "EMAIL", "TELEFONE", "ALEATORIA"] as const;
export const themeValues = ["SALVIA", "TERRACOTA"] as const;

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Dê um nome para o seu evento").max(100),
  type: z.enum(eventTypeValues, { message: "Selecione o tipo de evento" }),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  eventDate: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? new Date(value) : undefined)),
  pixKey: z.string().trim().max(140).optional().or(z.literal("")),
  pixKeyType: z.enum(pixKeyTypeValues).optional().or(z.literal("")),
  deliveryAddress: z.string().trim().max(500).optional().or(z.literal("")),
  locationName: z.string().trim().max(120).optional().or(z.literal("")),
  locationAddress: z.string().trim().max(500).optional().or(z.literal("")),
  locationMapsUrl: z
    .string()
    .trim()
    .max(2048)
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "O link do mapa deve começar com http:// ou https://"
    ),
  theme: z.enum(themeValues).optional().or(z.literal("")),
});

export type EventInput = z.infer<typeof eventSchema>;
```

### `src/schemas/gift.schema.ts`

```typescript
import { z } from "zod";

const urlOrEmpty = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^https?:\/\/.+/i.test(value),
    "A URL deve começar com http:// ou https://"
  );

/** Valor digitado em reais (ex: "450,00" ou "450.00") que precisa resultar em centavos > 0. */
const moneyString = (emptyMessage: string) =>
  z
    .string()
    .trim()
    .min(1, emptyMessage)
    .refine((value) => {
      const parsed = parsePriceToCents(value);
      return Number.isFinite(parsed) && parsed > 0;
    }, "Informe um valor válido maior que zero");

// Teto de uma contribuição/meta: evita valores absurdos e estouro no campo de valor do Pix.
export const MAX_AMOUNT_IN_CENTS = 10_000_000; // R$ 100.000,00

export const giftSchema = z
  .object({
    kind: z.enum(["PRODUCT", "FUND"]).default("PRODUCT"),
    name: z.string().trim().min(2, "Dê um nome ao presente").max(120),
    description: z.string().trim().max(500).optional().or(z.literal("")),
    purchaseUrl: urlOrEmpty,
    // Produto: valor do presente. Vaquinha: META total a arrecadar.
    price: moneyString("Informe o valor"),
    // Só vaquinha: menor contribuição aceita.
    minContribution: z.string().trim().optional().or(z.literal("")),
    quantity: z.coerce.number().int().min(1, "A quantidade mínima é 1").max(999),
  })
  .superRefine((data, ctx) => {
    const priceInCents = parsePriceToCents(data.price);

    if (priceInCents > MAX_AMOUNT_IN_CENTS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["price"],
        message: "O valor máximo é R$ 100.000,00.",
      });
    }

    if (data.kind !== "FUND") return;

    const minRaw = data.minContribution?.trim();
    const minInCents = minRaw ? parsePriceToCents(minRaw) : NaN;

    if (!minRaw || !Number.isFinite(minInCents) || minInCents <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minContribution"],
        message: "Informe o valor mínimo de cada contribuição.",
      });
      return;
    }

    // Um mínimo maior que a meta impediria a vaquinha de se completar com uma contribuição só.
    if (minInCents > priceInCents) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minContribution"],
        message: "O valor mínimo não pode ser maior que a meta.",
      });
    }
  });

export type GiftInput = z.infer<typeof giftSchema>;

/**
 * Converte um valor digitado em reais para centavos, evitando float.
 * Aceita tanto "450,00" (padrão BR) quanto "450.00" (padrão US).
 * Se houver vírgula, ela é tratada como separador decimal e pontos como milhar.
 */
export function parsePriceToCents(rawPrice: string): number {
  let normalized = rawPrice.trim();
  if (normalized.includes(",")) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  }
  const asFloat = Number(normalized);
  return Math.round(asFloat * 100);
}
```

### `src/schemas/guest.schema.ts`

```typescript
import { z } from "zod";

export const guestIdentifySchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  email: z
    .string()
    .trim()
    .email("E-mail inválido")
    .transform((value) => value.toLowerCase()),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone com DDD")
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => value.length >= 10 && value.length <= 13, {
      message: "Informe um telefone válido com DDD",
    }),
});

export type GuestIdentifyInput = z.infer<typeof guestIdentifySchema>;
```

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    // Uma única largura máxima (1200px) de xl para cima: em ultrawide o conteúdo
    // fica centralizado em vez de esticar. Antes, xl usava 1280px e 2xl 1200px.
    // Gutter mínimo de 16px no celular, crescendo com a tela.
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px", "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          strong: "hsl(var(--secondary-strong))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
