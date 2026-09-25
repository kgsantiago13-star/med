# Project Rules

## Formatting & Style

1. Use ASD-STE100 Simplified Technical English in all responses.
   - Use short sentences.
   - Use controlled vocabulary.
   - Give one instruction per sentence.
   - Use active voice.

---

## File Locations

2. **File output location** — This rule applies to every request, not just the shorthand triggers.
    - **HTML quizzes** (all quizzes, current and future) are saved into `C:\Users\Kent\Desktop\med school\REVIEWER FROM TRANS\[Subject]\`, inside a `LEC` or `LAB` subfolder of the subject folder, chosen by whether the source is a lecture or a lab module (no chapter subfolder below that). For example: `C:\Users\Kent\Desktop\med school\REVIEWER FROM TRANS\Histology\LEC\Chapter 4 - Epithelial Tissue Quiz.html`. If the subject folder or its `LEC`/`LAB` subfolder does not exist yet, create it automatically.
    - If the subject is mentioned anywhere in the request, use that as the subject folder name. If no subject is mentioned, ask before building anything. Create any folders that do not exist.

3. **The user supplies the source. Never hunt for it.** The user attaches the source file with every quiz request.
    - Treat the attached file as the primary authority for content, for coverage (rules 7 and 8), and for accuracy checking (rule 18). It is the authority in addition to outside textbooks, never instead of them.
    - **Never search the disk for a source.** Do not guess which file the user meant. Do not build from a file you read in an earlier session.
    - **If no file is attached, stop and ask for it.** Do not start the outline pass. Do not build anything.
    - **If the attached file looks incomplete, say so before you build.** Then build from what the file holds, and fill any gap from an authoritative textbook per rule 19.

---

## Quiz Design (HTML)

4. Match the exact CSS/design of the Chapter 3 reference quiz (Chap 3.html). Use these exact values:

   **Color palette (CSS variables)**
   ```
   --bg: #f6f1ef
   --panel: #fffdfb
   --ink: #2c1b30
   --ink-soft: #6b5a6e
   --hema: #4a2e6b
   --hema-deep: #351f4d
   --eosin: #e0668c
   --eosin-deep: #c14a6f
   --gold: #c99a3c
   --good: #3f7a53
   --bad: #c0483f
   --ring: rgba(74,46,107,0.35)
   --radius: 16px
   ```

   **Fonts**
   - Body / question text: `Georgia, 'Iowan Old Style', 'Palatino Linotype', serif`
   - All UI elements (buttons, labels, options, feedback): `'Trebuchet MS', system-ui, sans-serif`

   **Background**
   - `radial-gradient(circle at 12% 18%, rgba(224,102,140,0.10), transparent 40%), radial-gradient(circle at 88% 82%, rgba(74,46,107,0.12), transparent 45%), var(--bg)`

   **Card**
   - Background `var(--panel)`, `border-radius: 16px`, `border: 1px solid #ece2e6`
   - Shadow: `0 1px 2px rgba(44,27,48,0.04), 0 12px 30px -12px rgba(74,46,107,0.18)`
   - Decorative `::before` pink radial-gradient circle in the top-right corner

   **Question layout**
   - **No topic label above the question.** The question card shows the question text first. A topic label hints the answer, so the quiz never prints one on the question screen. The `qmeta` row survives only to hold badges (rules 26 and 32); when a question carries no badge, the row is not rendered at all.
   - Question text: 19px Georgia
   - One card visible at a time (single-card render, not multi-card scroll)

   **Answer options**
   - Trebuchet MS 15px buttons, `border-radius: 12px`, `border: 1.5px solid #e2d6db`
   - Circular letter badge (26×26px circle, `border-radius: 50%`) for A/B/C/D — not a rectangular prefix
   - Correct selection: `border-color: var(--good)`, `background: #eef6f0`; letter badge fills `var(--good)`
   - Wrong selection: `border-color: var(--bad)`, `background: #fbeeed`; letter badge fills `var(--bad)`
   - Always reveal the correct answer after any selection

   **Feedback box**
   - Appears below options after answering, with `fadeIn` animation
   - Correct: `background: #eef6f0; color: #2c5a3c; border: 1px solid #cfe6d5`
   - Wrong: `background: #fbeeed; color: #8a332c; border: 1px solid #f0d3cf`
   - Starts with `<strong>Correct.</strong>` or `<strong>Not quite.</strong>`

   **Next button**
   - Pill shape (`border-radius: 999px`), `background: var(--hema-deep)`, white text
   - Hidden initially (`opacity:0; pointer-events:none; transform: translateY(4px)`)
   - Reveals with transition after answering (`.show` class adds `opacity:1`)
   - Last question label: "See results"; all others: "Next question →"

   **Previous button**
   - Outline pill style (`border: 1.5px solid var(--hema-deep); background: transparent; color: var(--hema-deep)`), same pill shape/size as Next
   - Sits to the left of Next in a flex row, label "← Previous"
   - Disabled/hidden on question 1; visible (not just enabled) on every other question, regardless of answered state
   - Unlike Next, does not depend on answering — always clickable once past question 1

   **Dot tracker**
   - Small 13px dots; unanswered = `#e3d9de`; current = `var(--gold)` scaled 1.25×; correct = `var(--good)`; wrong = `var(--bad)`
   - Progress label below: "Question X of Y" in Trebuchet MS 12px

   **Results screen**
   - Conic-gradient score ring using `var(--gold)`, inner circle `var(--panel)`, score as `num/total` + "correct"
   - Verdict headline (21px) + verdict-sub (14px) with different messages depending on score band
   - Outline pill restart button (`border: 1.5px solid var(--hema-deep); background: transparent`)
   - Review list: each item has a colored circle mark (✓ green / ✕ red) + outcome label + question text

   **Footer**
   - `font-size: 11.5px; color: #b8a7ae` attribution line at the bottom of the page

5. **Every quiz must include a "← Previous" button so the user can go back and recheck earlier answers.** This applies to every quiz, current and future.
    - Placed next to the Next button per the CSS spec above.
    - Going back must restore that question's original state exactly: the option the user picked, the correct/wrong coloring on the options, and the feedback box — not a blank unanswered question.
    - Going back must NOT clear or change the user's recorded answer, score, or the dot tracker state. It is a read-only re-view, not a redo.
    - The user can freely move forward and backward between any previously-answered questions without affecting their score. Navigating to a question already answered never re-prompts it as unanswered.
    - The dot tracker must stay clickable/consistent with this — jumping back via Previous keeps dot colors (correct/wrong) intact.

