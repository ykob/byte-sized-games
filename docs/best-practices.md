# Development Best Practices

This document outlines the idiomatic coding patterns and quality standards required for this project.  
We prioritize code that is "easy to delete" and "easy to read" over complex, dry, or clever implementations.  
These practices serve as a guide for both daily development and the code review process.

## Early Return (Guard Clauses)

Use early `return` or `throw` statements to handle edge cases, invalid inputs, or error conditions at the beginning of a function. This pattern is often referred to as a "Guard Clause."

- Reduced Nesting: Keeps the code structure flat and prevents the "Arrow Anti-pattern" (excessive indentation).
- Improved Readability: By handling exceptions first, the reader can focus on the core business logic without keeping track of multiple conditional layers.
- Clear "Happy Path": The main, successful flow of the function (the "Happy Path") is clearly visible at the end of the function, rather than buried inside nested blocks.
- Lower Cognitive Load: Developers can "forget" about the edge cases once they have been returned, making the rest of the function easier to reason about.

```tsx
function
validateAndProcess (user: User | null) {
  // Guard Clause: Handle null user input right at the start.
  if (!user) {
    throw new Error('Invalid user provided.');
  }

  // Guard Clause: Check for required permissions.
  if (!user.hasPermission('processData')) {
    return { status: 'denied', message: 'Permission denied.' };
  }

  // "Happy Path": Core logic proceeds here, un-nested.
  processData(user);
  return { status: 'success' };
}
```

## Encapsulation of Logic with Custom Hooks

Extract component logic into reusable functions called Custom Hooks. By convention, the names of Custom Hooks start with the word "use". They allow you to abstract away complex logic, side effects (like data fetching or subscriptions), and state management from your UI components.

- **Reusability:** The same stateful logic can be applied to multiple components without duplicating code.
- **Separation of Concerns:** It cleanly separates the complex business logic from the rendering logic of a component. This makes components leaner and more focused on their presentation role.
- **Improved Readability:** Components become declarative and easier to read, as the implementation details of the logic are encapsulated within the hook.
- **Enhanced Testability:** Hooks are standard JavaScript functions, which means they can be tested in isolation, independent of the components that use them.
- **Composition:** Custom Hooks can use other hooks (including built-in ones like `useState`, `useEffect`, or even other custom hooks), enabling powerful and flexible composition of logic.

```tsx
// hooks/useTimer.ts
import { useState, useEffect } from 'react';

export function useTimer(limit: number) {
  const [timeLeft, setTimeLeft] = useState(limit);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { timeLeft };
}

// components/Timer.tsx
import { useTimer } from '@/hooks/useTimer';

function Timer() {
  const { timeLeft } = useTimer(60);
  return <div>Time Left: {timeLeft}s</div>;
}
```

## Advanced Typing and Generic Components

Leverage TypeScript's advanced features, such as generics, to build highly flexible and type-safe components. A key pattern used in this project is the polymorphic component, often implemented with an "as" prop. This allows a component to be rendered as different HTML elements while maintaining strict type-checking for its props.

- **Flexibility & Type Safety:** Creates components that can adapt their underlying element (e.g., a component that can be either a `<button>` or an `<a>`) without sacrificing type safety. The props available for autocompletion and validation change based on the chosen element.
- **Enhanced Developer Experience (DX):** Provides accurate IntelliSense and compile-time errors, guiding developers to use components correctly. For instance, the compiler will require an `href` prop when `as="a"` is used.
- **Robustness:** Catches invalid prop combinations during development, preventing potential runtime bugs and improving the overall reliability of the application.
- **Clean and Reusable API:** Exposes a single, powerful component API instead of multiple, element-specific components (e.g., `LinkButton`, `RegularButton`).

```tsx
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  // Add any other custom props here
  variant?: 'primary' | 'secondary';
};

// Merge our props with the props of the component we are rendering.
type PolymorphicProps<T extends ElementType> = ButtonProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>;

function Button<T extends ElementType = 'button'>({
  as,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as ?? 'button';
  return <Component {...props}>{children}</Component>;
}

// Usage examples:
// <Button onClick={() => {}}>Standard Button</Button>
// <Button as="a" href="/home">Link Styled as a Button</Button>
```

## Atomic State Management with Jotai

This project uses Jotai for state management, adopting an atomic approach where state is broken down into minimal, independent units called "atoms". Instead of a single, monolithic state object, we compose atoms to build up the application state. This pattern isolates state logic from the component tree, leading to better performance and maintainability.

- **Decoupling State from Components:** State definitions (`atoms`) are co-located in dedicated `stores` directories within each feature slice. This cleanly separates state management from the UI, making both easier to reason about and test independently.
- **Optimized Re-renders:** Components subscribe only to the atoms they need. As a result, a component re-renders only when the specific atoms it depends on are updated, preventing the performance bottlenecks often seen with context-based state management.
- **Scalability and Flexibility:** Atoms are highly composable. They can be derived from other atoms to create computed values. For more complex scenarios, such as managing a list of dynamic elements, `atomFamily` provides an efficient way to generate atoms on the fly without boilerplate.
- **Simplified Logic:** Logic for state updates can be encapsulated within the atoms themselves (e.g., using write-only or read-write atoms). This keeps UI components clean and focused on presentation, as they only need to dispatch actions or read values without knowing the implementation details.

```tsx
import { atom, useAtom } from 'jotai';

// stores/game-state.ts
export const scoreAtom = atom(0);

// A derived, read-only atom
export const canPlayAtom = atom((get) => get(scoreAtom) > -5);

// A write-only atom to reset the score
export const resetScoreAtom = atom(null, (_, set) => {
  set(scoreAtom, 0);
});


// components/Scoreboard.tsx
import { useAtomValue } from 'jotai';
import { scoreAtom } from '@/stores/game-state';

function Scoreboard() {
  // This component only reads the score, so it uses `useAtomValue`
  // and will only re-render when `scoreAtom` changes.
  const score = useAtomValue(scoreAtom);
  return <div>Score: {score}</div>;
}
```
