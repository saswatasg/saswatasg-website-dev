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

## Final audit polish — 8 October 2026

- Work separates three selected cases from additional case studies. Builds is its own catalogue, with Archive excluded from the default view and preserved by filter and deep links.
- Case and build illustrations use one ink-and-muted-palette family with different structures for procurement, compliance, checkout, reporting, messaging, planning and workspace tools. They are editorial illustrations, not product screenshots. Metric labels remain explicit in the card copy.
- About explains product judgment and collaboration; Experience prioritizes current product ownership and progressively discloses achievements. Collapsed cards omit repeated metric badges when those figures are already in their bullets.
- Square major panels use 2px outlines and 4px hard shadows; nested data uses flat outlines. Controls use 4px corners. Legacy pill badges normalize to the control radius. Header height remains 68px desktop / 64px mobile.
- All slide systems preserve elapsed progress while hovered/focused reading content pauses. Playback controls are excluded from reading-area pauses so Play remains effective. Reduced motion disables autoplay.
- The mobile hero's eight variants keep their ordinary 196px outer geometry, while content can grow with enlarged text instead of clipping. Process panels share 570px outer geometry at 390px and can grow for accessibility.
- Chat preserves focus after suggested questions and asynchronous answers. Opening on mobile focuses Close, leaving keyboard activation to the visitor.
- Booking remains an iframe popup, with reload and email help. Chrome availability was verified; Safari/Firefox and physical mobile keyboards require device verification.
- Contact delivery and archival requests start concurrently and have independent deadlines. Only confirmed delivery clears the form. Tests mock both services; no contact message was sent.

### Confirmed evidence

LiveKeeping's reporting workflow was deployed and used daily. The lead-form result is **+124% submission volume**, distinct from the separately scoped role metric. Lead-routing source conversion rates remain observed inputs, and pilot targets remain targets. The greetings result is a reported engagement change without claiming isolated causal attribution.