6. **End every quiz with an "Exam Pearls / Things to Remember" section on the results screen.** The student finishes the quiz and immediately gets the take-away list. This is the last thing they read, so it must hold the highest-yield facts.
    - **Give each question a `pearl` field.** One short sentence. It states the single fact the question teaches, written so it can be read alone without the question.
    - **Part 1 — "⚑ Review these — you missed them".** Build this list dynamically from the questions the student answered wrong. Show the `pearl` of each missed question, in question order. If the student misses nothing, replace the block with one line: "Perfect run. No items to review."
    - **Part 2 — "⚑ Exam Pearls".** A list of facts from the whole quiz. Scale the count to the quiz length: 8–12 for a short quiz, and about one pearl for every eight questions in a long one. Never stop at 12 when the quiz runs long. Order them by weight: the facts the lecturer stressed first per rule 26, the objective-linked facts second per rule 32, then everything else. Pick the facts that exams actually test: mechanisms, look-alike distinctions (rule 12), classic clinical correlations, and the numbers or names that are commonly asked. One fact per bullet. Short sentences.
    - **Place both blocks on the results screen**, after the score ring and the verdict, above the per-question review list.
    - **Style.** Panel card with the same `var(--panel)` background, `border-radius: 16px`, and `1px solid #ece2e6` border as the quiz card. Section label in Trebuchet MS uppercase, letter-spaced, in `var(--hema-deep)`. Missed items carry a small `var(--bad)` circle mark. Exam Pearls carry a `var(--gold)` mark.
    - **The section survives a restart.** Restarting the quiz clears the score and rebuilds the missed list from the new attempt.
    - **Keep it printable.** The student must be able to screenshot or print this one block and study from it alone.

---

## Coverage of the Source

7. **Order questions by topic sequence — no question limit.** Arrange quiz questions in the same order the topics appear in the source material (lecture transcript or chapter PDF), for whatever content is in scope under rule 8. The first questions should cover the first in-scope topic, then progress through subsequent in-scope topics in order. This lets the user study sequentially — reinforcing material in the same flow they learned it. There is no cap on the number of questions within that scope. Going through the quiz from the first question to the last must feel the same as reading the learning-objective-tied (and emphasis-flagged) parts of the source from start to end, in the order the source raised them — not necessarily the whole source end to end.

8. **Cover every topic and every detail that ties to a stated learning objective — question count does not matter within that scope. Walk the source section by section.** The finished quiz must read like the learning-objective spine of the source, plus every emphasis-flagged item per rule 26. A student who answers every question in order must meet the same in-scope content, in the same sequence, as a student who reads the source's LO-tied material from start to end. Do not stop writing questions because a "reasonable" number has been reached. Do not skip an in-scope detail because it is minor, hard to find an image for, or awkward to phrase.
    - **Extract the learning objectives first, before anything else.** Read the source for its stated learning objectives or outcomes. **If the source states none, stop and ask the user how to proceed.** Do not guess. Do not default to full coverage. Every stated objective must be tested by at least one question — more for objectives with deeper content. Tag every question that answers an objective, per rule 32.
    - **Mark the lecturer's emphasis cues in the same pass.** Rule 26 lists the cues to look for. Record each cue with its location in the source. An emphasis-flagged item stays in scope and gets a question even when it sits outside every stated objective.
    - **Work through the source in its own unit.** The unit changes with the source type. For slide decks, the unit is one slide. For a document, handout, transcript, or high-yield reviewer, the unit is one heading, one section, or one paragraph block. Take the units in order. For each unit, list every topic and every separate detail in it, then keep only the details that tie to a stated objective or carry an emphasis flag. Write at least one question for each of those. A detail that ties to no stated objective and carries no emphasis flag is out of scope — do not write a question for it.
    - **Do not compress an in-scope unit into one question.** If a unit carries five distinct in-scope facts, write five questions. If it defines three in-scope terms, write three questions — one question for each term. One general question per unit is not enough. Rule 9 also applies: one question tests one detail, so never compress several details into a single stem.
    - **A "detail" includes all of these, when in scope.** Named structures, cell types, organelles, enzymes, stains and staining properties, numeric values, functions, classifications, exceptions, and clinical notes. Each one is a separate item and needs its own question.
    - Before writing any quiz, extract a full outline of the source: every heading, subheading, named structure, named cell/organelle/tissue type, and worked example. Record where in the source each item came from (slide number, page, or heading), and mark against each one whether it ties to a stated objective, carries an emphasis flag, or is out of scope.
    - **Tag every question.** Put the specific learning objective or detail the question tests in its `topic` field. Name one objective or detail per question. The `topic` field is never shown above the question. It is used after the answer only: the Pearl Index groups by it (rule 28), and the results review list prints it.
    - Keep the questions in source order per rule 7. The source order is the question order.
    - After writing the quiz, audit it against that outline one item at a time. Confirm every in-scope item (LO-tied or emphasis-flagged) has at least one question, and confirm no out-of-scope item slipped in as a question. Do not rely on impression alone — list the outline items and check them off explicitly. Record the result of that audit in the delivery report.
    - If a specific in-scope item cannot be covered as planned (for example, an image will not extract cleanly), do not silently drop it. Work down the fallback ladder in rule 22. The fact itself must always reach a question, even when the image does not. Stop the build only when the fact cannot be covered at all.
    - **A very long quiz is correct and expected, within scope.** 100 or 200 questions is acceptable if the in-scope material holds that many details. A short quiz that skips an in-scope detail is wrong. Never trim in-scope coverage to keep the quiz short — and never pad it with out-of-scope detail either.

9. **One concept per question. Never fold several facts into one stem.**
    - **The default is one detail per question.** Each question tests exactly one fact, one term, one mechanism, or one structure. The student learns that one thing, answers, and moves on.
    - **Do not merge details to save questions.** If a unit carries three terms, write three questions. A stem that needs three separate facts before the student can answer is wrong, even when the facts are related. A student who misses it cannot tell which of the three they did not know.
    - **A scenario is context, not extra content.** Application questions stay single-concept. The stem may describe a patient, a slide, or an experiment. The student must still apply only one idea to answer it. Rule 10 is satisfied by the reasoning, not by stacking facts.
    - **Synthesis questions are optional, and they come last.** You may add a question that links concepts only after each of those concepts already has its own question earlier in the quiz. Never let a synthesis question be the only place a detail is tested.
    - **Never ask for two answers in one option.** Reject stems such as "which two stains were used" or "which instruments produced them", where a single option names two or more things at once. The student can be right about one half and wrong about the other, and the score hides which. Split it into one question per item.
    - **Never place a split pair side by side.** When one concept produces an identification question and a matching function-or-why question, separate them with at least two other questions. Adjacent halves read like an interrogation and make the quiz feel mechanical. Keep the first question at its source position, and move its partner later inside the same section. Rule 7 still holds at section level: the sections stay in source order.
    - **The separation must never cost a question.** If a section is too short to hold two questions between the pair, use the largest gap the section allows. If the section holds only the pair, let the partner cross into the next section. Never delete a question to satisfy the spacing. Log the exception in the delivery report.
    - **Teach first, apply later.** When one concept gets both a foundation question and an application question, put the foundation question first. The student must meet the mechanism before they must use it. This order sits inside the separation required above.
    - **Tag one detail per question.** The `topic` field names the single fact the question tests.
    - **Do not pad.** Never ask the same fact twice in different words. Never split one idea into two thin questions to raise the count.
    - **Rule 21 is the one exception.** A rebuilt source practice question may test a fact that an earlier question already covered. It comes from a different angle, so it is not padding. Keep both questions.

