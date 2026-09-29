# Slide reviewer prompt (save this, paste it with each new chapter)

Attach the trans file(s) and the past quiz photos. Then paste:

---

Build a slide-based reviewer for the attached trans, in the same style as
`BIOCHEM/LEC/Biochem LE1 Slide Reviewer (1.1.1-1.6).html`.
Reuse the engine in `BIOCHEM/_engine/` (template.html, core.js, build.py, qa scripts).
Do not rebuild the engine. Write only the new content files.

## 1. Inputs and order
- Read every attached file fully before you build. Read the picture pages too, not only the text.
- Trans = outline and scope. Keep the trans numbering and order.
- Copy every learning objective (LO) word for word. Number them. If a trans has no LOs, stop and ask me.
- Past quiz photos = style and depth only. Never use them as the outline.
  Read the answer marks I made on them.
- Books = fill gaps only. Name the book, edition and chapter in a gold note.
  If you cannot open a book, say so. Do not cite what you did not read.
- Never invent LOs, exam claims, or facts. If unsure, leave it out and say so.
- Ask me: (a) hours available, (b) books to use, (c) look (light / dark), before you start.

## 2. Format
- One offline HTML file. Light style from my quiz palette (Georgia + Trebuchet MS).
- Next and Previous buttons, arrow keys, progress bar, section chips with minutes,
  a Contents drawer with search, and a "time left" line.
- One idea per slide. Short text. Tables, arrows, and simple drawings.
- Embed the trans figures as they are. Put big tables inside a "tap to open" box.
- Keep optional detail inside "Extra detail" boxes.
- Save answers and place in the browser (localStorage, inside try/catch).

## 3. Time plan
- Give every section a Full-path time and a Fast-path time. Add breaks separately.
- Tag each slide: ★ Must-know (kept on the Fast path) or ● Core (Full path only).
- Give a clock schedule, a fallback route, and a priority order if I fall behind.
- Add badges: ❗ marked "Must Know" in the trans, ◎ LO number, "Not in your trans".

## 4. Teaching style
- Plain words first, science term second. Define each term where it first appears.
- For each big idea: what it is, how and why it works, why it matters, how to use it in a question.
- For pathways: purpose, place, inputs, outputs, key control steps, links to other topics.
- Analogies only when they help. Say where the analogy stops.
- Keep every trans mnemonic in its original wording, next to its topic.
  Explain what each letter means. If a mnemonic is wrong or has exceptions, say so.
  Mark my own additions as "Added memory aid (not from your trans)".
- Break big lists into small groups. Add a comparison table. Add a recall prompt after each group.
- Repeat key facts later (Recall check, final review, numbers sheet, common mistakes).

## 5. Exam-reading help
- Add "Exam-style question" boxes (tap to open). For each: what it asks, clue words,
  how to reason, why the tempting answer is wrong. Teach reasoning, not keywords.
- Put the professors' real wording in these boxes.

## 6. Practice
- After each major block: a Recall check, answers hidden until I pick or tap Reveal.
- Mix direct recall and application questions. Explain the right answer and the main trap.
- Every LO needs at least one tagged question. Check this in code.
- Mark some questions for the Fast path (f:1). Add flash-recall cards.
- Spread the correct letters evenly over A to D (shuffle in code).
- Keep the four options the same length and the same type. No "all of the above".
- End with: essential connections, a numbers sheet, a common-mistakes table,
  a mixed final check, and a results slide that lists my misses.

## 7. Source control
- Compare the trans with the books. Show every problem in a **red** box,
  placed under the sentence it corrects. Say what the exam answer should be.
  Use only these lead-ins:
  Red: Error in your trans / Typo in your trans / Imprecision in your trans.
  Gold: Not in your trans / Different name in your trans / Note on your trans.
- Red = the trans is wrong. Gold = addition or naming difference. Never mix them.
- Verify each red box against a book before you write it.
- Add one "Trans conflicts" slide that lists every red box with a link.
- Add one "LO map" slide: each LO and the slides that teach it.

## 8. Quality checks (run before you deliver, fix, then run again)
1. No console errors. Every image loads. No raw HTML text on screen.
2. Every LO has a slide and a question. Answer letters are balanced.
3. Every question has 4 different options. The correct one is not always the longest.
4. Click test: options, reveal, flash, Full/Fast toggle, search, jump links, saved state.
5. Screenshot a desktop and a phone-width slide and look at them.
6. Re-read every fact you added from a book.

## 9. Delivery
- Save to `BIOCHEM/LEC/` (or `LAB/`). Name: `[Subject] [Trans numbers] Slide Reviewer.html`.
- Commit and push. Send me the file.
- Reply with: what you built, slide and question counts, time plan,
  the list of trans errors, what you added from books, what you could not read.
  Keep it short. Use ASD-STE100 (short sentences, active voice).

## Per-chapter shortcut
If I attach one chapter only: same rules, one section. Use the section time
as my whole budget. Keep the same slide types. Skip the cross-chapter review
unless I ask.
