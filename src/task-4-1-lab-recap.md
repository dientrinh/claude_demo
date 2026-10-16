# Lab Recap: Task 4.1 - Explicit Criteria to Reduce False Positives

## Goal

Show that **specific report/skip rules, severity examples, and disabling noisy categories** improve precision and developer trust better than vague or confidence-based instructions.

---

## Part-by-Part Summary

| Part | What was done | Result | Key note |
|---|---|---|---|
| 1. Test set | 15 Node.js/Express snippets (S01-S15) with an answer key: 9 should be flagged, 6 should not | Set built, with a project-conventions note | Covers security, bugs, comment contradictions, and decoys (style, terse comment, local patterns, speculative) |
| 2. Vague baseline | "Check comments are accurate and code is good quality" | 15 findings, 6 false positives, **60% precision**, 9/9 caught | Security and bug findings were 100% true. Style, terse comments, conventions and speculative items were 100% noise. Severity matched the key on only 4 of 9. |
| 3. "Be conservative" | Added a confidence-based instruction | 8 findings, 0 false positives, 100% precision, **missed S09** | Cut noise but also dropped a critical missing-auth issue. There is no way to see or tune why. |
| 4. Explicit criteria (v1) | REPORT bugs, security, comment contradictions. SKIP style, conventions, terse comments, speculative. | 8 findings, 100% precision, **missed S09** | The miss came from a rule conflict: "skip speculative issues" overrode "report missing auth." |
| 4. Explicit criteria (v2) | Reworded the auth rule (a sibling handler has a check, this one does not) | **9 findings, 0 FPs, 9/9 caught** | A rule-caused miss is fixable by editing the rule. |
| 5. Severity examples | One code example per level, plus an S02 secret example and a boundary sentence | **Severity 9 of 9 correct** (was 4 of 9) | The examples are nearly the test snippets, so a holdout check is needed. |
| 6. Disable a category | Comment accuracy turned off with "Do NOT report comment-accuracy issues in this pass." | 7 findings, 0 FPs; security and bug findings and severities unchanged | S05 and S12 are missing on purpose, not recall failures. |
| 7. Write-up | Results table, four reflection answers, limitations | Drafted | See below |

---

## Final Results Table

| Prompt version | Findings | False positives | Precision | Missed issues |
|---|---|---|---|---|
| Vague | 15 | 6 | 60% | 0 |
| "Be conservative" | 8 | 0 | 100% | 1 (S09, critical) |
| Explicit criteria v1 | 8 | 0 | 100% | 1 (S09, rule conflict) |
| Explicit criteria v2 (revised auth rule) | 9 | 0 | 100% | 0 |
| + Severity examples | 9 | 0 | 100% | 0 (severity 9 of 9) |
| + Comment category disabled | 7 | 0 | 100% | 2 (S05, S12, disabled on purpose) |

Noise sources in the vague run: style (S07), terse or decoy comments (S11, S06), local patterns (S08, S14), speculative (S15).

---

## Reflection Questions

**1. Why did "only report high-confidence findings" fail to improve precision the way explicit criteria did?**

Confidence is the model's own sense of certainty and is not tied to the categories you care about. In this lab it cut the noise but also dropped S09, a critical missing-auth finding, because the model was unsure how the router was mounted. Explicit criteria name what to report and what to skip, so the model applies a rule instead of judging its own certainty. When explicit criteria did miss S09, one conflicting rule caused it; that rule could be found and fixed without bringing the noise back. A confidence-based miss gives nothing to edit.

**2. How would a 50% false positive rate in one category affect developers' trust in the other categories?**

Developers judge the tool as a whole. If half of one category's findings are wrong, they learn to dismiss the output, including accurate security and bug findings. A real SQL injection or missing auth check then gets ignored along with the noise. In the baseline, security and bug findings were 100% true while style, convention and speculative findings were 100% noise, all in the same report.

**3. Why is it better to temporarily disable a noisy category than to leave it running while you fix it?**

Every noisy report costs trust, and trust is slow to rebuild. Disabling comment accuracy left the seven security and bug findings and their severities unchanged, so developers saw only findings they could rely on while the comment criteria were tuned offline against comment-only cases. The category is re-enabled once its false positive rate is acceptable. The trade-off is that S05 and S12 go unreported in the meantime, so record that as deliberate.

**4. Why do concrete code examples produce more consistent severity ratings than adjectives like "serious"?**

"Serious" means different things on different runs, so the model has no fixed reference. A code example gives it a pattern to match. The vague run rated the SQL injection, hardcoded secret and missing-auth issues as High where the key says critical, and the null dereference and file leak as Medium where the key says high. After adding one example per level, the secret example and the boundary sentence (a failure on an ordinary request is high; one needing unusual input is medium), all nine matched the key.

---

## Highlights to Remember

1. **Explicit categories beat vague wording.** "Flag a comment only when the claimed behavior contradicts the code" outperformed "check comments are accurate."
2. **Confidence filtering fails because it is not a rule.** It removed noise and a critical finding together, with no way to tell which would go.
3. **Misses from explicit rules are debuggable.** S09 was lost to one conflicting rule; rewording it restored the finding without the noise.
4. **False positives damage trust across categories.** Accurate findings sit next to noise in one report.
5. **Severity needs concrete examples.** Adjectives drifted; one example per level plus a boundary rule fixed all nine.
6. **Disable noisy categories, then tune them offline.** It protects trust while you fix the category, at the deliberate cost of skipping those findings.