---

## Writing the Questions

10. **Write quizzes primarily in application-based format to match exam style.** The user's actual exams are application-based — questions present a scenario and require reasoning, not just recall. At least 45% of questions in every quiz must be application-based. The remaining direct-knowledge questions should still be written at a level that primes application (i.e., test the underlying mechanism, not a trivial definition). Application-based question format: 2–4 sentence stem describing a patient presentation, histological finding, lab result, experimental condition, or clinical scenario — followed by a question asking what is most likely, what is the underlying mechanism, what would be found, or what is the best next step. The correct answer must not be obvious from the stem alone; the student must actively apply their knowledge to the scenario to distinguish the correct answer from plausible distractors.
    - **Coverage wins over the percentage.** Rule 8 comes first. Never drop a detail to raise the application share. Rule 9 also holds: never merge details into one stem to make a question feel more application-based. Cover everything first, then push the application count as high as the material allows.
    - **Some details cannot carry a scenario.** A stain colour, a single measurement, or one enzyme name may have no sensible clinical stem. Write a clean mechanism question for it instead of forcing an artificial case. A forced scenario breaks rule 13.
    - **Measure across the whole quiz, not per section.** 45% is the floor for the finished quiz. Long recall-heavy stretches are acceptable if the quiz as a whole clears the floor.
    - **Never restate the answer inside the stem.** Do not name the correct option using a synonym or its own definition. A stem that says "the non-cellular component" has already given away "extracellular matrix". Describe what was observed, never what the thing is.
    - **Give one finding, not a pile of them.** Use the smallest number of findings that leaves exactly one option correct. Stacking three consequences makes the stem heavy without making it harder, and it signals the answer by sheer emphasis.
    - **Keep the stem short.** One or two sentences suit most concepts. Use three or four only when the case genuinely needs them. Difficulty comes from the reasoning step, never from the length of the scenario.
    - **Rewriting a stem is not finished until the options still answer it.** This is where stem-option mismatch is created, per rule 33. Re-read all four options after every stem rewrite.
    - **45% is a floor, not a target.** If the material supports more application questions, write more.

11. **Vary the angle. Test relationships, not isolated facts.** A fact learned alone is forgotten, and a concept learned from one direction is not understood. At least 20% of questions must approach a concept from an unexpected or inverted direction — the kind of question where knowing the textbook definition alone is not enough. Use relationship framing wherever the material supports it.
    - **Reverse causation**: instead of "What does organelle X do?", ask "A cell loses function Y — which organelle is most likely defective?"
    - **Elimination by reasoning**: present a scenario where the student must rule out look-alike options using deeper mechanistic understanding.
    - **Consequence prediction**: "If process X is blocked, what downstream effect occurs?" — requiring the student to trace a pathway forward or backward.
    - **Unusual framing**: describe a structure or process without naming it and ask the student to identify it from functional clues alone.
    - **Use these relationship question forms.** What causes this? What happens next? What increases or decreases? What structure performs this function? What happens if this structure is damaged or the enzyme is blocked? What finding would you expect? What finding would NOT occur? Which mechanism explains this finding? Which step fails first? What would the result be if the process ran in reverse?
    - **Chain the concepts.** Where the source teaches a pathway, a sequence, or a cascade, ask the student to move along it — forward from a cause, or backward from a result.
    - **Link structure to function every time both are given.** If the source names a structure and its job, test the link, not just the name.
    - **Negative stems are allowed, but keep them rare and clear.** Write the negative word in capitals and in bold — for example "which finding would <strong>NOT</strong> occur". Use this form only when the concept is best tested that way. Rule 13 still applies: the difficulty must stay in the reasoning, not in the wording.
    - The goal is to mirror how lecturers test: same concept, different angle — the student who truly understands will answer correctly regardless of how the question is phrased. Relationship questions are also the natural way to reach the 45% application floor in rule 10. **The two floors overlap. They do not stack.** One question may count toward both.

12. **Require discrimination between similar concepts.** Students lose marks on look-alike pairs, not on unknown material. Build questions that force the student to separate two concepts that are easy to confuse.
    - **Find the confusable pairs first.** During the outline pass (rule 8), mark every pair or set the source presents together, in the same table, or in the same list.
    - **Typical pairs.** Afferent vs efferent. Sympathetic vs parasympathetic. Proximal vs distal. Agonist vs antagonist. Competitive vs noncompetitive inhibition. Transudate vs exudate. Apical vs basolateral. Necrosis vs apoptosis. Endocrine vs exocrine. Hyperplasia vs hypertrophy.
    - **Only use comparisons the source supports.** Do not import a comparison from another subject or another chapter. The pair must come from the material, or from a gap filled under rule 19.
    - **Test the difference, not the definition.** Give a scenario or a finding, then ask which member of the pair it fits. The student must apply the distinguishing feature, not recite both definitions.
    - **Put the partner concept in the options.** The confusable partner must appear as a distractor, per rule 14. This is the clearest way to test the discrimination.
    - **Name the distinguishing rule in the feedback.** State the single feature that separates the two, so the student carries one clean rule away — for example "afferent carries signals toward the centre; efferent carries them away".

13. **Use a trick question only when it is highly relevant. Never write one to be clever.**
    - **A trick is allowed when it is high-yield.** Use one when the source itself tests the concept that way, when the trap is the exact distinction the exam turns on, or when the confusion it catches is one students genuinely make. Judge the relevance yourself. When in doubt, write the clean question.
    - **Never write a trick for its own sake.** Do not add one to raise difficulty, to vary the format, or to fill a quota. A trick that teaches nothing is noise.
    - **Write a clear stem.** The student must always know what the question asks. Ask the question one way only. Do not hide the real question inside a long or twisted sentence.
    - **A negative or EXCEPT stem is allowed when the distinction it tests is high-yield.** Write the negative word in capitals and in bold. Keep these rare.
    - **Do not test trivia.** Test the rule and the mechanism first. Add an exception only when the source teaches it or the exam is known to test it.
    - **Keep the difficulty in the reasoning.** A hard question is one where the student must apply a mechanism to a scenario — not one where the student must decode the sentence.
    - **Test after writing.** Read each question back. If a student who fully understands the concept could still answer wrong because of the wording alone, rewrite it. A trick that tests reading speed is never relevant.

14. **Build distractors from realistic mistakes.** Every wrong option must represent a plausible misconception — an error a real student could actually make. A distractor that no one would choose tests nothing.
    - **Use commonly confused pairs.** Draw distractors from structures, mechanisms, enzymes, receptors, cell types, stains, diseases, or downstream consequences that students genuinely mix up.
    - **Anchor them in the material.** Prefer distractors that appear somewhere in the source, in a nearby section, or in the same classification family. The student must decide between real concepts, not between a real concept and an invented one.
    - **Name the misconception in your own planning.** For each wrong option, know which specific error it catches: the look-alike structure, the reversed direction of a pathway, the wrong step of a mechanism, the sister enzyme, or the disease with an overlapping presentation.
    - **Never use filler options.** Do not write nonsense terms, obviously false statements, or joke answers to fill the four slots.
    - **Stay inside rule 13.** Plausible does not mean deceptive. The distractor must be wrong for a clear conceptual reason, not because of a hidden qualifier or a word trick.
    - **Keep rule 15 in force.** All four options must stay close in length and in level of detail.

