---
id: RESEARCH-00003
alias: APPLE-REMINDERS
slug: apple-reminders
title: Apple Reminders
object_type: research
status: draft
version: 0.1.0
category: product
tags:
  - product-research
  - reminders
  - task-management
maturity: seed
risk_level: medium
relationships:
---

# Apple Reminders

## Why Study It

Apple Reminders is useful for studying simple lists, system integration, and low-friction task capture for everyday users.

## Source Signals

- Reminders helps users track and organize to-dos.
- Reminders integrates scheduled reminders into Calendar.
- It supports grocery categories, list and column views, smart lists, pinned lists, subtasks, tags, dates, locations, shared lists, templates, and widgets.

Sources:

- https://support.apple.com/guide/reminders/welcome/mac

## Observed Design Behavior

- The basic model stays simple: list, reminder, complete.
- Power features exist around the list instead of replacing it.
- Smart lists and pinned lists improve retrieval without changing capture.
- Grocery categorization shows automation only where the domain is predictable.
- System integration matters: reminders can appear in Calendar, widgets, notifications, and shared contexts.

## Design Takeaways For Agents

- Keep the default path obvious for casual users.
- Add intelligence only where it reduces manual sorting.
- Prefer platform integration over custom surfaces when the platform already owns the moment.
- Let simple lists remain simple.

## Candidate Rule Directions

- Everyday tools need a low-friction capture path before advanced organization.
- Smart organization should preserve user control.
- Platform-native moments can be better than another in-app screen.

## Do Not Copy Blindly

- Do not use Apple's simplicity as an excuse to omit needed hierarchy.
- Do not add smart categorization unless the categories are predictable and correctable.
