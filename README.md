# Street Whisperer · Welcome Kit

**Free welcome-card and QR studio for hotels, hosts and concierges.**

**[Use the live tool →](https://street-whisperer-welcome-kit.vercel.app/)** · [Street Whisperer](https://street-whisperer.com/?utm_source=github&utm_medium=referral&utm_campaign=welcome_kit) · [Official PDF kits](https://street-whisperer.com/partenaires/)

> Provided by Street Whisperer. This repository contains the original welcome-kit utility only, not the private app or backend source.

## For hotels and hosts

1. Choose Paris, Lyon, Geneva, or “Another city”.
2. Optionally add your property's name and choose French or English for guests.
3. Generate a welcome card. Print / save as PDF, download the QR as SVG, or copy the guest link and message.
4. Add it to your reception desk, welcome book or existing guest communication.

The QR opens a mobile-friendly guest page with a relevant **existing web walking guide**, when available, and direct links to the iPhone and Android apps. The guide is not a route starting from your property and does not import automatically into the app. “Another city” introduces the app; it does not promise a local ready-made tour.

No account, contact form, paid plan or app integration is required to use the kit. Printing and SVG downloads are browser features. Always test the QR on the final printed card.

### Mobile apps

- [iPhone / App Store](https://apps.apple.com/app/apple-store/id6805096862?pt=128261116&ct=github_welcome_kit&mt=8)
- [Android / Google Play](https://play.google.com/store/apps/details?id=com.nielsalbrand.streetwhisperer&referrer=utm_source%3Dgithub%26utm_medium%3Dreferral%26utm_campaign%3Dwelcome_kit)

Street Whisperer offers **7 visits and 7 guide questions once**, with no account needed for the free allowance. Optional in-app purchases. iOS 18+ / Android 8.0+. Internet is needed for new stories and voices; complete offline tours are unavailable. Stories are AI-generated and can contain errors. Availability depends on local data. Local prices and terms are shown in the stores.

## Pour les hôtels, hôtes et conciergeries

Un outil gratuit pour créer une **carte d’accueil et un QR personnalisés**, en français ou en anglais. Choisissez la ville, ajoutez éventuellement le nom de l’établissement, puis imprimez la carte ou partagez le lien dans votre livret d’accueil. Aucun compte nécessaire.

Paris, Lyon et Genève renvoient vers des parcours éditoriaux existants. Pour les autres villes, la page présente l’application sans garantir de parcours local. Les liens vers les apps iPhone et Android sont accessibles à tous. Le nom d’un établissement ne constitue pas une preuve de partenariat, de commission ni de recommandation officielle.

## Privacy and attribution

- No analytics SDK, cookies, browser storage or signup.
- Personalization happens in the browser. The optional property name is encoded in the URL **fragment**, not its query string. It is visible to link recipients; never enter guest names or secrets. Hosting providers still process ordinary technical requests.
- Outbound website links use UTM parameters. App Store links use the existing product's provider ID and a `welcome_kit_<city>` campaign token. Google Play links include an encoded install referrer. These identify campaign traffic; **this tool does not itself collect clicks or verify installations**. Whether reporting is available depends on the store / product analytics configuration.
- Do not use QR codes to imply a venue endorses the product without permission.

[Product information](https://street-whisperer.com/guide-audio) · [Privacy](https://street-whisperer.com/privacy/) · [Terms](https://street-whisperer.com/terms/)

## Develop or self-host

Node.js 20+:

```sh
npm ci
npm run build
npm test
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. No server-side code, environment variables or credentials are needed. Built assets are in `dist/`. If you self-host, update the canonical, sitemap and robots URL in `src/index.html` and `build.mjs` to your own origin. Guest links are generated using the current origin.

The automated suite exercises all four destination choices in both languages, campaign parameters, malformed inputs, text-only rendering of property names and clipboard fallbacks. Browser verification additionally covers responsive layout, QR decoding and print/PDF output.

## License

Original utility code: MIT. Street Whisperer names and logos remain their owners' trademarks; the code license is not an endorsement or trademark license. `qrcode-generator` is MIT-licensed; its notice is retained in the bundled build. Dependency licenses remain applicable.
