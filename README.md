# Royal Journey

MAJOR ARCHITECTURE + EXPERIENCE REDESIGN

I want to fundamentally redesign the existing portfolio.

DO NOT simply modify the current colors, backgrounds, images, or add basic hover animations.

The current implementation feels like a normal single-page scrolling portfolio with an ancient color theme. THAT IS NOT WHAT I WANT.

I want to transform it into a true cinematic, interactive, multi-page journey through an ancient Indian royal fort.

This is a major redesign.

CRITICAL REQUIREMENT — NOT A SINGLE SCROLL PAGE

The portfolio must NOT be one long scrolling page.

Each major chapter must be a separate route/page.

Use proper client-side routing.

Required routes:

/
/chronicle
/training-grounds
/royal-archives
/hall-of-victories
/scholars-library
/map-room
/next-chapter

The user should move between these pages as if they are physically travelling through different locations of one royal kingdom.

DO NOT put all sections one below another on the homepage.

The homepage should ONLY be the Royal Gate experience.

THE CORE IDEA

This is not:

"portfolio website with ancient styling"

It is:

"an interactive cinematic journey through Ranjit's fictional ancient Indian kingdom."

Every page must contain actual visual objects that participate in the interaction.

A background image alone is NOT enough.

For example:

BAD:

background image of a fort

text on top

button

GOOD:

actual visual fort gate

two separate gate-door elements

gate-opening animation

torch elements

foreground/background layers

atmospheric particles

camera movement

interactive transition

sound-ready architecture

user-triggered animation

The same principle applies to every page.

VISUAL PHILOSOPHY

Use an original ancient Indian / Maharashtrian fort-inspired visual language.

Avoid generic European medieval fantasy.

Do NOT use:

European castles

knights

dragons

generic medieval fantasy UI

excessive swords

generic fantasy game interfaces

Use:

Indian fort architecture

stone gateways

wooden doors

royal courtyards

wada-inspired interiors

brass lamps

oil lamps

parchment

royal seals

wooden furniture

carved stone

traditional Indian patterns

royal banners

ancient maps

manuscript rooms

fort corridors

mountain landscapes

The world should feel like one connected fictional Indian kingdom.

IMPORTANT — USE REAL VISUAL ASSETS, NOT JUST CSS

I want the visual elements themselves to be designed as separate layers/components.

Where possible create or use:

transparent PNG/WebP assets

layered illustrations

SVG illustrations

separate foreground/background elements

CSS/Framer Motion animation

DOM elements

canvas/WebGL only where justified

DO NOT flatten an entire scene into one background image if that prevents interaction.

For important scenes, separate:

background
+
midground
+
foreground
+
interactive objects
+
lighting
+
particles

This is essential for cinematic interaction.

TECHNOLOGY / ANIMATION

Use:

React

TypeScript

Tailwind CSS

React Router / routing appropriate to the existing Lovable stack

Framer Motion / Motion for React where appropriate

CSS transforms

SVG animations

layered assets

Use 3D only where it genuinely improves the experience.

Do NOT introduce heavy 3D everywhere just for the sake of 3D.

Prioritize cinematic 2.5D layered animation.

PAGE 01 — THE ROYAL GATE

ROUTE:

/

This is the ONLY landing page.

The visitor should see an actual ancient Indian fort entrance.

Scene layers:

distant mountain/sky

massive fort wall

central wooden gate

stone pillars

banners

torches

foreground ground

atmospheric fog

dust particles

The gate must NOT be a single background image.

The two wooden doors must be separate interactive elements.

INITIAL STATE

The gate is CLOSED.

Center text:

"Welcome, Traveller."

Subtitle:

"Beyond these gates lies a journey of ideas, code & ambition."

Button:

"ENTER THE KINGDOM"

ENTER ANIMATION

When the user clicks:

ENTER THE KINGDOM

DO NOT simply navigate instantly.

First perform a cinematic gate-opening sequence.

Animation:

Button gets pressed.

Torches become slightly brighter.

Ambient sound-ready event is triggered.

Camera slowly moves forward.

Left door rotates/slides outward.

Right door rotates/slides outward.

Darkness/interior of the fort becomes visible.

Dust particles react to the movement.

Light comes through the opening.

After the animation completes, navigate to:

/chronicle

Use Framer Motion / CSS transforms.

The two doors must physically move.

This is a CORE interaction.

PAGE 02 — THE ROYAL CHRONICLE

ROUTE:

/chronicle

This page represents About Me.

Do NOT create a normal About section.

The visitor enters a royal chamber.

Scene:

wooden desk

parchment

ink pot

quill

candle

wax seal

old books

stone walls

warm torchlight

The parchment is a real interactive object.

PARCHMENT ANIMATION

Initial state:

Parchment is rolled.

When page loads:

The parchment slowly unrolls.

Then text appears gradually as if written with ink.

Title:

"The Royal Chronicle"

Opening:

"To the traveller who has crossed the royal gates..."

Then reveal Ranjit's story.

Use real portfolio information.

Do not use lorem ipsum.

The page should communicate:

Ranjit Chavan
Computer Science Engineering student
Developer
Problem solver
Builder
Continuous learner

Include his journey with:

Python
Django
React
PostgreSQL
DSA
AI/ML
Cloud
Data Engineering

The quill can have a subtle idle movement.

The candle flame should have subtle animation.

PAGE 03 — THE TRAINING GROUNDS

ROUTE:

/training-grounds

This page represents Skills.

Do NOT use normal skill cards.

Create an actual ancient fort training courtyard.

Visual environment:

stone courtyard

training targets

wooden structures

banners

weapons rack

mountains in background

moving flags

torches

IMPORTANT INTERACTION — SWORD / SKILL REVEAL

I specifically want a cinematic sword interaction.

Do NOT simply show a sword image.

Create a sword as a separate visual object.

Initial state:

Sword is resting in a rack.

When the user selects a skill:

Example:

PYTHON

The sword should physically move:

subtle vibration

sword gets pulled from the rack

sword moves/slides into the center

small metallic/light effect

skill name appears

skill information appears on a royal plaque

sword settles into position

For example:

PYTHON

"5-Star HackerRank"
"Used in multiple projects and problem solving."

Other skills:

Django
React
JavaScript
PostgreSQL
SQL
Java
C
Git
GitHub
Microsoft Fabric
Power BI
Azure
PySpark
AI/ML

Each skill should have its own meaningful interaction.

Possible interaction:

Sword strike → skill plaque appears.

Do NOT animate everything simultaneously.

PAGE 04 — THE ROYAL ARCHIVES

ROUTE:

/royal-archives

This page represents Projects.

Create a real archive chamber.

Environment:

wooden shelves

scrolls

manuscripts

candles

stone walls

wooden table

royal seals

Projects should exist as physical scrolls.

SCROLL INTERACTION

Initial state:

Project scrolls are rolled.

When user clicks:

"DIVYADARSHAN"

The scroll should:

move forward

unroll horizontally/vertically

reveal project information

animate the title

reveal technology icons

reveal GitHub / Live Demo controls

Projects:

Divyadarshan
PustakMart
Algosys
LearNex
Hackathon Registration Website

Each project should feel like opening an ancient archive.

Do NOT create standard rectangular project cards.

PAGE 05 — HALL OF VICTORIES

ROUTE:

/hall-of-victories

Create a grand royal hall.

Use:

tall pillars

royal banners

central hall

stone floor

trophies

medals

plaques

warm golden light

Achievements should NOT simply be cards.

They should exist physically inside the hall.

TROPHY INTERACTION

When user approaches/selects an achievement:

The trophy/medal should:

slightly rise

glow

rotate subtly

cast light

reveal an information plaque

Achievements:

Sinhgad Hackathon Winner
Sinhgad Carnival achievement
HackerRank Python 5-Star
CodeChef achievement
Microsoft Fabric DP-700
Other certifications

PAGE 06 — THE SCHOLAR'S LIBRARY

ROUTE:

/scholars-library

This represents Education + Learning Journey.

Create a massive ancient library.

Environment:

tall bookshelves

wooden tables

candles

manuscripts

old books

stone arches

warm sunlight

dust particles

BOOK INTERACTION

Do NOT create flat cards.

Create physical books.

Each book represents a chapter.

BOOK 01
"THE BEGINNING"
2023

BOOK 02
"THE FOUNDATION"
2024

BOOK 03
"THE BUILDER"
2025

BOOK 04
"THE EXPLORER"
2026

BOOK 05
"THE NEXT CHAPTER"
2027

When user clicks a book:

book moves out of shelf

rotates slightly

opens

pages turn

education/learning information appears

The page-turn animation is essential.

PAGE 07 — THE MAP ROOM

ROUTE:

/map-room

Create a royal strategy/map room.

Large wooden table.

A giant ancient parchment map is placed on it.

But again:

DO NOT make the map a single flat background image.

Create an actual interactive map.

Locations:

Royal Gate
Royal Chronicle
Training Grounds
Royal Archives
Hall of Victories
Scholar's Library
Next Chapter

Draw animated dotted paths between locations.

When user selects a location:

path lights up

camera moves toward location

location marker enlarges

information appears

user can travel to that page

Add:

compass

wax seals

mountains

rivers

roads

fort symbols

decorative map elements

The map should feel like a physical ancient parchment.

PAGE 08 — THE NEXT CHAPTER

ROUTE:

/next-chapter

This is the Contact page.

Create an open royal balcony overlooking the kingdom.

Scene:

sunset/sunrise

mountains

distant fort

royal banners

stone balcony

candles

warm wind

atmospheric particles

Title:

"The Next Chapter"

Text:

"The journey ends here, but the story does not."

"Let's build the next chapter together."

Show:

Email
LinkedIn
GitHub
Resume

The buttons should look like royal plaques.

PAGE TRANSITIONS

THIS IS VERY IMPORTANT.

Do not make page changes feel like normal website routing.

Each transition should feel like travelling through the kingdom.

Examples:

Royal Gate → Chronicle:

Door opens → camera enters fort → fade/transition → Chronicle chamber.

Chronicle → Training Grounds:

Parchment folds → camera moves through corridor → courtyard appears.

Training Grounds → Archives:

Camera moves past fort corridor → archive door opens.

Archives → Hall:

Scroll rolls back → transition through royal corridor.

Library → Map Room:

Book closes → map table transition.

Map Room → Next Chapter:

Map camera zooms out → transition into kingdom landscape → balcony.

Use shared visual transitions where appropriate.

Transitions should take approximately 500–1200ms.

Never make them frustratingly slow.

NAVIGATION

There must be no conventional top navbar dominating the interface.

Create an immersive royal navigation system.

Use a small:

COMPASS / ROYAL SEAL

When clicked, it opens the Journey Menu.

Menu options:

Royal Gate
Royal Chronicle
Training Grounds
Royal Archives
Hall of Victories
Scholar's Library
Map Room
Next Chapter

Display:

"Chapter X / 08"

Also provide a subtle "Continue Journey" CTA on each page.

IMPORTANT UX RULE

The visitor must ALWAYS know:

where they are

how to move forward

how to go back

how to access the map

Do not sacrifice usability for cinematic effects.

DO NOT USE STATIC VISUALS AS THE MAIN INTERACTION

This is the most important requirement.

I do NOT want:

background image + text + button.

I want:

background
+
foreground objects
+
interactive objects
+
motion
+
camera movement
+
physical metaphor
+
transition

Examples:

FORT GATE:
Two doors physically open.

PARCHMENT:
Scroll physically unrolls.

SWORD:
Sword physically moves from rack.