15. **Balance the length of all answer options — by weight, not by padding.** Write the four options at the same natural level of detail. Never bolt an explanatory tail such as "which normally supports the cell" onto a distractor just to match the correct answer's length. A tail like that reads as filler, and a student learns to skip it. If the correct answer needs a qualifier, shorten it or give the distractors real content of the same size. The correct answer must never be identifiable by being the longest or most detailed option. After writing each question, compare the four lengths and rewrite until they match.

16. Randomize which letter (A/B/C/D) holds the correct answer for every question. Do not use the same position across consecutive questions. Also keep the spread even across the whole quiz. No letter may hold more than 30% or fewer than 20% of the correct answers. Check this in the rule 31 pass.

---

## Feedback and Accuracy

17. **Explain the concept completely and plainly. Never pad it.**
    - **Write one explanation and show all of it.** Do not split the feedback into a short visible core and a hidden expansion. Do not put anything behind a "More explanation" button. The student reads the whole explanation in the feedback box.
    - **Write at 8th grade reading level.** Use the everyday word first and the technical term second. Define every technical term the moment you use it. Keep sentences short. Give the concrete picture before the abstract principle. Never assume the student already knows the jargon.
    - **Complete means no missing step.** Explain why the answer is true, not only that it is true. When the concept is a chain, give every link: if A drives B and B drives C, say all three. When a term appears, define it. When the source teaches a clinical consequence of the concept, include it. The student learns this concept here and nowhere else, so nothing may be left out.
    - **Not padded means every sentence carries a new idea.** Delete any sentence that repeats an earlier one in different words. Delete any sentence that restates the stem. Delete filler transitions and throat-clearing. If you can remove a sentence and lose no information, it was padding.
    - **The length is whatever the concept needs.** A hard mechanism may take ten sentences. A simple fact may take two. Never stretch a simple fact to look thorough. Never compress a hard mechanism to look brisk. Judge by the concept, never by a target length.
    - **Name the clue when the question has one.** For a clinical, scenario, or image question, open by naming the one or two details in the stem that decide the answer. Put the decisive detail in <strong>bold</strong>. Say what that finding rules in, then connect it to the mechanism. Name one or two clues only, never every detail in the stem. A pure recall question needs no clue line.
    - **For an image question, name the visible feature that gives the answer away** - the arrangement, the nucleus shape, the staining pattern, the border, or the surrounding tissue.
    - **Use an analogy only when the idea cannot be pictured directly.** One good analogy on an abstract concept teaches. An analogy on every question is padding.
    - **Do not explain why each wrong option is wrong.** One short clause on a single high-yield misconception is allowed when students genuinely make that mistake. A rundown of all four options is not.
    - **Format it so it can be read.** Short paragraphs. Bullets for lists, steps, and comparisons. Never one solid block of text.
    - **Trans callouts sit inside the explanation**, per rule 30.
    - **Cite the source at the end**, per rules 18 and 19.

