# Workbench — editorial neo-brutalism

The right hero card and layered portrait are the visual reference for all
professional pages. This contract supersedes the previous Material-inspired
surface treatment. Adda and the split entrance are outside its scope.

## Source of truth

`src/styles/workbench-system.css` defines the component tokens and geometry.
It loads after the homepage and inner-page layout styles. Those files continue
to define layouts, responsive behavior and typography; they must not introduce
new competing surface styles. Legacy Tailwind cards and inline shadows are
adapted through scoped compatibility rules in the system stylesheet.

## Foundations

| Role                            | Value                                                   |
| ------------------------------- | ------------------------------------------------------- |
| Paper                           | #F5F2EC                                                 |
| Surface                         | #FFFDFA                                                 |
| Ink / outline                   | #0A0A0A                                                 |
| Expressive coral                | #E85D3A                                                 |
| Gold                            | #F2C85B                                                 |
| Supporting surfaces             | Sage, blue and clay from the existing editorial palette |
| Accessible coral action         | #A5432E with white text                                 |
| Headings                        | Satoshi / display fallback                              |
| Reading text                    | Inter, 16px, generous line height                       |
| Major panel corner              | 0px                                                     |
| Control / nested diagram corner | 4px                                                     |
| Major panel border              | 2px solid ink                                           |
| Resting panel elevation         | 4px 4px 0 ink; mobile 3px 3px 0 ink                     |
| Interactive panel hover         | 7px 7px 0 ink; mobile 4px 4px 0 ink                     |
| Control elevation               | 2px 2px 0 ink                                           |
| Easing                          | cubic-bezier(.22, 1, .36, 1)                            |

## Components

- Hero cards, project stories, product cards, testimonials, blog cards, page
  graphics, career surfaces and About panels share the square outline/shadow.
- Both rotating hero cards use identical geometry; each keeps its existing
  fixed dimensions across content variants. The portrait retains its original
  layered print framing, rotation and stronger hard shadow.
- Controls use compact rectangular geometry, a minimum 44px touch height and
  a hard shadow. Hover lifts slightly; pressing settles into the shadow.
- Nested data cells use a small corner radius and an outline without another
  floating-card shadow. Inverse panels keep readable light text and borders.
- Articles keep an open reading column. Figures and tables use square outlines;
  paragraphs are not boxed and do not carry decorative shadows.
- Testimonial attribution uses the card's background, a separating ink rule
  and dark text. Only the actual site footer has the dark footer treatment.
- Main cards do not use blurred shadows, large rounded corners or gradients.

## Deliberate exceptions

The outer floating navigation is rectangular in resting, scrolled and expanded
mobile states. Its internal
links, world selector, booking button and menu control use 4px corners.
Carousel dots and circular marks in illustrations remain circular.
The header uses only a home icon; the footer displays the full name as plain
text. Builds is a primary navigation destination. A slim “From my build lab”
strip above Selected Work opens featured products directly and links to Builds.

## Motion and responsive behavior

Keep the existing stepped hero transitions, manual controls and pause state.
Use consistent lift/press feedback on interactive surfaces; never change a
card's dimensions during a content swap. Preserve scroll reveals, keyboard
focus and reduced-motion handling. On phones, reduce shadow offsets and stack
layouts while keeping touch controls and reading text comfortable.

## Review criteria

Check equivalent elements together, rather than approving pages in isolation.
Major surfaces must compute to square corners, 2px ink borders and zero-blur
hard shadows. Check mobile overflow, dark-panel contrast, stable hero/testimonial
dimensions, focus states and keyboard navigation. A distinct illustration or
page layout is allowed; a new corner/elevation system is not.

### Preview card composition
Work, Builds, Blog and homepage previews share a square 2px outline, hard shadow, separated visual band and paper reading body. Body padding is 24px (20px mobile); headings are 23px; supporting copy is 14px/1.7; metadata is 11px. Actions sit at the bottom above a divider with a 44px minimum row. Work case previews reuse CasePreviewCard in both collections. Work build previews use the same BuildDiagram and card classes as Builds. Explicit indexed tones prevent nested Blog links all receiving the first tone. Illustrations and evidence vary according to the content.

### Navigation, invitations and booking
The navigation stays 68px high on desktop and 64px on mobile; mobile menus expand in a separate panel. Amber identifies the active route and selected world. Inactive hover uses muted blue, not amber. Homepage actions run from conversation on the left to work on the right. Testimonial controls align right and disable at scroll boundaries.

Contact uses a conversation illustration, booking invitation and icon-led profile links. About uses a layered portrait, manually selected company contexts, independent product links and a compact education/learning foundation. These use the established square borders, muted palette and hard elevation.

All scheduling entry points open the shared Radix in-page dialog with Google's public appointment iframe. The credentialless attribute isolates the frame from existing Google account cookies; the regular iframe failed in Chrome, while the isolated guest iframe rendered available slots. No separate window opens. Escape dismissal, focus trapping/restoration and an email alternative remain. Browsers without credentialless support use their normal iframe behavior and need separate validation. Opening the calendar never emits a booking-completion event.

### Homepage Build Lab showcase
Independent products have one compact showcase immediately before Selected Work. DhanPlan and Meldstead use illustrative miniature interfaces, explicit live/pre-launch states, concise descriptions and direct external product links. Explore Builds opens the full collection. The duplicate Products & Prototypes section is removed. Desktop uses two adjoining panels inside one framed shelf; mobile stacks panels with no nested elevation. Hover straightens the illustrative frames; reduced motion disables animation. Closing writing links include the existing editorial artwork.