ARCHIVE:
Scroll physically opens.

TROPHY:
Trophy physically reacts.

BOOK:
Book physically opens and pages turn.

MAP:
Map locations are interactive.

These interactions are the HEART of the website.

ASSET STRATEGY

If an image is needed, prefer creating/importing the scene as multiple layers rather than one flattened image.

For example:

Royal Gate:

gate-background.png
gate-left-door.png
gate-right-door.png
gate-torch-left.png
gate-torch-right.png
gate-fog.png
gate-foreground.png

Training Grounds:

courtyard-background.png
weapon-rack.png
sword.png
banner.png
mountains.png
particles.png

Chronicle:

room-background.png
desk.png
parchment.png
quill.png
inkpot.png
candle.png
wax-seal.png

This allows real animation.

If suitable assets cannot be generated automatically, create clean SVG/CSS versions for simple objects and leave clear asset placeholders for complex illustrations.

Do not fake physical interaction using only a hover scale.

CAMERA / CINEMATIC EFFECT

Use layered parallax.

Foreground should move slightly faster than background.

Add subtle:

camera zoom

camera pan

depth

perspective

atmospheric fog

light movement

The user should feel like the camera exists inside the environment.

MOBILE EXPERIENCE

On mobile, preserve the cinematic concept.

Do not simply shrink desktop scenes.

Use:

touch interactions

simplified camera movement

touch-friendly objects

swipe page transitions where appropriate

readable parchment

responsive map

For example:

Sword can respond to tap instead of hover.

Book can open on tap.

Map locations can respond to tap.

PERFORMANCE

Do not create a performance disaster.

Use:

lazy loading per route

optimized WebP/AVIF images

GPU-friendly transforms

requestAnimationFrame only where needed

limited particles

no unnecessary continuous animation

no giant videos unless absolutely necessary

Only load heavy scene assets when entering that page.

ARCHITECTURE

Refactor the current project instead of continuously adding code to the existing single-page implementation.

Create reusable components:

RoyalGate
GateDoors
RoyalChronicle
AnimatedParchment
TrainingGrounds
AnimatedSword
SkillPlaque
RoyalArchives
AnimatedScroll
HallOfVictories
AnimatedTrophy
ScholarsLibrary
AnimatedBook
MapRoom
InteractiveMap
JourneyNavigation
CinematicTransition
AmbientParticles
Torch
RoyalButton

Keep the implementation modular.

DO NOT DESTROY EXISTING CONTENT

Preserve the actual portfolio information and project names.

The goal is to redesign the PRESENTATION and EXPERIENCE, not remove the content.

SUCCESS CRITERIA

I will consider this redesign successful only if:

The website is genuinely multi-page.

Each chapter has its own route.

The homepage is only the Royal Gate.

The fort doors physically open when ENTER THE KINGDOM is clicked.

The Chronicle parchment physically unfolds.

Skills have physical/animated interactions, especially the sword.

Projects use interactive physical scrolls.

Achievements use interactive trophies/medals.

Education uses physical books with page-turning.

Map Room has a genuinely interactive map.

Pages transition cinematically.

The website feels like one connected kingdom.

It does NOT look like a normal portfolio with a medieval background.

Visual objects are layered and animated rather than flattened backgrounds.

The experience works on mobile.

The website remains performant.

FINAL INSTRUCTION

Do not give me another generic portfolio.

Do not solve this by changing only colors, fonts, backgrounds, or adding hover effects.

This is an EXPERIENCE redesign.

Think of it as:

"Build an interactive cinematic game-like journey, but use it to tell the story of a developer."

Before implementing major changes, inspect the existing codebase and preserve useful existing content/components where appropriate.

Then refactor the architecture around the multi-page journey described above.

Prioritize the Royal Gate first and make its door-opening interaction genuinely work before applying the same quality level to the remaining pages.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://royal-journey-chronicle.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a90eaf48-7d51-4a74-ac9b-c22c88cacc8f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
