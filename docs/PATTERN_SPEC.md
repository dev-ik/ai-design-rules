# Pattern Specification

Patterns are compositions of rules. They describe reusable product structures that agents can apply across products without copying a specific UI.

Every pattern document must contain exactly these sections, in this order.

## # Pattern Name

Names the reusable solution. The name should describe the product behavior, not a component.

Why it exists: agents need stable names to reference patterns in prompts, reviews, and reference projects.

## Purpose

Explains the design problem the pattern solves.

Why it exists: a pattern should solve one problem only. Purpose prevents overlap with adjacent patterns.

## User Goal

States what the user is trying to accomplish.

Why it exists: agents should start from user intent, not layout or component choice.

## Product Context

Defines the type of product, screen, or workflow where the pattern belongs.

Why it exists: patterns are not universal. Context prevents misuse in products with different constraints.

## Use When

Lists conditions where the pattern is appropriate.

Why it exists: agents need a trigger for selecting the pattern.

## Do Not Use When

Lists conditions where the pattern should be avoided.

Why it exists: good patterns include boundaries, not only positive examples.

## UX Rules

Lists UX-focused rules that shape the interaction.

Why it exists: patterns must remain connected to rules instead of becoming standalone advice.

## Accessibility Rules

Lists accessibility rules or requirements that affect the pattern.

Why it exists: accessibility is part of the pattern contract, not a final polish step.

## Mobile Behavior

Explains how the pattern behaves on touch-first and narrow screens.

Why it exists: AI agents often create desktop-first layouts unless mobile behavior is explicit.

## Desktop Behavior

Explains how the pattern behaves on larger screens, keyboard-heavy workflows, or dense layouts.

Why it exists: desktop behavior should adapt the pattern without changing its core purpose.

## Empty State

Explains what the user sees when there is no content yet.

Why it exists: empty states should help users start the intended workflow.

## Loading State

Explains what remains stable while data or actions are loading.

Why it exists: loading should preserve orientation and avoid layout jumps.

## Error State

Explains how the pattern handles failure and recovery.

Why it exists: errors should preserve user input, context, and trust.

## Required Rules

Lists all rule IDs required by the pattern.

Why it exists: rules are the source of pattern authority and keep the knowledge graph traceable.

## Related Research

Lists research files that influenced the pattern.

Why it exists: patterns must trace back to observed product behavior, not taste.

## Related Patterns

Lists parent, child, alternative, dependent, or adjacent patterns.

Why it exists: related patterns clarify ownership and prevent duplicate responsibilities.

## Examples

Shows concise product situations where the pattern applies.

Why it exists: examples help agents map the abstract pattern to concrete product work.

## Agent Checklist

Provides review questions an agent can run before using or shipping the pattern.

Why it exists: patterns must be actionable and reviewable.
