# Design System

AI Design Rules is not a design system or component library.

This document defines how agents should think when a product already has design-system structure.

## Order Of Decisions

```text
tokens -> themes -> components -> screens
```

## Agent Guidance

- Reuse existing tokens before creating new visual values.
- Use semantic names for color, spacing, typography, and state.
- Do not create one-off styles when an existing token or component fits.
- Do not treat components as the product model.
- Let rules and patterns decide behavior; let the design system keep execution consistent.

## Boundary

AI Design Rules can describe how design-system decisions should be used by agents. It does not ship production components, token packages, or UI kit assets.
