# Méthode de travail

## Structure du projet
- `src/index.ts` : point d'entrée, enregistre les vidéos.
- `src/Root.tsx` : liste des vidéos (« compositions ») : taille, durée, images par seconde.
- `src/<NomVideo>.tsx` : le contenu d'une vidéo.
- `out/` : vidéos exportées (non envoyées sur GitHub).

## Commandes
| Commande | Rôle |
|---|---|
| `npm install` | Installe les dépendances (une fois, après récupération du projet). |
| `npm run dev` | Ouvre Remotion Studio pour prévisualiser et ajuster. |
| `npm run render` | Exporte `HelloWorld` dans `out/video.mp4`. |
| `npm run typecheck` | Vérifie le code TypeScript. |

Pour exporter une autre vidéo : `npx remotion render src/index.ts <IdVideo> out/<nom>.mp4`.

## Créer une nouvelle vidéo
1. Créer `src/MaVideo.tsx` avec un composant React.
2. L'ajouter dans `src/Root.tsx` avec une `<Composition id="MaVideo" ... />`.
3. La prévisualiser avec `npm run dev`, puis l'exporter.

## Règles de travail
- Respecter la direction artistique décrite dans `docs/DA.md`.
- Animer avec `useCurrentFrame()`, `interpolate()` et `spring()`, jamais avec des animations CSS (elles ne s'exportent pas correctement).
- Mettre les images, sons et polices dans `public/` et les charger avec `staticFile()`.
- Noter chaque étape importante dans `docs/SUIVI.md`.
- Un commit par changement cohérent, avec un message clair.