18. **Triple-check all answers before delivering any quiz.** This rule applies to every question, fact, drug mechanism, enzyme, pathway, and clinical correlation.
    - Verify each answer against at least one authoritative source (e.g., Junqueira's Basic Histology, Alberts et al. Molecular Biology of the Cell, Robbins Pathology, or a peer-reviewed standard reference).
    - If any answer is uncertain, state the correct answer and cite the source in the feedback text.
    - Never guess or approximate drug mechanisms, enzyme names, receptor subtypes, or clinical facts.

19. **Fill gaps in the source from authoritative external references.** The user's main source is the primary authority for scope and sequence, but it is not the limit. If a concept is incomplete, or a step in a pathway, mechanism, classification, or clinical correlation is missing, add the missing part from an authoritative source.
    - **Gap-filling stays inside the scope set by rule 8.** Fill a gap only when it sits inside a stated learning objective, or the gap concerns an emphasis-flagged item. A gap outside every stated objective, with no emphasis flag, is out of scope — do not fill it.
    - **Detect the gap first.** While you extract the outline (rule 8), mark every place where the source is thin: a named process with no mechanism, a list that is incomplete against the standard textbook list, a classification with missing members, a disease named with no mechanism, or a learning objective the source does not fully answer.
    - **Add only from authoritative sources.** Use Junqueira's Basic Histology, Alberts et al. Molecular Biology of the Cell, Robbins & Cotran Pathologic Basis of Disease, Guyton & Hall, Katzung, Lippincott Illustrated Reviews, Moore's Clinically Oriented Anatomy, Harper's Illustrated Biochemistry, or peer-reviewed literature. Never use unsourced recall, blogs, or AI-generated content.
    - **Add high-yield clinical context too.** When a concept has clinically important context — a disease mechanism, a drug's use, an exam-tested correlation — that is ≥95% relevant to the tested concept, include it even if the source did not contain it. Do not add loosely related trivia.
    - **Mark every added concept in the file itself, not only in the citation.** Any fact that is not in the source must sit in its own callout inside the explanation, so the user can spot it at a glance and check it. Use the `addnote` callout: a gold left border, and a bold lead-in that names it as an addition — for example "<b>Not in your trans.</b> Added from Junqueira's Basic Histology 17e, Ch. 4: ...". Never blend an addition into the surrounding text. Rule 30 defines the full callout family and the exact lead-in to use.
    - **Name the book, edition, and chapter** in that callout. The user must always see which facts came from outside the source, and where each one came from.
    - **Say which kind of check backs it.** Verified against the named textbook is one thing. Recalled without a copy to hand is another. If a specific number, edition, or chapter cannot be confirmed, either verify it with a search first or leave that detail out.
    - **Triple-check every added fact** against the external source before you use it, the same standard as rule 18. Verify enzyme names, receptor subtypes, drug mechanisms, cell types, and numeric values exactly. If you cannot verify a fact, do not add it.
    - **Stay relevant.** Add only what completes the source's own concepts or its learning objectives. Do not expand the scope into unrelated topics or add trivia the exam will not test.
    - **Report the additions.** After you deliver the quiz, list the concepts you added and the source for each, so the user knows what was not in the original material.

20. **Challenge every source. Decide what is right, then keep building.** Act as an intellectual sparring partner, not an agreeable assistant. Every time the user gives a paper, transcript, PDF, or any source for a quiz, do all of these:
    - **Analyze the source.** Find the assumptions the user takes for granted. State which claims the source asserts without support.
    - **Test the information.** Compare the content against authoritative references (Junqueira's, Alberts MBoC, Robbins, Guyton, Katzung, Lippincott, or peer-reviewed literature). Look for factual errors, outdated terminology, oversimplifications, missing steps, and gaps in the data.
    - **Prioritize truth over agreement.** Never soften a real error to be polite. Never repeat a source error into a quiz question just because the source says it.
    - **Never stop the build to ask.** If the countercheck finds an error, use the version you judge correct and write the question on it. Do not wait for permission. Do not deliver a partial quiz.
    - **Report it inside the feedback box, not in chat.** The student studies from the quiz alone, so they never read the trans. They must still know what the trans claimed. Put the conflict in the visible feedback box as a red callout from rule 30. State the trans claim. State the correct fact with its citation. Name which version the exam will most likely ask.
    - **List every correction in the delivery report** so the user can check your judgement afterward.
    - If the source is accurate, say so in one line and continue. Do not invent errors to look critical.

21. **Rebuild the source's own practice questions from a different angle.** Most sources contain practice questions with answer keys. Every one of those questions that is in scope under rule 8 must appear in the quiz, but never copied word for word.
    - **Extract them all first.** During the outline pass (rule 8), list every practice question, self-test item, recall box, and end-of-lecture question in the source, together with its given answer. Keep only the ones tied to a stated objective or carrying an emphasis flag. Treat that kept list as mandatory coverage, the same as a learning objective. A practice question outside every stated objective, with no emphasis flag, is out of scope.
    - **Test the same concept from a new direction.** Keep the tested fact identical. Change the approach. Use the rule 11 techniques: reverse the causation, ask for the consequence instead of the cause, describe the structure by function and ask the student to name it, or wrap the fact in a clinical or experimental scenario.
    - **Never reuse the original wording, stem, or option set.** If the student memorized the source's answer key, that memory alone must not be enough to answer your version. The student must understand the concept to answer it.
    - **Countercheck the source's answer key.** The given answer is not automatically correct. Verify it against an authoritative reference before you build the new question. If the key is wrong, use the correct answer and report the conflict in the feedback box per rule 20.
    - **Tag them.** Mark each rebuilt question in its `topic` field so the user can see which source practice question it came from.
    - **Report the mapping.** After delivery, give a short list: the source question, and the angle you used to re-ask it.
    - **Never match the source's difficulty downward.** If a source practice question is trivial recall, the rebuilt version must still test the mechanism behind it. The user wants to learn the concept, not pass an easy item. Raise the difficulty to concept level every time.

22. **Use the real images from the source when they are relevant.** Histology and lab content is taught and tested visually — the student must recognize actual structures on slides and micrographs, not only recall text descriptions. Scan every source for usable images before you write any question.
    - **Scope follows rule 8.** Build an image-based question only when the underlying fact ties to a stated objective or carries an emphasis flag. Skip an image that only illustrates an out-of-scope detail.
    - **Relevance decides it.** An image that appears in the source is usually relevant, but the question and the image must be about the same thing. Never attach an image for decoration. Never write a question around an image that only looks related to the concept.
    - **Skip an image that fails on quality or fit.** Skip it if it is unreadable, purely decorative (logos, page borders, clip art), or not tied to a tested concept. Never invent or substitute an image from outside the source.
    - Extract the relevant images (photomicrographs, electron micrographs, diagrams) directly from the source PDF or document.
    - Embed each image inline in the question itself as a base64 data URI, so the quiz stays fully self-contained and works offline like every other quiz.
    - Write the question stem around the shown image — ask the student to identify a labeled structure, name the tissue or organelle shown, or interpret a finding visible in the image. Do not just describe the image in words when the real image is available.
    - This applies on top of all other quiz rules (rule 17 feedback, answer balancing, reverse-angle questions, etc.) — image-based questions still need full-length, mechanism-based feedback.
    - **Work the fallback ladder before you stop.** Try these in order. Re-crop the page region. Re-render the page at a higher resolution. Use another image of the same structure from the same source. Use a figure from an authoritative textbook with full attribution.
    - **The fact must always reach a question.** A failed image never removes the knowledge. Write a text-only question for that fact, and note the gap in the delivery report.
    - **Stop the build only when the fact itself cannot be covered.** Then tell the user what failed and why. Rule 20 governs the reporting.
    - **Ask beyond the label.** An image is a starting point, not the whole question. Also ask: What is the function of the labeled structure? What would happen if it were damaged? What tissue type is present? What feature distinguishes it from its look-alike? What structure lies immediately next to it? Which clinical condition affects it?
    - **Write several questions per image when the image supports it.** One micrograph can carry an identification question, a function question, and a consequence question. Reuse the same embedded image for each one.
    - **Make the image necessary.** The student must look at the picture to answer. If the question can be answered from the text of the stem alone, rewrite it.
    - **Show no caption until the student answers.** A caption names the structure, the tissue, or the disease, so it hands over the answer. The question card shows the image alone. The caption and its source attribution appear with the feedback box, after the student picks an option. Keep the caption text in the `cap` field. Do not delete it — attribution still matters, it just arrives after the answer.
    - **Keep the identification questions too.** Recognition still matters for lab exams. Ask the name first, then build the deeper questions on the same image.
    - **Name the visual clue in the feedback**, per rule 17 — the arrangement, the nucleus shape, the staining pattern, the border, or the surrounding tissue.

---

## Shorthand Triggers

23. Shorthand trigger — **"Make a quiz"** / **"Build a quiz"** / **"Summarize this material"** (with materials attached) means: build the full HTML quiz in the style above, with high-yield, exam-relevant questions. Deliver the quiz only. All three phrases mean the same thing.

24. **PLQ = Post Lecture Quiz.** This is an abbreviation only. Read "PLQ" as "post lecture quiz". The user attaches the file when it is needed, per rule 3.

---

## Sole-Source Study Mode

**These rules apply to every quiz, current and future.** The user studies from the quiz alone. The user does not read the trans afterward. So the quiz must replace the trans, not summarize it. A fact that is not in the quiz is a fact the user never learns.

25. **Use the source's own words for every term.**
    - The exam uses the lecturer's wording. Use the trans term as the primary term in every stem, option, and feedback box.
    - **Put every naming difference in its own callout.** Do not blend the note into the feedback text. Use the gold `addnote` callout with the lead-in `<b>Different name in your trans.</b>`. Put it in the feedback box, next to the term it renames. Rule 30 defines the format.
    - Write the body as "Your trans calls this X. Junqueira's 17e calls it Y. They are the same structure." Always name the book and the edition.
    - **A different name is not an error.** Never use the red error variant for a synonym. The user must tell a naming difference from a real mistake at a glance.
    - Never swap a trans term for a textbook term because the textbook term is more correct. Report the difference instead.
    - Keep the trans's abbreviations. Expand each abbreviation once, on first use, in the feedback.

26. **Capture what the lecturer stressed. This is the highest-value signal in the trans.**
    - **Find the cues during the outline pass (rule 8).** Transes mark emphasis in plain words. Look for "this will come out", "this is important", "memorize this", "focus here", "he repeated this", "guaranteed exam question", and "take note". Also look for bold text, highlighted text, and all-caps notes from the transcriber.
    - Record every cue with its location in the source.
    - **Write a question for every marked item. No exception.** An emphasized fact is never left untested.
    - **Tag the question.** Add an `emphasis: true` field. Show a small gold "⚑ Lecturer stressed this" badge above the question. The badge stands alone. It never sits beside a topic label.
    - **Put these facts first in the Exam Pearls.** Rule 6 Part 2 lists them at the top of the block.
    - **Never invent emphasis.** Mark an item only when the trans actually flags it. If the trans flags nothing, say so in the delivery report.

27. **Add a "Drill my misses" mode to the results screen.**
    - Put a pill button labelled "⚑ Drill my misses (N)" on the results screen. Place it under the Exam Pearls block. N is the current number of wrong answers.
    - The button re-runs only the questions the student answered wrong. Keep them in the original order.
    - The drill uses the same card design and the same full explanations.
    - A question answered correctly in the drill leaves the miss list. A question answered wrong stays in the list.
    - The drill ends with a short results screen. It shows the remaining miss count and the button again.
    - The student repeats the drill until the list is empty. Show "Nothing left to drill. You cleared every miss." when it empties.
    - The drill never changes the main score. The main score records the first attempt only.
    - Hide the button when the student misses nothing.

28. **Build a Pearl Index. This is the lookup layer.**
    - A student cannot search a quiz. The index solves this.
    - List the `pearl` of every question on the results screen. Place the index under the Exam Pearls block.
    - Group the pearls by topic, in source order. Use the topic name as a heading.
    - Number each pearl with its question number, so the student can go back to the full explanation.
    - Put a search box above the index. Typing filters the pearls live by text match. Show only the groups that hold a match.
    - Add a "Show all pearls" control in the quiz header. The student can then open the index without finishing the quiz.
    - **Keep the index printable.** The student prints it and studies the whole chapter as a fact list in source order.
    - **Fix the results screen order.** Top to bottom: the score ring, the verdict, the missed-items block (rule 6 Part 1), the Exam Pearls (rule 6 Part 2), the "Drill my misses" button (rule 27), the Pearl Index, then the per-question review list.
    - Rule 6 still applies. The two blocks stay separate. The Exam Pearls hold the highest-yield facts. The Pearl Index holds every fact.

29. **Reproduce the source's tables, classifications, and lists intact — and test them as tables.**
    - **Scope follows rule 8.** Test a table under this rule only when it ties to a stated objective or carries an emphasis flag. A table outside every stated objective, with no emphasis flag, is out of scope.
    - A quiz breaks a table into single cells. The student then never sees the whole table.
    - Test each row or cell as its own question, per rule 9.
    - **Write at least one table-completion question for each table.** Show the table inside the question stem with two or three cells blanked and labelled. Ask which set of entries fills the blanks. The student must rebuild the shape, not only recall one cell.
    - **Get creative with the format.** A classification with a missing branch, a named sequence with one step removed, a comparison table with a missing column header, or a pathway with a gap in the middle all work. Choose the format that matches how the source presents the material.
    - **Keep rule 9 in force.** One blank set tests one idea. Never blank six unrelated cells in the same question.
    - Then rebuild the complete table inside the explanation of the last question of that group.
    - Introduce it with a bold lead-in: `<b>The full table.</b>`
    - Use a plain bordered table. Make the header row bold. Use no coloured fill. Keep the cell text short.
    - Do the same for every classification, every numbered list, and every named sequence or pathway.
    - Never drop a table because its cells are already tested one by one. The student needs the whole shape as well as the parts.

30. **Use one callout family for every remark about the trans.**
    - The user studies from the quiz alone. So every note about the trans must be visible at a glance, never buried in a paragraph.
    - **All of these callouts share one shape.** Left border 3px, tinted background, `padding:9px 12px`, `margin:10px 0`, `border-radius:0 8px 8px 0`. Each one opens with a bold lead-in from the list below. Placement depends on the variant. See the placement rule below.
    - **Gold variant — class `addnote`. The trans is fine. This note adds something.**
      - `<b>Not in your trans.</b>` — a fact added from a textbook, per rule 19.
      - `<b>Different name in your trans.</b>` — the same concept under another name, per rule 25.
      - `<b>Note on your trans.</b>` — a neutral remark about scope or wording.
    - **Red variant — class `addnote err`. The trans is wrong or unsafe to trust.**
      - `<b>Error in your trans.</b>` — the trans states something factually wrong.
      - `<b>Typo in your trans.</b>` — a transcription slip, such as a wrong number or a misspelled name.
      - `<b>Imprecision in your trans.</b>` — the trans is not wrong, but it is too loose to be safe in an exam.
    - **Placement — every callout is visible.** Rule 17 hides nothing, so no callout is ever behind a button.
      - Put a red callout directly below the sentence it corrects, so the correction reaches the user before they read on.
      - Put a gold callout where it fits the flow of the explanation.
      - Keep one red callout per question. A question needing two corrections is usually two questions.
    - **CSS.** The gold `.addnote` rule already exists in the engine. The variant is:
      `.addnote.err{border-left-color:var(--bad);background:rgba(192,72,63,.09)}`
    - **Every red callout must name the exam answer.** State the trans claim. State the correct fact with its citation. Then say which version the exam will most likely ask. Rule 20 governs the reporting.
    - **Use these six lead-ins only.** Do not invent a seventh.
    - **Never use the red variant for a naming difference or for an addition.** Red means the trans is wrong. Nothing else.

---

## Quality Control

31. **Run one final check before every delivery. Check everything, from grammar to accuracy.**
    - **Never skip this pass.** Run it after the build is finished and before you send anything. Run it again after every fix.
    - **Never report a check you did not run.** If a layer could not be run, name it and say why.

    **Layer 1 — Facts.**
    - Verify every fact against an authoritative reference. Rules 18 and 19 set the standard.
    - Re-verify every red callout. A false error callout teaches the user to distrust a correct trans.
    - Confirm the book, the edition, and the chapter in every citation. Remove any detail you cannot confirm.
    - Check every number, unit, enzyme name, receptor subtype, and drug mechanism one at a time.

    **Layer 2 — Answer keys.**
    - Confirm the marked option is correct for every question.
    - Confirm exactly one option is correct. Reject any question where a second option is also defensible.
    - Confirm each distractor is wrong for a clear reason, per rule 14.

    **Layer 3 — Coverage.**
    - Walk the source outline one item at a time. Confirm every in-scope item (tied to a stated objective, or emphasis-flagged) has at least one question, per rule 8.
    - Confirm no out-of-scope item — no stated objective, no emphasis flag — slipped in as a question.
    - Confirm every learning objective has a question.
    - Confirm every objective-linked question carries its badge, per rule 32.
    - Confirm every emphasis-tagged item has a question, per rule 26.
    - Confirm every in-scope source practice question was rebuilt, per rule 21.

    **Layer 4 — Language.**
    - Read every stem, option, feedback box, and pearl.
    - Confirm every explanation defines each technical term it uses, and explains the mechanism rather than restating the fact, per rule 17.
    - Confirm no explanation repeats an idea in different words. Delete the repeat.
    - Check spelling, subject-verb agreement, article use, and tense.
    - Check every medical term against the textbook spelling.
    - Confirm each stem asks one clear question, per rule 13.
    - Keep the writing in ASD-STE100 style: short sentences and active voice.

    **Layer 5 — Terms.**
    - Confirm one structure carries one name across the whole quiz, per rule 25.
    - Confirm every abbreviation is expanded once, on first use.

    **Layer 6 — Option mechanics.**
    - Run the rule 15 length audit. The correct answer must never be the longest option.
    - Run the rule 16 spread check. No letter may hold more than 30% or fewer than 20%.
    - Confirm every question has four options. Confirm no option repeats inside a question.
    - Run the rule 33 read-back test on every question. The stem and the four options must ask and answer the same kind of thing.
    - Confirm no stem hands over its own answer. Reject any question where the correct option restates the stem.
    - Reject "all of the above" and "none of the above".

    **Layer 7 — Rendering.**
    - Open the finished HTML in a browser.
    - Look for missing glyphs, black boxes, and broken images.
    - Look for raw HTML tags showing as plain text.
    - Read the browser console. One unescaped quote breaks the whole quiz.

    **Layer 8 — Interaction.**
    - Click through the quiz. Test Previous and the dot tracker.
    - Confirm every explanation renders in full, with nothing hidden behind a control.
    - Test the drill mode (rule 27) and the Pearl Index search (rule 28).
    - Confirm the last question shows "See results".

    **Layer 9 — Report.**
    - Name the layers you ran.
    - List every error you found and fixed.
    - List every fact you added from outside the source, per rule 19.
    - List every trans error you found and how you resolved it, per rule 20.
    - Give the objective map: each objective and the question numbers that test it, per rule 32.
    - Give the totals: units, details, questions, application share, and emphasis-tagged count.
    - **Fix, then run the pass again.** One fix can break something else.

---

## Learning Objectives

32. **Mark every question that answers a learning objective. Under rule 8, objective-linkage is now the coverage gate, not just a badge.**
    - **This rule and rule 8 work together.** Rule 8 scopes the quiz to content that ties to a stated learning objective, plus emphasis-flagged items per rule 26. Since almost every question now exists because of an objective (or because of emphasis), the `objective` tag below is close to universal for a quiz — set it on every qualifying question, not only a highlighted few.
    - **Tag the question.** Add an `objective` field holding the objective number and its short name. A question may carry `objective` and `emphasis` at the same time.
    - **Show a badge.** Put a small badge above the question reading "◎ Learning objective N". Style it in `var(--hema)` so it reads as clearly different from the gold "⚑ Lecturer stressed this" badge in rule 26. When a question carries both, show both, with the gold emphasis badge first. No topic label sits beside them.
    - **One objective usually needs several questions.** Tag every question that serves it, not only the first one.
    - **Order the Exam Pearls by weight.** Lecturer-stressed facts first, objective-linked facts second, everything else after. Rule 6 Part 2 holds the full ordering.
    - **Mark them in the Pearl Index.** Carry the same badge into the index so the student can find the objective facts at a glance. List the objectives themselves at the top of the index, in source order.
    - **Never invent an objective.** Tag a question only when it genuinely answers an objective the source states. If the source lists no objectives, rule 8 already requires stopping to ask the user before building anything — this rule does not add a separate fallback.
    - **Report the map.** After delivery, list each objective and the question numbers that test it, plus any emphasis-only questions kept outside every stated objective, so the user can see the full scope and weighting.

---

## Question Integrity

33. **The stem and the options must ask and answer the same kind of thing.**
    - **Match the type.** If the stem asks "which structure", every option names a structure. If the stem asks for a function, every option states a function. The same holds for mechanisms, cell types, enzymes, findings, outcomes, and steps in a sequence.
    - **Run the read-back test on every question.** Take the stem's question, drop one option into the answer slot, and read the whole thing as one sentence. If it does not parse as an answer, the question is broken. "Which structure does this?" answered by "To detect stimuli and respond to them" fails the test — the stem asks for a thing and the option gives a job.
    - **Keep the four options the same type as each other.** Three structures and one function is broken even when the stem is clear. The odd option is identifiable without knowing the concept.
    - **Re-read the options every time you rewrite a stem.** This defect is created by rewriting, not by writing. A recall question becomes a scenario question under rule 10, the stem changes, and the options stay as they were. Rule 10 requires the re-read.
    - **Never let the stem hand over the answer.** If the stem already states what the correct option states, rewrite one of them. Rule 10 forbids this, and it slips through most often on questions rewritten into scenario form. A stem describing a cell that detects a hormone and responds cannot have "detects stimuli and responds to them" as its correct option.
    - **Fix it by changing the stem, not the options, when the options are sound.** Four good function options need a stem that asks for a function. Rewriting one stem is cheaper and safer than rewriting four options.
    - **Rule 31 Layer 6 runs this check on every question before delivery.**

---

## Deck Mode (Flashcard Decks)

**A deck teaches. A quiz tests.** These rules govern decks only. Rules 1 to 33 keep governing quizzes, unchanged.

34. **Trigger — "Make a deck" / "Build a deck".**
    - This builds a card deck, not a quiz. It does not replace rule 23. "Make a quiz" still builds a quiz.
    - A deck has no options, no score, and no right or wrong. The user reads a card, then presses Next.
    - The user supplies the source, per rule 3. Never hunt for it. If no file is attached, stop and ask.

35. **The card shape. Top to bottom, on every card.**
    - **Badges.** Gold "⚑ Lecturer stressed this" first. Purple "◎ Learning objective N" second. Show a badge only when it applies. Render no badge row when the card carries none.
    - **The term.** The concept name, as the heading.
    - **The kicker.** A small uppercase line. It names the section the card came from.
    - **The one-line answer.** Bold. Under 20 words. The user could read this line alone and still be right.
    - **The unpacking.** Short paragraphs and bullets.
    - **Callouts.** Gold or red, per rule 30.
    - **Exam angle.** One line. It states why this gets asked.

36. **Text density. These are limits, not targets.**
    - 130 to 170 words visible per card.
    - 20 words per sentence, maximum.
    - 3 sentences per paragraph, maximum.
    - A blank line between every block. No card is one solid wall of text.
    - 3 or more items becomes a bullet list.
    - **Split, never stretch.** A long mechanism becomes several short cards in a row. It never becomes one long card. Rule 17's completeness standard still holds. The chain must be complete across the cards.

37. **Language level — high school.**
    - **No analogies. None.** Not for hard concepts either. This overrides the analogy clause in rule 17.
    - Use the real term as the primary word. Never lead with a softened phrase.
    - Define a term on first use, in a clause, not in a separate sentence.
    - Assume the user knows these: cell, nucleus, protein, enzyme, molecule, bond, membrane.
    - The plainness comes from sentence length and structure. It never comes from weaker vocabulary.
    - Keep the trans's own term, per rule 25.

38. **Coverage. Decks follow the same learning-objective scope as quiz rule 8.**
    - **Extract the learning objectives first, before building anything.** Read the source for its stated learning objectives or outcomes.
    - **If the source states no objectives, stop and ask the user how to proceed.** Do not guess. Do not silently fall back to full coverage.
    - **Build a card only for content that answers a stated objective.** Rules 7 and 9 still govern order and the one-concept-per-card limit for whatever content qualifies.
    - **Keep every emphasis-flagged item regardless of objective tag.** Per rule 26/40, if the lecturer stressed it, it still gets a card even when it sits outside every stated objective. Mark it in the delivery report as emphasis-only, not objective-linked.
    - Card order follows source order for whatever content is in scope. Reading the deck top to bottom equals reading the LO-tied (and emphasis-flagged) parts of the source in the order the source raised them — not the whole source end to end.
    - There is no card limit within that scope. Build as many cards as the qualifying content needs.
    - Never merge two details into one card.
    - Rebuild every source practice question that is tied to a stated objective as a card, per rule 21. State the concept. Do not ask it. A practice question outside every stated objective is out of scope.
    - Reproduce every table that is tied to a stated objective, per rule 29. Give each row its own card, then show the whole table on the last card of that group. A table outside every stated objective is out of scope.
    - **Tag every qualifying card with its objective.** Since a card now exists because of an objective (or because of emphasis), set the rule 32 `objective` tag on every card except emphasis-only ones.
    - **Report scope in the delivery report.** List which objectives were covered, how many cards per objective, and how many emphasis-only cards were kept outside the stated objectives.

39. **Sources. The trans is the skeleton. The textbook is the supplement.**
    - The attached source sets the order, the scope, and the wording.
    - Fill gaps from an authoritative textbook, per rule 19.
    - **Gap-filling stays inside the LO scope set by rule 38.** Fill a gap only when it sits inside a stated learning objective. A gap outside every stated objective is out of scope, same as any other source detail.
    - **A small textbook gap becomes its own card, not a callout.** Mark that card with the gold "Not in your trans" callout. Name the book, the edition, and the chapter.
    - **A large gap becomes a slide sequence, never one card.** A gap is large when the source omits a whole learning objective, a whole mechanism, a whole classification, or a whole named process. One card cannot teach that, and a gold callout inside one card makes it look like a footnote. The student must learn it here, because the trans never teaches it at all.
      - **Set `slide` on every card in the run.** The value is the source, written short — for example `"Guyton & Hall 14e, Ch. 6"`. The card then renders as a gold-banded slide instead of a normal card. The whole card is the callout, so do not also wrap the body in `addnote`.
      - **Set `step` to the position in the run** — for example `"2 of 4"` — so the student can see the sequence has a shape.
      - **Split it by rule 36, exactly like source content.** One step, one term, or one member per slide. A five-step cycle is five slides, not five bullets on one slide. Never compress a gap to make it take less room.
      - **Open the run with a slide that states what is missing and why it matters.** Name the objective. Say plainly that the source does not cover it.
      - **Keep it in source order.** The run sits where the source raised the topic and dropped it, not at the end of the deck.
      - **Tag every slide in the run with its `objective`.** Rule 32 applies unchanged.
      - **Cross-reference another deck when one covers the topic.** Add the pointer, but never let it replace the teaching. The slide must stand on its own.
    - Countercheck every fact, per rules 18 and 20. A trans error gets a red callout on the card it belongs to.

40. **Badges and callouts. Rules 26, 30, and 32 apply in full.**
    - Tag every emphasized item with `emphasis: true`.
    - Tag every objective-linked card with its `objective` number.
    - Use the six callout lead-ins only. Never invent a seventh.
    - Never use the red variant for a naming difference or for an addition.

41. **Dark mode. Use this palette on every deck.**
    ```
    --bg: #262624
    --panel: #30302e
    --panel-2: #393937
    --line: #403f3c
    --ink: #f0eee6
    --ink-soft: #a8a498
    --hema: #b79ae0
    --hema-deep: #6b4e9c
    --eosin: #e88aa8
    --gold: #d9ad5a
    --good: #6fb98a
    --bad: #e07a6f
    --radius: 16px
    ```
    - Background: `radial-gradient(circle at 12% 18%, rgba(232,138,168,.07), transparent 40%), radial-gradient(circle at 88% 82%, rgba(183,154,224,.09), transparent 45%), var(--bg)`
    - Card shadow: `0 1px 2px rgba(0,0,0,.25), 0 14px 34px -14px rgba(0,0,0,.55)`
    - Keep the fonts from rule 4. Georgia for the card body. Trebuchet MS for every UI element.
    - Keep the decorative pink radial `::before` circle in the top-right corner of the card.

42. **Navigation.**
    - Previous and Next, as pill buttons, per rule 4.
    - The dot tracker stays. A seen card is purple. A card marked shaky is gold. The current card is gold and scaled 1.25x.
    - Every dot is clickable.
    - **"Hide the explanation"** blurs the one-line answer, the unpacking, and the exam angle together. It never blurs the term, the kicker, or the badges. The default state is revealed.
    - The one-line answer must blur. It states the answer, so leaving it visible defeats the self-test.
    - **"Mark as shaky"** flags the card for the end-screen drill.
    - **"Draw"** opens a markup layer over the **whole page**: pen, highlighter, eraser, five colours, undo, and clear. The margins beside the card and a blank scratch area below it are all drawable, so notes are not confined to the card. It is off by default, so tapping and scrolling behave normally until a tool is picked. The toolbar is fixed to the bottom of the viewport, so it stays reachable however far down the page you have scrolled. Marks are kept per card and survive navigation, a re-render, a resize, and closing the file. They live in the browser, not in the HTML, because a static file cannot write to itself.
    - The last card's Next button reads "Finish deck".

43. **The end screen.**
    - Order, top to bottom: the cards-read count, the Exam Pearls, the "⚑ Drill my shaky cards (N)" button, the Pearl Index, then the full card list.
    - **Every card carries a `pearl`.** One sentence. It must read alone, without the card.
    - **Exam Pearls.** One pearl for every eight cards. Never fewer than 8. Order by weight: lecturer-stressed first, objective-linked second, the rest after.
    - **The Pearl Index.** It lists every pearl. Group by section, in source order. Number each pearl by its card number. Put a live search box above it.
    - A "Show all pearls" control sits in the header, so the index opens without finishing the deck.
    - **The shaky drill** re-runs only the flagged cards, in order. Clearing a card removes it from the list. Show "Nothing left. You cleared every card." when the list empties.
    - Keep the end screen printable.

44. **Images. Rule 22 applies in full, with one change for dark mode.**
    - Put every micrograph and figure on a light panel with a border. A bare image glares on a dark card.
    - The caption and the attribution show with the card. A deck asks nothing, so nothing is hidden.

45. **File location.**
    - Save to `REVIEWER FROM TRANS\[Subject]\[LEC or LAB]\`.
    - Name the file `[Source name] Deck.html`.
    - Create any missing folder. Rule 2 governs the rest.

46. **Final check. Rule 31 applies, minus the layers that need options.**
    - Run layers 1, 3, 4, 5, 7, and 9.
    - Skip layer 2 and layer 6. A deck has no answer key and no options.
    - **Add a density check.** No card over 170 words. No sentence over 20 words. No analogy anywhere.
    - **Add a split check.** Every multi-step mechanism runs across consecutive cards, with no missing step.
    - Report as rule 31 layer 9 requires.