---

## Caveats and Limitations

- **Mostly single runs.** The lab asks for 3 runs per snippet to measure consistency. State this if the extra runs were not done.
- **Runs were not blind.** The reviewer could see descriptive file names and the README, and earlier replies suggest session carryover. Part 3's 100% precision may be partly inflated.
- **Tuned on the test set.** The auth rule and severity examples were adjusted after seeing results on the same 15 snippets. Holdout snippets (an unprotected PUT next to a protected POST, a hardcoded database password in config, `JSON.parse` on user input, and similar) are the check that they generalize.
- **Part 6 is predictable by construction.** Disabling a category removes it. The meaningful work is tuning the comment criteria on comment-only cases (step 5) and re-enabling and re-scoring (step 6). Mark those done only if they were run.
- **Test-set flaw.** S15 throws even though the conventions say services return `Result`, and S08 has a milder version of the same issue. The reviewer's convention findings there were arguably correct, which inflates the baseline false positive count.

---

## Key Takeaways

- Specific criteria beat vague instructions.
- Confidence-based filtering is unreliable and can drop critical findings.
- False positives in one category erode trust in all categories.
- Severity needs one concrete example per level, plus boundary cases.


## What’s generic
| Lab technique	| What it means in any domain
| Explicit report/skip criteria	| Define what counts as a hit, and what to ignore, using testable conditions |
| Avoiding “be conservative” and “high-confidence only” |	Don’t use the model’s self-assessed certainty as a filter |
| Severity levels with concrete examples	  | Anchor any rating scale (priority, risk, urgency) with examples |
| Per-category precision tracking | 	Measure each category separately, because one noisy category hides inside an overall score |
| Disabling a noisy category temporarily	 | Ship only the outputs people trust while you tune the rest |
| Labeled test set with decoys| 	Keep known-good and known-bad cases to compare prompt versions |


## Key takeaways
1. Use explicit criteria, not vague instructions
   - ❌ “Check whether comments are accurate.”
   - ✅ “Report a comment only when the claimed behavior directly contradicts the actual code behavior.”
2. Define inclusion AND exclusion rules
   A strong review prompt should specify:
   - Report: real bugs, security issues, incorrect behavior.
   - Skip: minor style issues, subjective preferences, harmless local patterns.
3. “Be conservative” is not enough
   Instructions such as:
   - “Only report high-confidence issues.”
   - “Be conservative.”
   - “Avoid false positives.”
   don't tell the model what qualifies as a finding.
   Instead, provide categorical rules and concrete conditions.
4. False positives directly affect developer trust
   Think of it as:
   More false positives → less trust → developers start ignoring all findings, including the correct ones.
   Therefore, precision is not just an AI quality issue—it affects whether developers actually use the review system.
5. Temporarily disable noisy categories
   If one review category produces many false positives:
   Disable category → improve its criteria → test again → re-enable
   This can restore developer trust while the prompt is being refined.
6. Define severity with concrete examples
   Don't simply say:
   - “Classify issues as Low/Medium/High.”
   Define what each level means, preferably with code examples.
   For example:
   - Critical: exploitable security vulnerability or data loss.
   - High: definite production-impacting bug.
   - Medium: functional issue with limited impact.
   - Low: minor issue that doesn't affect correctness.

The exam-level mental model
You can remember Task 4.1 as:
Vague instruction → inconsistent findings → false positives → loss of trust
versus:
Explicit criteria + exclusions + severity examples → consistent findings → higher precision → developer trust
One-line summary

Investigate the production incident where:

- Elasticsearch nodes lost peer-to-peer communication.
- Jenkins nodes also lost peer-to-peer communication.
- Jenkins-to-Elasticsearch communication was not identified as the affected communication path.
- VM resets restored communication.

Investigate the incident using these root-cause categories:

1. Network connectivity/path
2. Firewall/security rules
3. Routing
4. DNS
5. OS/network stack
6. VM infrastructure
7. CPU/memory/resource exhaustion
8. Application/process failure

For each category, provide:

- Evidence supporting the hypothesis
- Evidence contradicting the hypothesis
- Evidence still required
- Confirmed / Probable / Open / Ruled Out classification
- Impact and severity

Apply these rules:

- Do not classify a hypothesis as the root cause without supporting evidence.
- Do not infer causation merely because two events occurred at the same time.
- Do not treat VM reset restoring communication as proof of VM infrastructure failure.
- Do not treat high CPU, memory usage, or monitoring-agent activity alone as the root cause.
- Do not investigate Jenkins-to-Elasticsearch communication as the primary failure path unless evidence shows it was affected.
- Prioritize common infrastructure or dependency failures that could explain the simultaneous Jenkins-node and Elasticsearch-node peer communication failures.
- Clearly separate confirmed facts from hypotheses.

Finally, identify:
1. The strongest evidence-based root-cause candidate.
2. The evidence that confirms it.
3. The evidence that still needs to be collected.
4. Alternative hypotheses that have been ruled out.
5. Recommended preventive actions.

The important lesson for Task 4.1: your question should not ask the AI to “find the root cause accurately.” Instead, you define what counts as evidence, what does not count as evidence, what must be reported, and what must be skipped. That's how you reduce false-positive conclusions.