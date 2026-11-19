# Direction artistique

Référence à respecter pour toute suggestion de montage ou toute vidéo faite avec Remotion.

## Identité
- **Genre** : gaming, gameplay commenté en français avec facecam.
- **Style** : montage dynamique, moderne et rythmé. Divertissant du début à la fin.
- **Principe clé** : le gameplay reste au centre. Les effets le mettent en valeur, ils ne le masquent jamais.
- **Sobriété** : pas de montage surchargé. Chaque effet doit avoir une raison d'être et renforcer le moment.
- **Ambiance** : immersive, avec une identité, sans paraître artificielle. Selon le moment, le montage joue sur l'humour, le suspense, l'intensité ou l'absurde.

## Format et mise en page (observé sur « ROB RUN LMARKET BEST CHEAT »)
- **Format** : paysage 16:9, 1920×1080.
- **Gameplay** : plein écran, interface du jeu conservée (minimap, chat, HUD).
- **Facecam** :
  - En haut à gauche, rectangulaire, sans cadre ni bordure.
  - Sa taille varie selon le moment : petite (~15–20 % de la largeur) quand le gameplay prime, plus grande (~25–30 %) quand la réaction compte.
  - Sur les moments comiques, elle peut être zoomée ou déformée pour exagérer la réaction.
  - Elle peut se coller au bord gauche ou être recadrée pour laisser de la place au jeu.

## Textes à l'écran
- **Style « réaction »** : gros texte en MAJUSCULES, police très grasse et condensée (type Impact), **rouge vif** avec un **contour noir épais**.
  - Exemple : « CHEATINNNNG », en bas au centre, avec des lettres répétées pour l'effet comique.
- À utiliser ponctuellement, sur un moment fort, jamais en continu.
- Ne pas cacher les éléments importants du jeu (personnage, viseur, action en cours).

## Couleurs
| Rôle | Couleur |
|---|---|
| Texte de réaction | Rouge vif `#E10600` |
| Contour des textes | Noir `#000000` |
| Accent secondaire | Blanc `#FFFFFF` |

Le reste des couleurs vient du jeu : on ne le recolore pas.

## Rythme
- Couper les longueurs, les temps morts, les déplacements inutiles et les passages sans intérêt.
- Enchaîner les séquences de façon fluide.
- Ralentir sur les moments importants, accélérer (ou couper) sur les passages moins intéressants.
- Créer le rythme avec les zooms, les coupes, le sound design, les transitions et les changements de plan.

## Effets visuels
- **Zooms dynamiques** : pour accentuer un moment important, une réaction ou un élément du gameplay.
- **Camera shake** : ponctuel, pour renforcer un impact (tir, choc, surprise). Jamais en continu.
- **Mise en évidence** : ponctuelle, pour attirer l'œil sur un élément à l'écran.
- **Overlays et animations** : propres et cohérents entre eux.
- **Transitions** : modernes et fluides. Pas de transition complexe à chaque changement de séquence : la coupe franche reste la base.

## Sound design
- Rôle central dans le montage : il apporte le punch.
- SFX pour accentuer les actions, zooms, apparitions, coupes, surprises et moments comiques.
- Sons adaptés au contexte : impact, whoosh, bass hit, glitch, suspense, silence gênant…
- Choix précis : pas de SFX partout sans raison.
- Toujours équilibré avec la voix et le son du jeu : la voix doit rester compréhensible.

## Traduction dans Remotion
- Zooms : `spring()` sur `transform: scale()` pour un effet nerveux mais naturel.
- Camera shake : petit décalage aléatoire (`random()` de Remotion) sur quelques images seulement.
- Texte de réaction : apparition en « pop » (`spring()` sur l'échelle), contour noir via `WebkitTextStroke`.
- SFX : `<Audio>` placé à l'image exacte de l'action, volume réglé sous la voix.

## Objectif final
Un montage maîtrisé, moderne, fluide et divertissant. Chaque séquence a un intérêt, le spectateur ne s'ennuie pas, et les effets comme le sound design renforcent l'expérience sans voler la vedette au contenu.
