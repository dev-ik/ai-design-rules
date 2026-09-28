# Evaluator notes

Condition: `baseline`. See [generation notes](GENERATION_NOTES.md) for the generator's actual sources, timing and static checks.

The parent rendered this frozen output in Headless Chrome 153.0.8010.53, locale en-GB, light scheme, device scale 1, at 390×844 and 1440×900 CSS pixels. The evaluator knew the condition and helped author the tested knowledge; this is internal, unblinded evaluation.

Both viewport runs checked default/empty states, controlled save delay, one injected failure, retry without duplicates, completion, detail open/close with source scroll/focus restoration, immediate dismissal, reduced motion, failed edit and retry, reload persistence, keyboard traversal, and blank validation. Twenty PNGs are stored, ten per viewport. [Runtime results](runtime-checks.json) contain state and geometry observations; [layout measurements](../layout-metrics.json) compare the same mobile elements before/during/after failure.

The detail source row was centered before clicking to avoid Playwright scrolling an obscured click target behind the fixed capture dock. The capture pass was repeated with that harness correction for both versions. Initial screenshots were also normalized to a blurred active element. App source was never modified.

No JavaScript page errors were observed in the scripted passes. The initial local server returned a non-product 404 for `/favicon.ico`. Native dialog behavior was tested only in this browser. Reduced motion had the same content and return path; screenshots alone do not establish timing.

The automated path follows Tab from a fresh page without activating optional skip links or undisclosed shortcuts. Its count describes that path with the supplied twelve-task seed, not a universal accessibility measure. Touch measurements inspect actual controls and enclosing checkbox labels, not icon dimensions.

Source hashes still match the generator freeze. Absolute machine paths in text artifacts were replaced with portable tokens; raw HTML/CSS/JS and PNGs were not changed.
